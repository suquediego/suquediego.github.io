"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { MouseEvent } from "react";

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
};

const painCards = [
  {
    title: "Consulta fragmentada",
    description:
      "Informacoes cadastrais, historico e sinais de risco precisavam ser lidos em contextos diferentes.",
  },
  {
    title: "Status pouco claros",
    description:
      "A leitura de validacao precisava explicar situacao, origem do sinal e proximo passo possivel.",
  },
  {
    title: "Baixa rastreabilidade",
    description:
      "Times internos precisavam recuperar consultas, eventos e decisoes com mais contexto operacional.",
  },
  {
    title: "Dependencia operacional",
    description:
      "Analises simples ainda exigiam apoio de areas tecnicas ou leitura manual de informacoes sensiveis.",
  },
];

const impactCards = [
  {
    metric: "Leitura centralizada",
    description:
      "Consultas, validacoes e sinais de risco reunidos em uma mesma camada de analise.",
  },
  {
    metric: "Mais autonomia",
    description:
      "Times internos ganham mais contexto para analisar CPFs e fluxos cadastrais.",
  },
  {
    metric: "Menos ambiguidade",
    description:
      "Status, historico e detalhes ajudam a reduzir interpretacoes soltas entre areas.",
  },
  {
    metric: "Apoio a decisao",
    description:
      "A experiencia organiza sinais para apoiar compliance, operacao e suporte.",
  },
];

const learningCards = [
  {
    title: "Sinal nao e decisao",
    description:
      "A interface precisa separar evidencia, contexto e acao para evitar leituras precipitadas.",
  },
  {
    title: "Risco precisa de contexto",
    description:
      "Validacao cadastral fica mais util quando o usuario entende origem, historico e recorrencia.",
  },
  {
    title: "Clareza protege a operacao",
    description:
      "Produtos de KYC exigem cuidado visual para tornar dados sensiveis compreensiveis sem expor demais.",
  },
  {
    title: "Investigacao deve ser rastreavel",
    description:
      "Cada consulta precisa ajudar o time a reconstruir o caminho da analise com seguranca.",
  },
];

function BrowserMockup() {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
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
              heimdall.rivuspay.com/kyc
            </div>
          </div>

          <div className="relative h-[430px] overflow-hidden bg-white">
            <SafeImage
              src={`${basePath}/images/heimdall-preview1.png`}
              alt="Dashboard de KYC do Heimdall"
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
            src={`${basePath}/images/heimdall-preview1.png`}
            alt="Dashboard de KYC do Heimdall"
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

function StaticBrowserMockup({
  imageSrc,
  alt = "Imagem do produto Heimdall",
  address = "heimdall.rivuspay.com/product",
  imageClassName = "object-cover object-top",
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
              <SafeImage
                src={imageSrc}
                alt={alt}
                fill
                sizes="680px"
                className={imageClassName}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6">
                <div className="flex h-[78%] w-full max-w-[520px] items-center justify-center rounded-[22px] border border-dashed border-[#CFCFCF] bg-white text-center">
                  <span className="max-w-[240px] text-sm font-semibold leading-6 text-[#8A8A8A]">
                    Placeholder para tela real do Heimdall
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

export default function HeimdallPage() {
  const heimdallPreview = `${basePath}/images/heimdall-preview1.png`;
  const heimdallDetailPreview = `${basePath}/images/heimdall-previwe2.png`;

  return (
    <PageShell variant="case">
      <article className="bg-white text-[#303030]">
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
                Heimdall: inteligencia de KYC para validacao e risco
                operacional.
              </h1>

              <p className="mt-7 max-w-[520px] text-left text-base leading-8 text-[#727272] md:text-xl md:leading-9">
                Design de uma experiencia para consultar CPFs, interpretar
                sinais de risco e apoiar decisoes em fluxos de cadastro e
                operacao.
              </p>
            </motion.div>

            <BrowserMockup />
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <StaticBrowserMockup
              imageSrc={heimdallPreview}
              alt="Visao geral do dashboard de KYC do Heimdall"
              address="heimdall.rivuspay.com/overview"
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
                Visao geral
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  O Heimdall e uma solucao de KYC criada para centralizar
                  consultas, validacoes e sinais de risco em uma experiencia
                  clara para times internos e operacoes financeiras.
                </p>

                <p>
                  A proposta da interface e organizar dados sensiveis em uma
                  leitura operacional consistente, apoiando cadastro,
                  compliance, suporte e analise de risco sem expor informacoes
                  alem do necessario.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
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
                  O produto conecta dados cadastrais, historico de consultas,
                  status de validacao e sinais comportamentais para apoiar
                  analises mais rapidas e consistentes.
                </p>

                <p>
                  A experiencia precisava atender usuarios internos que lidam
                  com investigacao, suporte, compliance e operacao, mantendo uma
                  base comum para leitura de CPF, risco e eventos relacionados.
                </p>
              </div>
            </motion.div>

            <StaticBrowserMockup
              imageSrc={heimdallDetailPreview}
              alt="Tela do Heimdall com consulta de CPF e sinais de risco"
              address="heimdall.rivuspay.com/cpf/detail"
              imageClassName="scale-[1.02] object-cover object-top"
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <div className="grid gap-5">
              <StaticBrowserMockup
                imageSrc={heimdallPreview}
                alt="Visao macro de consultas no Heimdall"
                address="heimdall.rivuspay.com/consultas"
                imageClassName="scale-[1.02] object-cover object-top"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Visao macro e detalhe
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  A pagina precisava alternar entre leitura ampla da operacao e
                  investigacao pontual de um CPF, sem separar demais o fluxo de
                  trabalho.
                </p>

                <p>
                  A visao macro ajuda a acompanhar volume de consultas, status e
                  recorrencias. O detalhe concentra informacoes necessarias para
                  interpretar cada validacao com mais seguranca.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Contexto operacional
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  Em uma operacao financeira, a validacao cadastral nao termina
                  no retorno de uma consulta. O time precisa entender historico,
                  comportamento, status e possiveis inconsistencias.
                </p>

                <p>
                  O Heimdall foi estruturado como um ponto de consulta e
                  investigacao para reduzir saltos entre ferramentas, preservar
                  contexto e apoiar decisoes internas com mais clareza.
                </p>
              </div>
            </motion.div>

            <StaticBrowserMockup
              imageSrc={heimdallDetailPreview}
              alt="Historico operacional e status de validacao no Heimdall"
              address="heimdall.rivuspay.com/risk/history"
              imageClassName="scale-[1.02] object-cover object-center"
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="grid w-full gap-5 sm:grid-cols-2"
            >
              {painCards.map((card, index) => (
                <div
                  key={card.title}
                  className={[
                    "flex min-h-[250px] flex-col gap-6 rounded-[32px] border border-[#DADADA] bg-[#F7F7F7] p-7 shadow-[0_24px_70px_rgba(48,48,48,0.06)]",
                    index === 1 ? "sm:translate-y-10" : "",
                    index === 2 ? "sm:-translate-y-2" : "",
                    index === 3 ? "sm:translate-y-8" : "",
                  ].join(" ")}
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A9A9A]">
                      Dor operacional
                    </span>

                    <h3 className="mt-4 text-[26px] font-bold leading-[1.05] tracking-[-0.035em] text-[#303030] md:text-[30px]">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-6 text-[#686868] md:text-base md:leading-7">
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
                Principais dores
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  O desafio central era reduzir a friccao de analise sem
                  simplificar demais um processo que envolve dados sensiveis,
                  sinais tecnicos e criterios operacionais.
                </p>

                <p>
                  A experiencia precisava ajudar o usuario a entender o que foi
                  consultado, qual status foi retornado, quais sinais merecem
                  atencao e como reconstruir uma investigacao depois.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                O desafio de design
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  Transformar dados sensiveis e sinais tecnicos de validacao em
                  uma interface clara, rastreavel e acionavel para usuarios
                  internos.
                </p>

                <p>
                  A solucao precisava comunicar risco sem alarmismo, status sem
                  ambiguidade e detalhe tecnico sem exigir que toda analise fosse
                  feita por times de tecnologia.
                </p>
              </div>

              <p className="mt-7 border-l border-[#BDBDBD] pl-5 text-left text-sm font-semibold leading-7 text-[#303030] md:text-base md:leading-8">
                A direcao foi tratar KYC como uma experiencia de investigacao:
                cada dado deveria ter contexto, origem e utilidade operacional.
              </p>
            </motion.div>

            <StaticBrowserMockup
              imageSrc={heimdallPreview}
              alt="Dashboard do Heimdall com organizacao de sinais de KYC"
              address="heimdall.rivuspay.com/risk"
              imageClassName="scale-[1.02] object-cover object-top"
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <StaticBrowserMockup
              imageSrc={heimdallDetailPreview}
              alt="Detalhe de consulta cadastral no Heimdall"
              address="heimdall.rivuspay.com/cpf/consulta"
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
                Meu papel
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  Atuei na organizacao da experiencia de consulta e analise,
                  estruturando hierarquia de informacao, fluxos de investigacao
                  e leitura de status para times internos.
                </p>

                <p>
                  O trabalho conectou necessidades de produto, operacao e
                  compliance para transformar informacoes tecnicas em uma base
                  mais clara de decisao.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Consulta e validacao
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  A consulta de CPF precisava apresentar resultado, historico e
                  inconsistencias de forma progressiva, permitindo leitura
                  rapida sem esconder detalhes importantes.
                </p>

                <p>
                  A interface organiza sinais de validacao para que o usuario
                  entenda o estado da analise antes de navegar por informacoes
                  complementares.
                </p>
              </div>
            </motion.div>

            <StaticBrowserMockup
              imageSrc={heimdallPreview}
              alt="Fluxo de consulta e validacao de CPF no Heimdall"
              address="heimdall.rivuspay.com/validation"
              imageClassName="scale-[1.02] object-cover object-top"
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <StaticBrowserMockup
              imageSrc={heimdallDetailPreview}
              alt="Sinais de risco e comportamento transacional no Heimdall"
              address="heimdall.rivuspay.com/behavior"
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
                Sinais de risco
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  Sinais comportamentais e cadastrais precisavam aparecer como
                  apoio a investigacao, nao como uma conclusao automatica e sem
                  contexto.
                </p>

                <p>
                  A leitura foi pensada para separar dados basicos, alertas,
                  recorrencias e historico de consulta, criando uma base mais
                  objetiva para analise interna.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="max-w-[540px]"
            >
              <h2 className="text-left text-[36px] font-bold leading-[1] tracking-[-0.035em] text-[#303030] md:text-[44px] lg:text-[48px]">
                Decisoes de design
              </h2>

              <div className="mt-7 space-y-5 text-left text-base leading-8 text-[#686868] md:text-xl md:leading-9">
                <p>
                  As decisoes de design foram guiadas por clareza operacional,
                  rastreabilidade e cuidado com informacoes sensiveis.
                </p>
              </div>

              <div className="mt-8 space-y-6 text-left">
                <div>
                  <h3 className="text-lg font-bold leading-6 tracking-[-0.02em] text-[#303030] md:text-xl">
                    Status como diagnostico
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#686868] md:text-base md:leading-8">
                    O status precisava indicar situacao, contexto e possivel
                    caminho de analise, nao apenas uma resposta isolada.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold leading-6 tracking-[-0.02em] text-[#303030] md:text-xl">
                    Detalhe progressivo
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#686868] md:text-base md:leading-8">
                    Informacoes sensiveis foram organizadas em camadas para
                    preservar leitura rapida e reduzir exposicao desnecessaria.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold leading-6 tracking-[-0.02em] text-[#303030] md:text-xl">
                    Historico rastreavel
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#686868] md:text-base md:leading-8">
                    Eventos e consultas precisam ajudar o time a entender como
                    uma analise evoluiu ao longo do tempo.
                  </p>
                </div>
              </div>
            </motion.div>

            <StaticBrowserMockup
              imageSrc={undefined}
              alt="Placeholder de decisoes de design do Heimdall"
              address="heimdall.rivuspay.com/design"
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-24 md:px-8 lg:min-h-[760px]">
          <div className="mx-auto grid min-h-[560px] max-w-[1240px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="grid w-full gap-5 sm:grid-cols-2"
            >
              {impactCards.map((card, index) => (
                <div
                  key={card.metric}
                  className={[
                    "flex min-h-[250px] flex-col gap-6 rounded-[32px] border border-[#DADADA] bg-[#F7F7F7] p-7 shadow-[0_24px_70px_rgba(48,48,48,0.06)]",
                    index === 1 ? "sm:translate-y-10" : "",
                    index === 2 ? "sm:-translate-y-2" : "",
                    index === 3 ? "sm:translate-y-8" : "",
                  ].join(" ")}
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A9A9A]">
                      Impacto percebido
                    </span>

                    <h3 className="mt-4 text-[26px] font-bold leading-[1.05] tracking-[-0.035em] text-[#303030] md:text-[30px]">
                      {card.metric}
                    </h3>
                  </div>

                  <p className="text-sm leading-6 text-[#686868] md:text-base md:leading-7">
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
                  O impacto previsto para o Heimdall esta ligado a uma leitura
                  mais centralizada de consultas, validacoes e sinais de risco
                  dentro da operacao.
                </p>

                <p>
                  A experiencia busca dar mais autonomia para analise interna,
                  reduzir ambiguidade em status e apoiar decisoes de compliance,
                  suporte e operacao.
                </p>
              </div>

              <p className="mt-7 border-l border-[#BDBDBD] pl-5 text-left text-sm font-semibold leading-7 text-[#303030] md:text-base md:leading-8">
                A proposta nao e afirmar resultado numerico, mas demonstrar uma
                direcao de produto mais rastreavel, acionavel e consistente para
                investigacao de KYC.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F3F3F3] px-5 py-24 md:px-8 lg:min-h-[760px]">
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
                  Produtos de KYC exigem uma interface que organize complexidade
                  com responsabilidade. Dados sensiveis precisam ser legiveis,
                  mas tambem precisam ser tratados com criterio.
                </p>

                <p>
                  O aprendizado principal e que uma boa experiencia de
                  validacao nao apenas mostra informacoes: ela ajuda o usuario a
                  interpretar sinais, recuperar contexto e decidir com mais
                  seguranca operacional.
                </p>
              </div>
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
                    "flex min-h-[250px] flex-col gap-6 rounded-[32px] border border-[#DADADA] bg-white p-7 shadow-[0_24px_70px_rgba(48,48,48,0.08)]",
                    index === 1 ? "sm:translate-y-10" : "",
                    index === 2 ? "sm:-translate-y-2" : "",
                    index === 3 ? "sm:translate-y-8" : "",
                  ].join(" ")}
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A9A9A]">
                      Aprendizado
                    </span>

                    <h3 className="mt-4 text-[26px] font-bold leading-[1.05] tracking-[-0.035em] text-[#303030] md:text-[30px]">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-6 text-[#686868] md:text-base md:leading-7">
                    {card.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

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
                  Por se tratar de uma solucao de KYC e analise de risco, este
                  case preserva CPFs, nomes, documentos, clientes, consultas,
                  criterios internos e dados sensiveis da operacao.
                </p>

                <p>
                  As telas apresentadas podem utilizar mockups, dados simulados
                  ou placeholders. O objetivo e demonstrar estrutura de
                  experiencia, hierarquia de informacao e decisoes de produto
                  sem revelar informacoes confidenciais.
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
