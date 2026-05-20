import { CaseSection } from "@/components/case-section";
import { PageShell } from "@/components/page-shell";

const sections = [
  {
    title: "Stack",
    text: "Next.js, React, TypeScript, Tailwind, shadcn/ui, Lucide e ferramentas modernas de construção de interfaces.",
  },
  {
    title: "Componentização",
    text: "Criação de componentes reutilizáveis, estados previsíveis e estruturas fáceis de evoluir.",
  },
  {
    title: "Interfaces responsivas",
    text: "Adaptação de layouts para diferentes tamanhos de tela, mantendo hierarquia, legibilidade e consistência visual.",
  },
  {
    title: "Projetos implementados",
    text: "Base para destacar produtos, estudos e interfaces desenvolvidas com foco em execução front-end.",
  },
];

export default function FrontEndPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1180px]">
        <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#777777]">
          Interface
        </p>

        <h1 className="mt-5 text-[56px] font-black leading-[0.92] tracking-[-0.055em] text-[#303030] sm:text-[74px] lg:text-[96px]">
          Front-end
        </h1>

        <p className="mt-7 max-w-[820px] text-[18px] leading-[1.7] text-[#727272] sm:text-[20px]">
          Além do design de produto, também atuo na implementação de interfaces
          com Next.js, React, TypeScript, Tailwind, shadcn/ui e Lucide.
        </p>
      </section>

      <div className="mx-auto mt-16 grid max-w-[1180px] gap-7 md:grid-cols-2">
        {sections.map((section) => (
          <CaseSection key={section.title} title={section.title}>
            <p>{section.text}</p>
          </CaseSection>
        ))}
      </div>
    </PageShell>
  );
}
