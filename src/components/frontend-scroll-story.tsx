"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { basePath } from "@/lib/base-path";

const START_FRAME = 10;
const END_FRAME = 100;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;
const MOBILE_FRAME_STEP = 2;
const AVATAR_RENDER_SCALE = 0.88;

const steps = [
  {
    title: "Front-end com olhar de Produto",
    text: "Não implemento telas só para “ficarem iguais ao Figma”. Meu foco é transformar decisões de design em interfaces reais, responsivas e consistentes, conectando experiência, regra de negócio e execução.",
    frameStart: 10,
    frameEnd: 24,
    avatarX: 0.02,
    avatarY: 0.5,
    avatarScale: 0.92,
  },
  {
    title: "Minha stack de construção",
    text: "Uso uma stack que conecta design, front-end e entrega: Figma para estruturar experiência, React e Next.js para construir interfaces, TypeScript para dar consistência, Tailwind e shadcn/ui para acelerar componentes, além de Git, GitHub e Vercel para versionar, publicar e evoluir projetos com mais segurança.",
    frameStart: 28,
    frameEnd: 44,
    avatarX: 0.0,
    avatarY: 0.5,
    avatarScale: 0.9,
  },
  {
    title: "Componentes que sustentam produto",
    text: "Estruturo interfaces pensando em consistência, estados, responsividade e evolução. A ideia não é só construir uma página, mas criar uma base que continue funcionando quando o produto crescer.",
    frameStart: 48,
    frameEnd: 64,
    avatarX: 0.03,
    avatarY: 0.52,
    avatarScale: 0.9,
  },
  {
    title: "Do layout à interface funcionando",
    text: "Atuo na ponte entre design e desenvolvimento, cuidando de hierarquia visual, microinterações, acessibilidade, performance e detalhes que deixam a experiência mais madura.",
    frameStart: 68,
    frameEnd: 84,
    avatarX: 0.0,
    avatarY: 0.5,
    avatarScale: 0.9,
  },
  {
    title: "Design que sai do protótipo",
    text: "Projetos onde design, produto e front-end se encontram na prática, com interfaces pensadas para uso real, manutenção e evolução.",
    cta: "Ver projetos",
    frameStart: 88,
    frameEnd: 100,
    avatarX: 0.03,
    avatarY: 0.5,
    avatarScale: 0.84,
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function getFramePath(index: number) {
  return `${basePath}/avatar-walk-frames/frame_${String(index).padStart(4, "0")}.webp`;
}

function drawContainedImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  placement = steps[0],
  isMobile = false,
) {
  const context = canvas.getContext("2d");

  if (!context || !image.naturalWidth || !image.naturalHeight) {
    return;
  }

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const placementScale =
    placement.avatarScale * AVATAR_RENDER_SCALE * (isMobile ? 0.72 : 1);
  const placementX = isMobile ? 0.5 : placement.avatarX;
  const placementY = isMobile ? 0.24 : placement.avatarY;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  let drawWidth = canvasWidth * placementScale;
  let drawHeight = canvasHeight * placementScale;

  if (imageRatio > canvasRatio) {
    drawHeight = canvasWidth / imageRatio;
    drawHeight *= placementScale;
  } else {
    drawWidth = canvasHeight * imageRatio;
    drawWidth *= placementScale;
  }

  const centeredX = isMobile
    ? canvasWidth * placementX - drawWidth / 2
    : canvasWidth * placementX;
  const x = clamp(centeredX, 0, canvasWidth - drawWidth);
  const y = Math.max(
    0,
    Math.min(
      canvasHeight - drawHeight,
      canvasHeight * placementY - drawHeight / 2,
    ),
  );

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(image, x, y, drawWidth, drawHeight);
}

export function FrontendScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameImagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const currentFrameRef = useRef(0);
  const activeStepRef = useRef(0);
  const renderedFrameRef = useRef(-1);
  const renderedStepRef = useRef(-1);
  const animationFrameRef = useRef<number | null>(null);
  const loadedFramesRef = useRef(0);
  const failedFramesRef = useRef(0);
  const isDestroyedRef = useRef(false);
  const isMobileRef = useRef(false);

  const [activeStep, setActiveStep] = useState(0);
  const [isFallbackVisible, setIsFallbackVisible] = useState(false);

  const activeContent = steps[activeStep];
  const TitleTag = activeStep === 0 ? "h1" : "h2";

  const drawCurrentFrame = useCallback((force = false) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    if (
      !force &&
      renderedFrameRef.current === currentFrameRef.current &&
      renderedStepRef.current === activeStepRef.current
    ) {
      return;
    }

    const exactImage = frameImagesRef.current[currentFrameRef.current];
    const fallbackImage =
      exactImage?.complete && exactImage.naturalWidth
        ? exactImage
        : frameImagesRef.current.find((image) => image?.complete);

    if (fallbackImage) {
      drawContainedImage(
        canvas,
        fallbackImage,
        steps[activeStepRef.current],
        isMobileRef.current,
      );
      renderedFrameRef.current = currentFrameRef.current;
      renderedStepRef.current = activeStepRef.current;
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = canvas?.parentElement;

    if (!canvas || !wrapper) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const nextCanvasWidth = Math.round(width * dpr);
    const nextCanvasHeight = Math.round(height * dpr);

    if (canvas.width !== nextCanvasWidth) {
      canvas.width = nextCanvasWidth;
    }

    if (canvas.height !== nextCanvasHeight) {
      canvas.height = nextCanvasHeight;
    }

    renderedFrameRef.current = -1;
    renderedStepRef.current = -1;
    drawCurrentFrame(true);
  }, [drawCurrentFrame]);

  const updateFrameFromScroll = useCallback(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      animationFrameRef.current = null;
      return;
    }

    const rect = section.getBoundingClientRect();
    const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
    const progress = Math.min(
      1,
      Math.max(0, -rect.top / scrollableDistance),
    );
    const nextStep = Math.min(
      steps.length - 1,
      Math.floor(progress * steps.length),
    );
    const stepStartProgress = nextStep / steps.length;
    const stepProgress = clamp(
      (progress - stepStartProgress) * steps.length,
      0,
      1,
    );
    const frameRange = steps[nextStep].frameEnd - steps[nextStep].frameStart;
    const absoluteFrame = Math.round(
      steps[nextStep].frameStart + easeInOutCubic(stepProgress) * frameRange,
    );
    const rawFrame = clamp(absoluteFrame - START_FRAME, 0, TOTAL_FRAMES - 1);
    const nextFrame = isMobileRef.current
      ? Math.round(rawFrame / MOBILE_FRAME_STEP) * MOBILE_FRAME_STEP
      : rawFrame;

    const didFrameChange = currentFrameRef.current !== nextFrame;
    const didStepChange = activeStepRef.current !== nextStep;

    currentFrameRef.current = nextFrame;
    activeStepRef.current = nextStep;

    if (didStepChange) {
      setActiveStep(nextStep);
    }

    if (didFrameChange || didStepChange) {
      drawCurrentFrame();
    }

    animationFrameRef.current = null;
  }, [drawCurrentFrame]);

  const requestScrollUpdate = useCallback(() => {
    if (animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(updateFrameFromScroll);
  }, [updateFrameFromScroll]);

  useEffect(() => {
    isDestroyedRef.current = false;
    loadedFramesRef.current = 0;
    failedFramesRef.current = 0;
    currentFrameRef.current = 0;
    activeStepRef.current = 0;
    renderedFrameRef.current = -1;
    renderedStepRef.current = -1;
    frameImagesRef.current = Array.from({ length: TOTAL_FRAMES }, () => null);

    const loadFrame = (frameIndex: number) => {
      const image = new window.Image();
      frameImagesRef.current[frameIndex] = image;

      image.onload = () => {
        if (isDestroyedRef.current) {
          return;
        }

        loadedFramesRef.current += 1;

        if (frameIndex === 0 || frameIndex === currentFrameRef.current) {
          drawCurrentFrame(true);
        }
      };

      image.onerror = () => {
        if (isDestroyedRef.current) {
          return;
        }

        failedFramesRef.current += 1;

        if (
          failedFramesRef.current >= TOTAL_FRAMES &&
          loadedFramesRef.current === 0
        ) {
          setIsFallbackVisible(true);
        }
      };

      image.decoding = "async";
      image.src = getFramePath(frameIndex + START_FRAME);
    };

    loadFrame(0);

    const loadRemainingFrames = () => {
      for (let index = 1; index < TOTAL_FRAMES; index += 1) {
        if (!isDestroyedRef.current) {
          loadFrame(index);
        }
      }
    };
    const hasIdleCallback = "requestIdleCallback" in window;
    const preloadHandle = hasIdleCallback
      ? window.requestIdleCallback(loadRemainingFrames)
      : window.setTimeout(loadRemainingFrames, 120);

    return () => {
      isDestroyedRef.current = true;

      if (hasIdleCallback) {
        window.cancelIdleCallback(preloadHandle);
      } else {
        window.clearTimeout(preloadHandle);
      }

      frameImagesRef.current = [];
    };
  }, [drawCurrentFrame]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => {
      isMobileRef.current = mediaQuery.matches;
      renderedFrameRef.current = -1;
      renderedStepRef.current = -1;
      resizeCanvas();
      requestScrollUpdate();
    };

    updateMobileState();

    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, [requestScrollUpdate, resizeCanvas]);

  useEffect(() => {
    resizeCanvas();
    requestScrollUpdate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("orientationchange", resizeCanvas);
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("orientationchange", resizeCanvas);
      window.removeEventListener("scroll", requestScrollUpdate);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [requestScrollUpdate, resizeCanvas]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[260vh] bg-white md:min-h-[420vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {isFallbackVisible ? (
          <video
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain object-left opacity-85"
            src={`${basePath}/videos/frontend-avatar-scroll.mp4`}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
          />
        ) : (
          <canvas
            ref={canvasRef}
            aria-label="Avatar guia da experiencia front-end"
            className="pointer-events-none absolute inset-0 z-0 block h-full w-full bg-transparent opacity-65 md:opacity-90"
          />
        )}

        <div className="relative z-10 mx-auto flex h-full max-w-[1180px] items-center justify-end px-0 pt-[12vh] md:pt-0">
          <div className="min-w-0 max-w-[500px] rounded-none bg-white/72 py-4 backdrop-blur-[2px] md:bg-transparent md:py-0 md:backdrop-blur-0 lg:max-w-[460px]">
            <div
              key={activeContent.title}
              className="transition-all duration-500 ease-out"
            >
              <TitleTag
                className={`font-black tracking-[-0.052em] text-[#303030] ${
                  activeStep === 0
                    ? "text-[36px] leading-[0.98] sm:text-[52px] lg:text-[62px]"
                    : "text-[27px] leading-[1.04] sm:text-[36px] lg:text-[42px]"
                }`}
              >
                {activeContent.title}
              </TitleTag>

              <p className="mt-5 max-w-[430px] text-[15px] leading-[1.75] text-[#727272] sm:mt-6 sm:text-[17px]">
                {activeContent.text}
              </p>

              {activeContent.cta ? (
                <Link
                  href="/portfolio"
                  className="btn-soft-3d mt-9 gap-3 text-[12px] font-black uppercase tracking-[0.18em]"
                >
                  {activeContent.cta}
                  <ArrowUpRight className="size-4 stroke-[2]" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
