"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { basePath } from "@/lib/base-path";

const START_FRAME = 1;
const END_FRAME = 240;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;

const FRAMES_FOLDER = "avatar-canva-frames";
const FALLBACK_VIDEO = "frontend-avatar-canva.mp4";

/**
 * Troque este valor sempre que substituir os arquivos dos frames
 * mantendo os mesmos nomes.
 *
 * Isso impede o navegador de reutilizar os WebP antigos do cache.
 */
const FRAME_ASSET_VERSION = "cropped-797x1018-v1";

const MOBILE_BREAKPOINT = 768;
const MOBILE_FRAME_STEP = 1;

/**
 * Escalas separadas para os novos frames recortados.
 *
 * Os frames agora têm 797x1018 e praticamente não possuem
 * espaço transparente ao redor do personagem.
 */
const DESKTOP_AVATAR_SCALE = 0.9;
const MOBILE_AVATAR_SCALE = 0.64;

const FRAME_SMOOTHING = 0.045;
const PRELOAD_BATCH_SIZE = 60;
const FRAME_PLAY_PORTION = 0.88;

const SHOW_DEBUG = false;

type FrontendStep = {
  title: string;
  text: string;
  support: string;
  stack?: string[];
  cta?: string;
  frameStart: number;
  frameEnd: number;
  avatarX: number;
  avatarY: number;
  avatarScale: number;
};

type AvatarPlacement = Pick<
  FrontendStep,
  "avatarX" | "avatarY" | "avatarScale"
>;

type AvatarLayout = {
  drawWidth: number;
  drawHeight: number;
  x: number;
  y: number;
};

const steps: FrontendStep[] = [
  {
    title: "Product Design com base técnica",
    text: "Meu foco não é apenas desenhar telas bonitas. Projeto experiências pensando em contexto, regra de negócio, clareza e execução. Ter base técnica me ajuda a tomar decisões mais próximas da realidade do produto e do time.",
    support: "Product Designer que entende o que acontece depois do Figma.",
    stack: ["Product Design", "UX/UI", "Design System"],
    frameStart: 1,
    frameEnd: 24,
    avatarX: 0.12,
    avatarY: 0.5,
    avatarScale: 0.94,
  },
  {
    title: "Do problema à interface",
    text: "Antes de abrir o layout, procuro entender quem usa, qual dor precisa ser resolvida, quais decisões a interface precisa facilitar e como transformar complexidade em uma experiência mais simples.",
    support: "A tela é consequência da estratégia, não o ponto de partida.",
    stack: ["Figma", "FigJam", "Prototipação"],
    frameStart: 50,
    frameEnd: 91,
    avatarX: 0.13,
    avatarY: 0.5,
    avatarScale: 0.92,
  },
  {
    title: "Design que conversa com código",
    text: "Trabalho pensando em componentes, estados, responsividade, acessibilidade e handoff. Entender React, Next.js, TypeScript, Tailwind e shadcn/ui me ajuda a criar interfaces mais consistentes e viáveis para implementação.",
    support:
      "Não é sobre vender código. É sobre desenhar melhor para produto real.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    frameStart: 103,
    frameEnd: 142,
    avatarX: 0.12,
    avatarY: 0.5,
    avatarScale: 0.92,
  },
  {
    title: "IA como acelerador de processo",
    text: "Uso IA para explorar caminhos, organizar ideias, testar variações, estruturar fluxos, apoiar protótipos e acelerar a passagem entre intenção, interface e entrega. O critério continua sendo de design.",
    support: "Velocidade só importa quando melhora a decisão.",
    stack: ["IA", "Prompting", "Prototipação", "Iteração rápida"],
    frameStart: 151,
    frameEnd: 197,
    avatarX: 0.13,
    avatarY: 0.5,
    avatarScale: 0.9,
  },
  {
    title: "Do Figma ao deploy, se precisar",
    text: "Meu diferencial é atravessar melhor a distância entre design, produto e entrega. Posso desenhar a experiência, prototipar, validar caminhos e, quando necessário, colocar uma interface navegável no ar.",
    support: "Product Design com repertório para tirar ideias do estático.",
    stack: ["Git", "GitHub", "Vercel", "Deploy"],
    cta: "Ver projetos",
    frameStart: 199,
    frameEnd: 240,
    avatarX: 0.14,
    avatarY: 0.5,
    avatarScale: 0.86,
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(value: number) {
  return value * value * (3 - 2 * value);
}

function getFramePath(index: number) {
  const fileName = `frame_${String(index).padStart(4, "0")}.webp`;

  return `${basePath}/${FRAMES_FOLDER}/${fileName}?v=${FRAME_ASSET_VERSION}`;
}

function findNearestLoadedFrame(
  images: Array<HTMLImageElement | null>,
  targetIndex: number,
) {
  const exactImage = images[targetIndex];

  if (exactImage?.complete && exactImage.naturalWidth) {
    return exactImage;
  }

  let nearestImage: HTMLImageElement | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  images.forEach((image, index) => {
    if (!image?.complete || !image.naturalWidth) {
      return;
    }

    const distance = Math.abs(index - targetIndex);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestImage = image;
    }
  });

  return nearestImage;
}

/**
 * Mobile:
 * avatar atrás da copy, centralizado e responsivo.
 */
function getMobileAvatarLayout(
  canvasWidth: number,
  canvasHeight: number,
  imageRatio: number,
  placement: AvatarPlacement,
): AvatarLayout {
  const responsiveScale = clamp(canvasWidth / 430, 0.9, 1.06);

  const drawHeight =
    canvasHeight *
    placement.avatarScale *
    MOBILE_AVATAR_SCALE *
    responsiveScale;

  const drawWidth = drawHeight * imageRatio;

  const centerX = canvasWidth * 0.68;
  const centerY = canvasHeight * 0.59;

  return {
    drawWidth,
    drawHeight,
    x: centerX - drawWidth / 2,
    y: centerY - drawHeight / 2,
  };
}

/**
 * Desktop:
 * usa os novos frames recortados e mantém o personagem
 * grande dentro da coluna esquerda, sem invadir a copy.
 */
function getDesktopAvatarLayout(
  canvasWidth: number,
  canvasHeight: number,
  imageRatio: number,
  placement: AvatarPlacement,
): AvatarLayout {
  const viewportScale = clamp(canvasWidth / 1440, 0.88, 1.08);

  let drawHeight =
    canvasHeight *
    placement.avatarScale *
    DESKTOP_AVATAR_SCALE *
    viewportScale;

  let drawWidth = drawHeight * imageRatio;

  /**
   * Área disponível para o avatar no desktop.
   * A copy começa aproximadamente depois de 50% da tela.
   */
  const leftBoundary = canvasWidth * 0.025;
  const rightBoundary = canvasWidth * 0.49;
  const availableWidth = rightBoundary - leftBoundary;

  /**
   * Se o avatar ultrapassar a coluna esquerda,
   * reduz proporcionalmente sem distorcer.
   */
  if (drawWidth > availableWidth) {
    drawWidth = availableWidth;
    drawHeight = drawWidth / imageRatio;
  }

  /**
   * Mantém o avatar próximo da copy, mas sem sobreposição.
   */
  const horizontalPosition = clamp(placement.avatarX, 0.08, 0.16);
  const requestedX = canvasWidth * horizontalPosition;

  const x = clamp(
    requestedX,
    leftBoundary,
    Math.max(leftBoundary, rightBoundary - drawWidth),
  );

  const centerY = canvasHeight * placement.avatarY;

  const y = clamp(
    centerY - drawHeight / 2,
    8,
    Math.max(8, canvasHeight - drawHeight - 8),
  );

  return {
    drawWidth,
    drawHeight,
    x,
    y,
  };
}

function drawContainedImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  placement: AvatarPlacement,
  isMobile: boolean,
) {
  const context = canvas.getContext("2d");

  if (!context || !image.naturalWidth || !image.naturalHeight) {
    return;
  }

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imageRatio = image.naturalWidth / image.naturalHeight;

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  const layout = isMobile
    ? getMobileAvatarLayout(
        canvasWidth,
        canvasHeight,
        imageRatio,
        placement,
      )
    : getDesktopAvatarLayout(
        canvasWidth,
        canvasHeight,
        imageRatio,
        placement,
      );

  context.clearRect(0, 0, canvasWidth, canvasHeight);

  context.drawImage(
    image,
    layout.x,
    layout.y,
    layout.drawWidth,
    layout.drawHeight,
  );
}

export function FrontendScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debugRef = useRef<HTMLDivElement>(null);

  const frameImagesRef = useRef<Array<HTMLImageElement | null>>([]);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  const lastFrameRef = useRef(-1);
  const activeStepRef = useRef(0);

  const renderedFrameRef = useRef(-1);
  const renderedStepRef = useRef(-1);

  const rafIdRef = useRef<number | null>(null);
  const preloadHandleRef = useRef<number | null>(null);

  const loadedFramesRef = useRef(0);
  const failedFramesRef = useRef(0);

  const isDestroyedRef = useRef(false);
  const isMobileRef = useRef(false);

  const [activeStep, setActiveStep] = useState(0);
  const [isFallbackVisible, setIsFallbackVisible] = useState(false);

  const activeContent = steps[activeStep];
  const TitleTag = activeStep === 0 ? "h1" : "h2";

  const updateDebug = useCallback(
    (
      progress: number,
      stepProgress: number,
      heldProgress: number,
      frame: number,
    ) => {
      if (!SHOW_DEBUG || !debugRef.current) {
        return;
      }

      const currentStep = steps[activeStepRef.current];

      debugRef.current.textContent = [
        "/front-end debug",
        `viewport: ${isMobileRef.current ? "mobile" : "desktop"}`,
        `step: ${activeStepRef.current + 1}/${steps.length}`,
        `title: ${currentStep.title}`,
        `global progress: ${progress.toFixed(3)}`,
        `step progress: ${stepProgress.toFixed(3)}`,
        `held progress: ${heldProgress.toFixed(3)}`,
        `frame: ${frame}`,
        `frame version: ${FRAME_ASSET_VERSION}`,
        `avatarX: ${currentStep.avatarX}`,
        `avatarY: ${currentStep.avatarY}`,
        `avatarScale: ${currentStep.avatarScale}`,
      ].join("\n");
    },
    [],
  );

  const drawFrame = useCallback((force = false) => {
    const canvas = canvasRef.current;

    if (!canvas || isDestroyedRef.current) {
      return;
    }

    if (
      !force &&
      renderedFrameRef.current === lastFrameRef.current &&
      renderedStepRef.current === activeStepRef.current
    ) {
      return;
    }

    const frameIndex = clamp(
      lastFrameRef.current,
      0,
      TOTAL_FRAMES - 1,
    );

    const frameImage = findNearestLoadedFrame(
      frameImagesRef.current,
      frameIndex,
    );

    if (!frameImage) {
      return;
    }

    drawContainedImage(
      canvas,
      frameImage,
      steps[activeStepRef.current],
      isMobileRef.current,
    );

    renderedFrameRef.current = lastFrameRef.current;
    renderedStepRef.current = activeStepRef.current;
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = canvas?.parentElement;

    if (!canvas || !wrapper || isDestroyedRef.current) {
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

    drawFrame(true);
  }, [drawFrame]);

  const updateTargetProgress = useCallback(() => {
    const section = sectionRef.current;

    if (!section || isDestroyedRef.current) {
      return;
    }

    const rect = section.getBoundingClientRect();

    const scrollableDistance = Math.max(
      1,
      rect.height - window.innerHeight,
    );

    targetProgressRef.current = clamp(
      -rect.top / scrollableDistance,
      0,
      1,
    );
  }, []);

  const renderProgress = useCallback(
    (progress: number) => {
      if (!canvasRef.current || isDestroyedRef.current) {
        return;
      }

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

      const heldStepProgress = clamp(
        stepProgress / FRAME_PLAY_PORTION,
        0,
        1,
      );

      const frameRange =
        steps[nextStep].frameEnd - steps[nextStep].frameStart;

      const absoluteFrame = Math.round(
        steps[nextStep].frameStart +
          easeInOutCubic(heldStepProgress) * frameRange,
      );

      const rawFrame = clamp(
        absoluteFrame - START_FRAME,
        0,
        TOTAL_FRAMES - 1,
      );

      const nextFrame = isMobileRef.current
        ? Math.round(rawFrame / MOBILE_FRAME_STEP) *
          MOBILE_FRAME_STEP
        : rawFrame;

      const normalizedFrame = clamp(
        nextFrame,
        0,
        TOTAL_FRAMES - 1,
      );

      const didFrameChange =
        lastFrameRef.current !== normalizedFrame;

      const didStepChange =
        activeStepRef.current !== nextStep;

      lastFrameRef.current = normalizedFrame;
      activeStepRef.current = nextStep;

      updateDebug(
        progress,
        stepProgress,
        heldStepProgress,
        normalizedFrame + START_FRAME,
      );

      if (didStepChange) {
        setActiveStep(nextStep);
      }

      if (didFrameChange || didStepChange) {
        drawFrame();
      }
    },
    [drawFrame, updateDebug],
  );

  const animate = useCallback(
    function animateFrame() {
      if (isDestroyedRef.current) {
        return;
      }

      const nextProgress =
        currentProgressRef.current +
        (targetProgressRef.current -
          currentProgressRef.current) *
          FRAME_SMOOTHING;

      currentProgressRef.current =
        Math.abs(
          targetProgressRef.current - nextProgress,
        ) < 0.0005
          ? targetProgressRef.current
          : nextProgress;

      renderProgress(currentProgressRef.current);

      rafIdRef.current =
        window.requestAnimationFrame(animateFrame);
    },
    [renderProgress],
  );

  useEffect(() => {
    isDestroyedRef.current = false;

    loadedFramesRef.current = 0;
    failedFramesRef.current = 0;

    targetProgressRef.current = 0;
    currentProgressRef.current = 0;

    lastFrameRef.current =
      steps[0].frameStart - START_FRAME;

    activeStepRef.current = 0;

    renderedFrameRef.current = -1;
    renderedStepRef.current = -1;

    setActiveStep(0);
    setIsFallbackVisible(false);

    frameImagesRef.current = Array.from(
      { length: TOTAL_FRAMES },
      () => null,
    );

    const clearPreloadHandle = () => {
      if (preloadHandleRef.current !== null) {
        window.clearTimeout(preloadHandleRef.current);
        preloadHandleRef.current = null;
      }
    };

    const loadFrame = (frameIndex: number) => {
      if (
        isDestroyedRef.current ||
        frameIndex < 0 ||
        frameIndex >= TOTAL_FRAMES ||
        frameImagesRef.current[frameIndex]
      ) {
        return;
      }

      const image = new window.Image();

      frameImagesRef.current[frameIndex] = image;

      image.onload = () => {
        if (isDestroyedRef.current) {
          return;
        }

        loadedFramesRef.current += 1;

        if (
          frameIndex ===
            steps[0].frameStart - START_FRAME ||
          frameIndex ===
            steps[0].frameEnd - START_FRAME ||
          frameIndex === lastFrameRef.current
        ) {
          drawFrame(true);
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

    const priorityFrames = Array.from(
      new Set(
        steps.flatMap((step) => [
          step.frameStart - START_FRAME,
          step.frameEnd - START_FRAME,
        ]),
      ),
    );

    priorityFrames.forEach(loadFrame);

    for (
      let index = 0;
      index <
      Math.min(PRELOAD_BATCH_SIZE, TOTAL_FRAMES);
      index += 1
    ) {
      loadFrame(index);
    }

    let nextFrameToPreload = PRELOAD_BATCH_SIZE;

    const preloadBatch = () => {
      if (isDestroyedRef.current) {
        return;
      }

      const batchEnd = Math.min(
        nextFrameToPreload + PRELOAD_BATCH_SIZE,
        TOTAL_FRAMES,
      );

      for (
        let index = nextFrameToPreload;
        index < batchEnd;
        index += 1
      ) {
        loadFrame(index);
      }

      nextFrameToPreload = batchEnd;

      if (nextFrameToPreload < TOTAL_FRAMES) {
        preloadHandleRef.current =
          window.setTimeout(preloadBatch, 24);
      }
    };

    preloadHandleRef.current =
      window.setTimeout(preloadBatch, 80);

    return () => {
      isDestroyedRef.current = true;
      clearPreloadHandle();
      frameImagesRef.current = [];
    };
  }, [drawFrame]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    const updateResponsiveState = () => {
      if (isDestroyedRef.current) {
        return;
      }

      isMobileRef.current = mediaQuery.matches;

      renderedFrameRef.current = -1;
      renderedStepRef.current = -1;

      resizeCanvas();
      updateTargetProgress();
      renderProgress(currentProgressRef.current);
    };

    updateResponsiveState();

    mediaQuery.addEventListener(
      "change",
      updateResponsiveState,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateResponsiveState,
      );
    };
  }, [
    renderProgress,
    resizeCanvas,
    updateTargetProgress,
  ]);

  useEffect(() => {
    resizeCanvas();
    updateTargetProgress();
    renderProgress(currentProgressRef.current);

    if (rafIdRef.current !== null) {
      window.cancelAnimationFrame(
        rafIdRef.current,
      );

      rafIdRef.current = null;
    }

    rafIdRef.current =
      window.requestAnimationFrame(animate);

    window.addEventListener(
      "resize",
      resizeCanvas,
    );

    window.addEventListener(
      "orientationchange",
      resizeCanvas,
    );

    window.addEventListener(
      "scroll",
      updateTargetProgress,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "resize",
        resizeCanvas,
      );

      window.removeEventListener(
        "orientationchange",
        resizeCanvas,
      );

      window.removeEventListener(
        "scroll",
        updateTargetProgress,
      );

      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(
          rafIdRef.current,
        );

        rafIdRef.current = null;
      }
    };
  }, [
    animate,
    renderProgress,
    resizeCanvas,
    updateTargetProgress,
  ]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[190vh] bg-white md:h-[220vh]"
    >
      <div className="sticky top-[112px] h-[calc(100svh-112px)] overflow-hidden bg-white md:top-[64px] md:h-[calc(100vh-64px)]">
        {isFallbackVisible ? (
          <video
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center md:object-contain"
            src={`${basePath}/videos/${FALLBACK_VIDEO}?v=${FRAME_ASSET_VERSION}`}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
          />
        ) : (
          <canvas
            ref={canvasRef}
            aria-label="Avatar guia da experiência front-end"
            className="pointer-events-none absolute inset-0 z-0 block h-full w-full bg-transparent"
          />
        )}

        <div className="relative z-10 mx-auto flex h-full max-w-[1240px] items-start justify-center px-5 pb-10 pt-12 sm:px-6 md:items-center md:justify-end md:px-8 md:pb-0 md:pt-[6vh] xl:max-w-[1320px]">
          <div className="relative w-full rounded-[28px] bg-white/10 px-5 py-8 text-center md:max-w-[600px] md:-translate-y-[72px] md:rounded-none md:bg-transparent md:px-0 md:py-0 md:text-left lg:max-w-[620px] xl:max-w-[660px]">
            <div
              key={activeContent.title}
              className="transition-all duration-500 ease-out"
            >
              <TitleTag className="mx-auto max-w-[92%] text-[34px] font-black leading-[1.02] tracking-[-0.052em] text-[#303030] sm:text-[44px] md:mx-0 md:max-w-none md:text-[48px] md:leading-[0.98] lg:text-[58px] xl:text-[64px]">
                {activeContent.title}
              </TitleTag>

              <p className="mx-auto mt-7 max-w-[90%] text-[15px] leading-[1.72] text-[#4f4f4f] sm:max-w-[86%] sm:text-[16px] md:mx-0 md:mt-6 md:max-w-[590px] md:text-[17px] md:leading-[1.75] md:text-[#727272] lg:text-[18px]">
                {activeContent.text}
              </p>

              <p className="mx-auto mt-6 max-w-[88%] text-[13px] font-semibold leading-[1.6] text-[#303030] sm:text-[14px] md:mx-0 md:mt-5 md:max-w-[560px]">
                {activeContent.support}
              </p>

              {activeContent.stack?.length ? (
                <div className="mx-auto mt-7 flex max-w-[90%] flex-wrap justify-center gap-x-3 gap-y-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#555555] sm:text-[11px] md:mx-0 md:mt-6 md:max-w-[560px] md:justify-start md:gap-y-2 md:tracking-[0.18em] md:text-[#8a8a8a]">
                  {activeContent.stack.map((item, index, stackItems) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-3"
                    >
                      {item}

                      {index < stackItems.length - 1 ? (
                        <span className="h-1 w-1 rounded-full bg-[#b8b8b8] md:bg-[#cfcfcf]" />
                      ) : null}
                    </span>
                  ))}
                </div>
              ) : null}

              {activeContent.cta ? (
                <div className="mt-8 flex justify-center md:mt-9 md:justify-start">
                  <Link
                    href="/portfolio"
                    className="btn-soft-3d gap-3 text-[12px] font-black uppercase tracking-[0.18em]"
                  >
                    {activeContent.cta}

                    <ArrowUpRight className="size-4 stroke-[2]" />
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {SHOW_DEBUG ? (
          <div
            ref={debugRef}
            className="pointer-events-none fixed bottom-4 left-4 z-50 max-w-[360px] whitespace-pre-wrap rounded-2xl border border-black/10 bg-black/80 p-4 font-mono text-[11px] leading-relaxed text-white shadow-2xl"
          />
        ) : null}
      </div>
    </section>
  );
}