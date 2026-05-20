import { CaseSection } from "@/components/case-section";
import { PageShell } from "@/components/page-shell";

const blocks = [
  {
    title: "Atuação",
    text: "Estruturação de jornadas, fluxos, interfaces e sistemas visuais para produtos digitais complexos.",
  },
  {
    title: "Experiência",
    text: "Base para detalhar trajetórias, tipos de produto, responsabilidades e aprendizados relevantes.",
  },
  {
    title: "Ferramentas",
    text: "Espaço para organizar ferramentas de design, documentação, prototipação, pesquisa e implementação.",
  },
  {
    title: "Design + Front-end",
    text: "Conexão entre decisões de produto, qualidade visual, componentização e viabilidade técnica.",
  },
];

export default function SobrePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1180px]">
        <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#777777]">
          Diego Suque
        </p>

        <h1 className="mt-5 text-[56px] font-black leading-[0.92] tracking-[-0.055em] text-[#303030] sm:text-[74px] lg:text-[96px]">
          Sobre
        </h1>

        <p className="mt-7 max-w-[840px] text-[18px] leading-[1.7] text-[#727272] sm:text-[20px]">
          Sou Diego Suque, Product Designer com experiência em UX/UI, design
          system, pesquisa, prototipação, produtos financeiros e implementação
          front-end. Atuo na criação de interfaces para produtos digitais
          complexos, conectando regras de negócio, experiência do usuário e
          execução visual.
        </p>
      </section>

      <div className="mx-auto mt-16 grid max-w-[1180px] gap-7 md:grid-cols-2">
        {blocks.map((block) => (
          <CaseSection key={block.title} title={block.title}>
            <p>{block.text}</p>
          </CaseSection>
        ))}
      </div>
    </PageShell>
  );
}
