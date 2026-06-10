from __future__ import annotations

import argparse
import shutil
import sys
from collections import deque
from pathlib import Path

try:
    from PIL import Image, ImageChops
except ImportError as error:
    raise SystemExit(
        "Pillow is required. Install it with: python -m pip install Pillow"
    ) from error


ROOT = Path(__file__).resolve().parent
FRAMES_DIR = ROOT / "public" / "avatar-canva-frames"
BACKUP_DIR = ROOT / "public" / "avatar-canva-frames-backup"
EXPECTED_FRAMES = 240
MARGIN = 10
RGB_BACKGROUND_THRESHOLD = 12


def folder_size(path: Path) -> int:
    return sum(file.stat().st_size for file in path.rglob("*") if file.is_file())


def format_bytes(size: int) -> str:
    units = ["B", "KB", "MB", "GB"]
    value = float(size)

    for unit in units:
        if value < 1024 or unit == units[-1]:
            return f"{value:.2f} {unit}"
        value /= 1024

    return f"{value:.2f} GB"


def get_frame_files(path: Path = FRAMES_DIR) -> list[Path]:
    if not path.exists() or not path.is_dir():
        raise SystemExit(f"Frames folder not found: {path}")

    frames = sorted(path.glob("frame_*.webp"))

    if len(frames) != EXPECTED_FRAMES:
        raise SystemExit(
            f"Expected {EXPECTED_FRAMES} frames, found {len(frames)} in {path}"
        )

    return frames


def validate_frames(frames: list[Path]) -> tuple[tuple[int, int], int, int]:
    original_size: tuple[int, int] | None = None
    alpha_count = 0
    transparent_alpha_count = 0

    for frame in frames:
        with Image.open(frame) as image:
            if original_size is None:
                original_size = image.size
            elif image.size != original_size:
                raise SystemExit(
                    f"Frame dimensions differ: {frame.name} has {image.size}, "
                    f"expected {original_size}"
                )

            if "A" in image.getbands():
                alpha_count += 1
                minimum_alpha, _maximum_alpha = image.getchannel("A").getextrema()

                if minimum_alpha < 255:
                    transparent_alpha_count += 1

    if original_size is None:
        raise SystemExit("No frames found.")

    return original_size, alpha_count, transparent_alpha_count


def get_corner_background(image: Image.Image) -> tuple[int, int, int]:
    rgb_image = image.convert("RGB")
    width, height = rgb_image.size
    corners = [
        rgb_image.getpixel((0, 0)),
        rgb_image.getpixel((width - 1, 0)),
        rgb_image.getpixel((0, height - 1)),
        rgb_image.getpixel((width - 1, height - 1)),
    ]

    return tuple(sorted(corner[channel] for corner in corners)[2] for channel in range(3))


def derive_alpha_from_background(image: Image.Image) -> Image.Image:
    rgb_image = image.convert("RGB")
    background = get_corner_background(rgb_image)
    background_image = Image.new("RGB", rgb_image.size, background)
    difference = ImageChops.difference(rgb_image, background_image).convert("L")

    return connected_background_to_alpha(difference)


def get_foreground_mask_from_background(image: Image.Image) -> Image.Image:
    rgb_image = image.convert("RGB")
    background = get_corner_background(rgb_image)
    background_image = Image.new("RGB", rgb_image.size, background)
    difference = ImageChops.difference(rgb_image, background_image).convert("L")

    return difference.point(
        lambda value: 255 if value > RGB_BACKGROUND_THRESHOLD else 0,
        mode="L",
    )


def connected_background_to_alpha(difference: Image.Image) -> Image.Image:
    width, height = difference.size
    values = difference.tobytes()
    visited = bytearray(width * height)
    queue: deque[int] = deque()

    def enqueue_if_background(index: int) -> None:
        if visited[index] or values[index] > RGB_BACKGROUND_THRESHOLD:
            return

        visited[index] = 1
        queue.append(index)

    for x in range(width):
        enqueue_if_background(x)
        enqueue_if_background((height - 1) * width + x)

    for y in range(height):
        enqueue_if_background(y * width)
        enqueue_if_background(y * width + width - 1)

    while queue:
        index = queue.popleft()
        x = index % width

        if x > 0:
            enqueue_if_background(index - 1)

        if x < width - 1:
            enqueue_if_background(index + 1)

        top = index - width
        if top >= 0:
            enqueue_if_background(top)

        bottom = index + width
        if bottom < len(values):
            enqueue_if_background(bottom)

    return Image.frombytes(
        "L",
        (width, height),
        bytes(0 if is_background else 255 for is_background in visited),
    )


def get_visibility_mask(image: Image.Image) -> Image.Image:
    if "A" in image.getbands():
        alpha = image.getchannel("A")
        minimum_alpha, maximum_alpha = alpha.getextrema()

        if minimum_alpha < 255:
            return alpha

    return derive_alpha_from_background(image)


def calculate_global_bbox(frames: list[Path]) -> tuple[int, int, int, int]:
    global_bbox: tuple[int, int, int, int] | None = None

    for frame in frames:
        with Image.open(frame) as image:
            if "A" in image.getbands():
                alpha = image.getchannel("A")
                minimum_alpha, _maximum_alpha = alpha.getextrema()
                visibility_mask = (
                    alpha
                    if minimum_alpha < 255
                    else get_foreground_mask_from_background(image)
                )
            else:
                visibility_mask = get_foreground_mask_from_background(image)

            bbox = visibility_mask.getbbox()

            if bbox is None:
                continue

            if global_bbox is None:
                global_bbox = bbox
                continue

            left, top, right, bottom = global_bbox
            frame_left, frame_top, frame_right, frame_bottom = bbox

            global_bbox = (
                min(left, frame_left),
                min(top, frame_top),
                max(right, frame_right),
                max(bottom, frame_bottom),
            )

    if global_bbox is None:
        raise SystemExit("No visible pixels found in any frame.")

    return global_bbox


def expand_bbox(
    bbox: tuple[int, int, int, int],
    image_size: tuple[int, int],
) -> tuple[int, int, int, int]:
    width, height = image_size
    left, top, right, bottom = bbox

    return (
        max(0, left - MARGIN),
        max(0, top - MARGIN),
        min(width, right + MARGIN),
        min(height, bottom + MARGIN),
    )


def create_backup() -> None:
    if BACKUP_DIR.exists():
        raise SystemExit(
            f"Backup already exists and will not be overwritten: {BACKUP_DIR}"
        )

    shutil.copytree(FRAMES_DIR, BACKUP_DIR)


def crop_frames(frames: list[Path], crop_box: tuple[int, int, int, int]) -> None:
    for frame in frames:
        with Image.open(frame) as image:
            cropped_rgb = image.convert("RGB").crop(crop_box)
            alpha = get_visibility_mask(cropped_rgb)
            cropped = cropped_rgb.convert("RGBA")
            cropped.putalpha(alpha)
            cropped.save(frame, "WEBP", lossless=True, exact=True, method=6)


def restore_backup() -> None:
    backup_frames = get_frame_files(BACKUP_DIR)

    if FRAMES_DIR.exists():
        shutil.rmtree(FRAMES_DIR)

    shutil.copytree(BACKUP_DIR, FRAMES_DIR)

    print("Restore completed.")
    print(f"Total frames restored: {len(backup_frames)}")
    print(f"Backup path: {BACKUP_DIR}")


def crop_avatar_frames() -> None:
    frames = get_frame_files()
    size_before = folder_size(FRAMES_DIR)
    original_size, alpha_count, transparent_alpha_count = validate_frames(frames)
    global_bbox = calculate_global_bbox(frames)
    final_bbox = expand_bbox(global_bbox, original_size)
    new_width = final_bbox[2] - final_bbox[0]
    new_height = final_bbox[3] - final_bbox[1]

    create_backup()
    crop_frames(frames, final_bbox)

    cropped_frames = get_frame_files()
    cropped_size, cropped_alpha_count, cropped_transparent_alpha_count = validate_frames(
        cropped_frames
    )
    size_after = folder_size(FRAMES_DIR)

    print("Avatar frames cropped successfully.")
    print(f"Total frames: {len(cropped_frames)}")
    print(f"Original dimensions: {original_size[0]}x{original_size[1]}")
    print(f"Frames with alpha before: {alpha_count}")
    print(f"Frames with real transparency before: {transparent_alpha_count}")
    print(
        "Visibility source: "
        + (
            "original alpha channel"
            if transparent_alpha_count == len(frames)
            else "background connected to frame edges"
        )
    )
    print(f"Global bounding box: {global_bbox}")
    print(f"Final bounding box with {MARGIN}px margin: {final_bbox}")
    print(f"New dimensions: {new_width}x{new_height}")
    print(f"Validated cropped dimensions: {cropped_size[0]}x{cropped_size[1]}")
    print(f"Frames with alpha after: {cropped_alpha_count}")
    print(f"Frames with real transparency after: {cropped_transparent_alpha_count}")
    print(f"Folder size before: {format_bytes(size_before)} ({size_before} bytes)")
    print(f"Folder size after: {format_bytes(size_after)} ({size_after} bytes)")
    print(f"Backup path: {BACKUP_DIR}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Crop avatar WebP frames using one global visibility bbox."
    )
    parser.add_argument(
        "--restore",
        action="store_true",
        help="Restore public/avatar-canva-frames from the backup folder.",
    )

    args = parser.parse_args()

    if args.restore:
        restore_backup()
        return

    crop_avatar_frames()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit("Interrupted.")
