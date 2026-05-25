"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { PageShell } from "@/components/page-shell";
import { SafeImage } from "@/components/safe-image";
import { basePath } from "@/lib/base-path";

type TiltState = {
  rotateX: number;
  rotateY: number;
};

type StaticBrowserMockupProps = {
  imageSrc?: string;
  alt?: string;
  address?: string;
  imageClassName?: string;
  imageWrapperClassName?: string;
  autoScroll?: boolean;
  scrollDistance?: string;
  scrollDuration?: number;
};

const heroPills = [
  "Product Design",
  "Gateway de pagamento",
  "Alta volumetria",
  "Payin & Payout",
  "Rastreabilidade",
  "White label",
];

const impactCards = [
  {
    metric: "Operação multi-merchant",
    description:
      "Visão consolidada para acompanhar diferentes merchants em uma única interface.",
  },
  {
    metric: "Investigação mais rápida",
    description:
      "Status, filtros e detalhes de transação acessíveis em poucos cliques.",
  },
  {
    metric: "Menos dependência operacional",
    description:
      "Mais autonomia para clientes e times internos analisarem falhas, volumes e liquidações.",
  },
  {
    metric: "Leitura financeira centralizada",
    description:
      "Saldo, payin, payout, settlement e extratos reunidos em uma experiência única.",
  },
  {
    metric: "Alto volume diário",
    description:
      "Interface preparada para apoiar operações financeiras com grande fluxo transacional.",
  },
];

const learningCards = [
  {
    title: "Clareza antes de estética",
    description:
      "Em dashboards operacionais, beleza visual só funciona quando ajuda o usuário a entender e agir mais rápido.",
  },
  {
    title: "Dados precisam virar ação",
    description:
      "Cada componente precisava responder a uma necessidade real: encontrar, comparar, investigar ou decidir.",
  },
  {
    title: "Produto se constrói perto da operação",
    description:
      "A proximidade com suporte, financeiro, comercial e tecnologia foi essencial para transformar dores reais em interface.",
  },
  {
    title: "Complexidade precisa ser organizada",
    description:
      "O papel do design foi reduzir esforço cognitivo sem esconder a profundidade da operação financeira.",
  },
];

/* MOCKUP PRINCIPAL DA HERO COM ANIMAÇÃO DE MOUSE */
function BrowserMockup() {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    const middleX = bounds.width / 2;
    const middleY = bounds.height / 2;

    const rotateY = ((x - middleX) / middleX) * 5;
    const rotateX = -((y - middleY) / middleY) * 4;

    setTilt({ rotateX, rotateY });
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 44, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.2, duration: 0.85, ease: "easeInOut" }}
      className="w-full [perspective:1400px]"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative hidden rounded-[30px] border border-[#DDDDDD] bg-[#F7F7F7] p-3 shadow-[0_26px_70px_rgba(48,48,48,0.14)] transition-shadow duration-300 hover:shadow-[0_34px_90px_rgba(48,48,48,0.2)] lg:block"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 160ms ease-out",
        }}
      >
        <div
          className="overflow-hidden rounded-[22px] border border-[#E2E2E2] bg-white"
          style={{ transform: "translateZ(24px)" }}
        >
          <div className="flex h-11 items-center gap-3 border-b border-[#E2E2E2] bg-[#F7F7F7] px-5">
            <div className="flex gap-2">
              <span className="size-3 rounded-full bg-[#D9D9D9]" />
              <span className="size-3 rounded-full bg-[#CFCFCF]" />
              <span className="size-3 rounded-full bg-[#BDBDBD]" />
            </div>

            <div className="mx-auto flex h-7 w-[48%] items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[11px] font-semibold text-[#777777]">
              vanir.rivuspay.com/dashboard
            </div>
          </div>

          <div className="relative h-[430px] overflow-hidden bg-white">
            <SafeImage
              src={`${basePath}/images/cases/vanir/dashboard-hero.png`}
              alt="Dashboard operacional do Vanir"
              fill
              priority
              sizes="680px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[26px] border border-[#DDDDDD] bg-white shadow-[0_20px_60px_rgba(48,48,48,0.14)] lg:hidden">
        <div className="flex h-10 items-center gap-2 border-b border-[#E2E2E2] bg-[#F7F7F7] px-4">
          <span className="size-2.5 rounded-full bg-[#D9D9D9]" />
          <span className="size-2.5 rounded-full bg-[#CFCFCF]" />
          <span className="size-2.5 rounded-full bg-[#BDBDBD]" />
          <div className="ml-3 h-5 flex-1 rounded-full border border-[#DDDDDD] bg-white" />
        </div>

        <div className="relative h-[280px] overflow-hidden bg-white sm:h-[360px]">
          <SafeImage
            src={`${basePath}/images/cases/vanir/dashboard-hero.png`}
            alt="Dashboard operacional do Vanir"
            fill
            priority
            sizes="(min-width: 640px) 640px, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* MOCKUP ESTÁTICO REUTILIZÁVEL PARA AS SEÇÕES DO CASE */
function StaticBrowserMockup({
  imageSrc,
  alt = "Imagem do produto Vanir",
  address = "vanir.rivuspay.com/product",
  imageClassName = "object-cover object-top",
  imageWrapperClassName = "h-full",
  autoScroll = false,
  scrollDistance = "-24%",
  scrollDuration = 16,
}: StaticBrowserMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="w-full"
    >
      <div className="overflow-hidden rounded-[30px] border border-[#DADADA] bg-[#F7F7F7] p-3 shadow-[0_24px_70px_rgba(48,48,48,0.12)]">
        <div className="overflow-hidden rounded-[22px] border border-[#E2E2E2] bg-white">
          <div className="flex h-11 items-center gap-3 border-b border-[#E2E2E2] bg-[#F7F7F7] px-5">
            <div className="flex gap-2">
              <span className="size-3 rounded-full bg-[#D9D9D9]" />
              <span className="size-3 rounded-full bg-[#CFCFCF]" />
              <span className="size-3 rounded-full bg-[#BDBDBD]" />
            </div>

            <div className="mx-auto flex h-7 w-[48%] items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[11px] font-semibold text-[#777777]">
              {address}
            </div>
          </div>

          <div className="relative h-[390px] overflow-hidden bg-white">
            {imageSrc ? (
              autoScroll ? (
                <motion.div
                  role="img"
                  aria-label={alt}
                  className={`absolute inset-x-0 top-0 bg-top bg-no-repeat ${imageWrapperClassName}`}
                  style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "100% auto",
                  }}
                  animate={{ y: ["0%", scrollDistance, "0%"] }}
                  transition={{
                    duration: scrollDuration,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
              ) : (
                <SafeImage
                  src={imageSrc}
                  alt={alt}
                  fill
                  sizes="680px"
                  className={imageClassName}
                />
              )
            ) : (
              <div className="flex h-full items-center justify-center px-6">
                <div className="flex h-[78%] w-full max-w-[520px] items-center justify-center rounded-[22px] border border-dashed border-[#CFCFCF] bg-white text-center">
                  <span className="max-w-[220px] text-sm font-semibold leading-6 text-[#8A8A8A]">
                    Espaço reservado para imagem do produto
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* SHOWCASE EM VÍDEO DO DASHBOARD COMPLETO */
function DashboardVideoShowcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.playbackRate = 0.65;

    const timeout = window.setTimeout(() => {
      video.playbackRate = 1;
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: "easeInOut" }}
      className="mx-auto w-full max-w-[1240px]"
    >
      <div className="overflow-hidden rounded-[34px] border border-[#DADADA] bg-[#F7F7F7] p-3 shadow-[0_30px_90px_rgba(48,48,48,0.14)]">
        <div className="overflow-hidden rounded-[24px] border border-[#E2E2E2] bg-white">
          <div className="flex h-11 items-center gap-3 border-b border-[#E2E2E2] bg-[#F7F7F7] px-5">
            <div className="flex gap-2">
              <span className="size-3 rounded-full bg-[#D9D9D9]" />
              <span className="size-3 rounded-full bg-[#CFCFCF]" />
              <span className="size-3 rounded-full bg-[#BDBDBD]" />
            </div>

            <div className="mx-auto flex h-7 w-[42%] items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[11px] font-semibold text-[#777777]">
              vanir.rivuspay.com/dashboard
            </div>
          </div>

          <div className="relative aspect-[21/9] overflow-hidden bg-white">
            <video
              ref={videoRef}
              src={`${basePath}/videos/vanir-dashboard-overview.mp4`}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full scale-[1.035] object-cover object-top"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* VISUAL EDITORIAL DOS MÓDULOS DE NAVEGAÇÃO */
function NavigationModulesVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="relative min-h-[420px] w-full overflow-visible md:min-h-[520px] lg:-ml-10 lg:min-h-[680px] lg:w-[108%] xl:-ml-20 xl:min-h-[760px] xl:w-[116%]"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl lg:h-[620px] lg:w-[620px]" />
      <div className="pointer-events-none absolute -left-10 top-0 h-[260px] w-[260px] rounded-full bg-[#E7E7E7] blur-3xl lg:-left-20 lg:h-[360px] lg:w-[360px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-white blur-3xl lg:h-[360px] lg:w-[360px]" />

      <SafeImage
        src={`${basePath}/images/cases/vanir/vanir-navigation-modules.png`}
        alt="Recortes da navegação e módulos operacionais do Vanir"
        fill
        sizes="(min-width: 1280px) 760px, (min-width: 1024px) 560px, 100vw"
        className="scale-[1.05] object-contain object-center drop-shadow-[0_32px_70px_rgba(48,48,48,0.18)] lg:scale-[1.14] lg:object-cover xl:scale-[1.22]"
      />
    </motion.div>
  );
}

export default function VanirPage() {
  return (
    <PageShell variant="case">
      <article className="bg-white text-[#303030]">
        {/* HERO */}
        <section className="relative overflow-hidden px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
          <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#F2F2F2] blur-3xl" />

          <div className="relative mx-auto grid max-w-[1240px] items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -44, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="max-w-[560px] pt-2 lg:pt-20"
            >
              <h1 className="text-left text-[38px] font-black leading-[0.98] tracking-[-0.045em] text-[#303030] md:text-[48px] lg:text-[54px]">
                Vanir: Dashboard operacional para gateways de alto volume.
              </h1>

              <p className="mt-7 max-w-[520px] text-left text-base leading-8 text-[#727272] md:text-xl md:leading-9">
                Desenhando eficiência para fluxos transacionais complexos e
                gestão de dados em tempo real.
              </p>

              <div className="mt-8 flex max-w-[540px] flex-wrap gap-2.5">
                {heroPills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-[14px] border border-[#DADADA] bg-[#F4F4F4] px-4 py-2 text-[13px] font-semibold leading-none tracking-[-0.01em] text-[#4A4A4A] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors duration-200 hover:border-[#C9C9C9] hover:bg-white"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </motion.div>

            <BrowserMockup />
          </div>
        </section>

        {/* VISÃO GERAL */}
        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <StaticBrowserMockup
              imageSrc={`${basePath}/images/cases/vanir/dashboard-full.png`}
              alt="Visão geral do dashboard operacional do Vanir"
              address="vanir.rivuspay.com/dashboard"
              imageClassName="scale-[1.02] object-cover object-top"
            />

            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Visão geral
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  Vanir é um gateway de pagamento criado para operações que não
                  podem esperar. Em mercados de alto volume, como bet, iGaming e
                  clientes white label, encontrar uma transação, entender uma
                  falha ou acompanhar o saldo de um merchant precisa acontecer em
                  segundos.
                </p>

                <p>
                  O desafio era transformar uma operação financeira complexa em
                  uma experiência clara, rápida e confiável, centralizando payin,
                  payout, settlement, balance, relatórios e investigação de
                  transações em tempo real.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SHOWCASE DO DASHBOARD */}
        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-[860px] text-left">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Da visão macro ao detalhe operacional
              </h2>

              <p className="mt-7 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                A interface foi desenhada para permitir que o usuário acompanhe
                a operação em diferentes níveis: dos indicadores consolidados até
                a investigação de transações específicas.
              </p>
            </motion.div>
          </div>

          <div className="mt-14">
            <DashboardVideoShowcase />
          </div>
        </section>

        {/* O PROBLEMA */}
        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                O problema
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  Em operações financeiras de alto volume, cada segundo importa.
                </p>

                <p>
                  Antes do dashboard, parte da investigação dependia da leitura
                  de logs técnicos, endpoints, payloads JSON e eventos de
                  webhook. Isso tornava a análise mais lenta e aumentava a
                  dependência de pessoas técnicas para interpretar falhas ou
                  localizar transações.
                </p>
              </div>

              <p className="mt-7 border-l border-[#BDBDBD] pl-5 text-left text-sm font-semibold leading-7 text-[#303030] md:text-base md:leading-8">
                O desafio era traduzir uma operação transacional complexa em uma
                experiência simples, rápida e confiável.
              </p>
            </motion.div>

            <StaticBrowserMockup
              imageSrc={`${basePath}/images/cases/vanir/axiom-logs-gateway-blur.png`}
              alt="Logs técnicos no Axiom usados para investigação de fluxos do gateway"
              address="axiom.co/logs/gateway"
              imageClassName="scale-[1.04] object-cover object-center"
            />
          </div>
        </section>

        {/* CONTEXTO DO PRODUTO */}
        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-20 md:px-8 lg:min-h-[760px] lg:py-0">
          <div className="mx-auto grid min-h-[620px] max-w-[1240px] items-center gap-12 lg:min-h-[760px] lg:grid-cols-[0.94fr_1.06fr] lg:gap-24 xl:grid-cols-[1fr_1fr] xl:gap-32">
            <NavigationModulesVisual />

            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Contexto do produto
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  O Vanir foi desenhado para empresas com diferentes estruturas
                  operacionais. Alguns clientes tinham times técnicos próprios
                  para integração via API; em outros casos, a equipe interna
                  apoiava ou realizava parte da configuração para reduzir
                  fricção na implementação.
                </p>

                <p>
                  A plataforma precisava atender operação, suporte, financeiro,
                  produto, times técnicos, clientes white label e merchants
                  dentro de uma mesma base de experiência.
                </p>

                <p>
                  Isso exigia uma interface flexível o suficiente para usuários
                  técnicos e não técnicos, mantendo consistência no produto e
                  permitindo adaptações de navegação, marca e chamadas visuais
                  conforme o cliente.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MEU PAPEL */}
        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Meu papel
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  Atuei desde a estruturação da experiência até a consolidação da
                  interface final.
                </p>

                <p>
                  O backend e uma estrutura provisória já existiam, mas a jornada
                  ainda precisava ser organizada, refinada e transformada em um
                  produto mais claro. A partir disso, desenhei os principais
                  fluxos, telas e componentes da plataforma, com foco em
                  dashboards, payin, payout e filtros para busca de transações.
                </p>

                <p>
                  Minha atuação conectou produto, operação, suporte e comercial
                  para transformar dores reais de uso em decisões de interface.
                </p>
              </div>

              <p className="mt-7 border-l border-[#BDBDBD] pl-5 text-left text-sm font-semibold leading-7 text-[#303030] md:text-base md:leading-8">
                Mais do que desenhar telas, meu trabalho foi dar forma visual e
                funcional para problemas recorrentes da operação.
              </p>
            </motion.div>

            <StaticBrowserMockup
              imageSrc={`${basePath}/images/cases/vanir/vanir-product-design-process.png`}
              alt="Processo de design do Vanir com tela de payout, drawer de filtros e especificações para desenvolvimento"
              address="figma.com/vanir/design-process"
              imageClassName="scale-[1.035] object-cover object-center"
            />
          </div>
        </section>

        {/* A SOLUÇÃO */}
        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <StaticBrowserMockup
              imageSrc={`${basePath}/images/cases/vanir/vanir-solution-dashboard.png`}
              alt="Dashboard operacional do Vanir com indicadores, gráficos e transações"
              address="vanir.rivuspay.com/dashboard"
              imageWrapperClassName="h-[760px]"
              autoScroll
              scrollDistance="-38%"
              scrollDuration={16}
            />

            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                A solução
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  A solução foi criar um dashboard operacional com leitura
                  rápida, atualização constante e foco em rastreabilidade.
                </p>

                <p>
                  A interface passou a permitir que usuários acompanhassem
                  indicadores essenciais, investigassem transações específicas e
                  entendessem o comportamento da operação em diferentes períodos.
                </p>

                <p>
                  A experiência conectava dados de balance, payin, payout,
                  settlement, volume transacional e transações em tempo real em
                  uma visão mais clara e acionável.
                </p>
              </div>

              <p className="mt-7 border-l border-[#BDBDBD] pl-5 text-left text-sm font-semibold leading-7 text-[#303030] md:text-base md:leading-8">
                A ideia era simples: sair de uma visão macro da operação para o
                detalhe de uma transação em poucos cliques.
              </p>
            </motion.div>
          </div>
        </section>

        {/* OPERAÇÃO EM TEMPO REAL */}
        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Operação em tempo real
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  A experiência combinava visão executiva e leitura operacional em uma
                  mesma interface.
                </p>

                <p>
                  O usuário acompanhava saldo, entrada, saída e settlement, enquanto
                  visualizava transações em tempo real com status claros e atualização
                  constante.
                </p>

                <p>
                  Essa estrutura ajudava suporte, financeiro e operação a trabalharem
                  com a mesma fonte de informação, acelerando investigações e reduzindo
                  ruídos entre áreas.
                </p>
              </div>
            </motion.div>

            <StaticBrowserMockup
              imageSrc={`${basePath}/images/cases/vanir/vanir-realtime-operation.png`}
              alt="Dashboard do Vanir com indicadores operacionais, gráficos de merchants e transações em tempo real"
              address="vanir.rivuspay.com/dashboard"
              imageWrapperClassName="h-[760px]"
              autoScroll
              scrollDistance="-48%"
              scrollDuration={16}
            />
          </div>
        </section>

        {/* BUSCA, FILTROS E RASTREABILIDADE */}
        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <StaticBrowserMockup
              imageSrc={`${basePath}/images/cases/vanir/vanir-search-filters.png`}
              alt="Tela do Vanir com drawer de filtros avançados para busca de transações"
              address="vanir.rivuspay.com/payouts"
              imageClassName="scale-[1.02] object-cover object-center"
            />

            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Busca, filtros e rastreabilidade
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  A busca por transações foi uma das áreas que recebeu mais atenção no
                  projeto.
                </p>

                <p>
                  Em operações com alto volume, uma tabela comum não é suficiente. O
                  usuário precisa filtrar, cruzar informações e chegar rapidamente no
                  dado certo.
                </p>

                <p>
                  Os filtros foram desenhados para facilitar a localização de transações
                  por merchant, status, período, tipo de operação e outros critérios
                  relevantes para investigação.
                </p>

                <p>
                  Ao clicar em uma transação, o usuário acessava o extrato detalhado da
                  operação, entendendo status, caminho da transação e possíveis motivos
                  de erro.
                </p>
              </div>

              <p className="mt-7 border-l border-[#BDBDBD] pl-5 text-left text-sm font-semibold leading-7 text-[#303030] md:text-base md:leading-8">
                Essa decisão reduziu a dependência de explicações externas e deu mais
                autonomia para clientes e times internos.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CLAREZA DE STATUS E ERROS */}
        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Clareza de status e erros
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  Em produtos financeiros, mostrar que uma transação falhou não é
                  suficiente. O usuário precisa entender por que ela falhou e qual o
                  próximo passo possível.
                </p>

                <p>
                  Por isso, uma das prioridades da interface foi tornar status,
                  mensagens de erro e detalhes transacionais mais claros e acessíveis.
                </p>

                <p>
                  A experiência permitia identificar rapidamente se uma transação estava
                  concluída, pendente, falhada ou se o erro vinha de um parceiro externo,
                  instabilidade bancária ou ambiente fora do controle da plataforma.
                </p>
              </div>

              <p className="mt-7 border-l border-[#BDBDBD] pl-5 text-left text-sm font-semibold leading-7 text-[#303030] md:text-base md:leading-8">
                Com um clique, o usuário acessava detalhes da transação e possíveis
                motivos de erro sem depender imediatamente do suporte.
              </p>
            </motion.div>

            <StaticBrowserMockup
              imageSrc={`${basePath}/images/cases/vanir/vanir-transaction-status-detail.png`}
              alt="Detalhe de payout no Vanir com status de erro, motivo da falha e identificadores da transação"
              address="vanir.rivuspay.com/payouts/detail"
              imageClassName="scale-[1.02] object-cover object-center"
            />
          </div>
        </section>

        {/* WHITE LABEL */}
        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <StaticBrowserMockup
              imageSrc={`${basePath}/images/cases/vanir/vanir-white-label-dashboard.png`}
              alt="Dashboard do Vanir em versão white label com identidade visual personalizada"
              address="cliente.rivuspay.com/dashboard"
              imageWrapperClassName="h-[620px]"
              autoScroll
              scrollDistance="-22%"
              scrollDuration={20}
            />

            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                White label
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  O Vanir também precisava funcionar como solução white label, mantendo
                  uma estrutura principal consistente e adaptável para diferentes
                  clientes.
                </p>

                <p>
                  A base da interface permanecia limpa, clara e predominantemente
                  branca. A personalização acontecia em pontos estratégicos como logo,
                  chamadas, CTAs e navegação, conforme a necessidade de cada operação.
                </p>

                <p>
                  Essa abordagem permitia adaptar a experiência para diferentes marcas
                  sem comprometer a consistência, a manutenção e a evolução do produto.
                </p>
              </div>

              <p className="mt-7 border-l border-[#BDBDBD] pl-5 text-left text-sm font-semibold leading-7 text-[#303030] md:text-base md:leading-8">
                O desafio de design era equilibrar personalização com escalabilidade: o
                produto precisava parecer próprio para o cliente, mas continuar fácil de
                operar internamente.
              </p>
            </motion.div>
          </div>
        </section>

        {/* DECISÕES DE DESIGN */}
        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Decisões de design
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  As principais decisões de design foram guiadas por velocidade, clareza
                  e confiança.
                </p>

                <p>
                  Como o produto lidava com dados financeiros e alto volume
                  transacional, a interface não podia competir com a informação. O
                  design precisava organizar, priorizar e facilitar a leitura.
                </p>

                <p>
                  A experiência priorizou indicadores críticos no topo, navegação clara
                  para diferentes perfis, leitura rápida de status, filtros como parte
                  central da investigação e proximidade entre dashboard e tabela de
                  transações.
                </p>

                <p>
                  Essas decisões ajudaram a reduzir dúvidas recorrentes, preparar a
                  interface para clientes white label e criar uma experiência robusta
                  sem afastar usuários não técnicos.
                </p>
              </div>
            </motion.div>

            <StaticBrowserMockup
              imageSrc={`${basePath}/images/cases/vanir/vanir-design-decisions.png`}
              alt="Tela do Vanir mostrando decisões de design com timeline, indicadores, gráficos e tabela operacional"
              address="vanir.rivuspay.com/accounts"
              imageWrapperClassName="h-[820px]"
              autoScroll
              scrollDistance="-52%"
              scrollDuration={20}
            />
          </div>
        </section>

        {/* IMPACTO */}
        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="grid w-full gap-5 sm:grid-cols-2"
            >
              {impactCards.slice(0, 4).map((card, index) => (
                <div
                  key={card.metric}
                  className={[
                    "flex min-h-[250px] flex-col justify-between rounded-[32px] border border-[#DADADA] bg-white p-7 shadow-[0_24px_70px_rgba(48,48,48,0.08)]",
                    index === 1 ? "sm:translate-y-10" : "",
                    index === 2 ? "sm:-translate-y-2" : "",
                    index === 3 ? "sm:translate-y-8" : "",
                  ].join(" ")}
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A9A9A]">
                      Impacto percebido
                    </span>

                    <h3 className="mt-5 text-[26px] font-bold leading-[1.05] tracking-[-0.035em] text-[#303030] md:text-[30px]">
                      {card.metric}
                    </h3>
                  </div>

                  <p className="mt-8 text-sm leading-6 text-[#686868] md:text-base md:leading-7">
                    {card.description}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Impacto
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  A evolução do Vanir transformou o dashboard em uma camada central de
                  monitoramento, investigação e tomada de decisão para operações
                  financeiras de alto volume.
                </p>

                <p>
                  Antes, dúvidas sobre falhas, atrasos, status e localização de
                  transações dependiam com frequência de leitura técnica, consulta aos
                  times internos ou cruzamento manual de informações.
                </p>

                <p>
                  Com a nova experiência, clientes, merchants e áreas internas passaram
                  a acessar essas respostas de forma mais direta dentro da própria
                  plataforma.
                </p>
              </div>

              <p className="mt-7 border-l border-[#BDBDBD] pl-5 text-left text-sm font-semibold leading-7 text-[#303030] md:text-base md:leading-8">
                O principal ganho foi operacional: mais autonomia para investigar
                transações, melhor leitura de status e menor dependência do suporte para
                dúvidas recorrentes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* APRENDIZADOS */}
        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Aprendizados
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  O Vanir mostrou como design de produto pode reduzir complexidade em
                  ambientes financeiros de alta pressão.
                </p>

                <p>
                  A principal lição foi que, em dashboards operacionais, beleza visual
                  não pode estar separada de clareza. Cada componente precisa ajudar o
                  usuário a encontrar uma transação, entender um erro, acompanhar um
                  saldo ou tomar uma decisão rápida.
                </p>

                <p>
                  O projeto também reforçou a importância de estar perto de quem usa e
                  opera o produto. Trabalhar com suporte, comercial, financeiro e
                  tecnologia ajudou a transformar problemas recorrentes em melhorias
                  concretas de experiência.
                </p>
              </div>

              <p className="mt-7 border-l border-[#BDBDBD] pl-5 text-left text-sm font-semibold leading-7 text-[#303030] md:text-base md:leading-8">
                No fim, o Vanir deixou de ser apenas uma interface para visualizar
                transações e passou a funcionar como uma camada de inteligência
                operacional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="grid w-full gap-5 sm:grid-cols-2"
            >
              {learningCards.map((card, index) => (
                <div
                  key={card.title}
                  className={[
                    "flex min-h-[250px] flex-col justify-between rounded-[32px] border border-[#DADADA] bg-[#F7F7F7] p-7 shadow-[0_24px_70px_rgba(48,48,48,0.06)]",
                    index === 1 ? "sm:translate-y-10" : "",
                    index === 2 ? "sm:-translate-y-2" : "",
                    index === 3 ? "sm:translate-y-8" : "",
                  ].join(" ")}
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A9A9A]">
                      Aprendizado
                    </span>

                    <h3 className="mt-5 text-[26px] font-bold leading-[1.05] tracking-[-0.035em] text-[#303030] md:text-[30px]">
                      {card.title}
                    </h3>
                  </div>

                  <p className="mt-8 text-sm leading-6 text-[#686868] md:text-base md:leading-7">
                    {card.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CONFIDENCIALIDADE */}
        <section className="relative overflow-hidden bg-white px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-[920px]">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="rounded-[32px] border border-[#DADADA] bg-[#F7F7F7] p-8 text-center shadow-[0_24px_70px_rgba(48,48,48,0.08)] md:p-12"
            >
              <h2 className="text-center text-[32px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[40px] lg:text-[44px]">
                Confidencialidade
              </h2>

              <div className="mx-auto mt-7 max-w-[760px] space-y-5 text-center text-base leading-8 text-[#686868] md:text-lg md:leading-8">
                <p>
                  Por se tratar de um produto financeiro com dados sensíveis, este case
                  não expõe nomes de clientes, merchants, CPFs, documentos, valores
                  identificáveis ou informações privadas da operação.
                </p>

                <p>
                  As telas apresentadas no portfólio podem utilizar mockups, dados
                  simulados ou volumes agregados, preservando a estrutura da experiência
                  sem revelar informações estratégicas ou confidenciais.
                </p>
              </div>

              <div className="mt-9 flex justify-center">
                <a
                  href={`${basePath}/portfolio`}
                  className="btn-soft-3d h-[46px] min-w-[210px] px-[26px]"
                >
                  Voltar para projetos
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}