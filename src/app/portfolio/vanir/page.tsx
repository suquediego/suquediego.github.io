import { CaseHero } from "@/components/case-hero";
import { CaseSection } from "@/components/case-section";
import { PageShell } from "@/components/page-shell";

const sections = [
  "Contexto",
  "Problema",
  "Papel no projeto",
  "Processo",
  "Decisões de design",
  "Resultado esperado",
];

export default function VanirPage() {
  return (
    <PageShell>
      <CaseHero
        title="Vanir"
        category="Gateway de pagamento"
        description="Gateway de pagamento para operações PIX com foco em performance, estabilidade, monitoramento operacional e experiência para merchants."
      />

      <div className="mx-auto mt-16 grid max-w-[1180px] gap-7 md:grid-cols-2">
        {sections.map((section) => (
          <CaseSection key={section} title={section}>
            <p>
              Conteúdo em estruturação. Esta seção será refinada com contexto,
              decisões, fluxos e aprendizados do projeto sem expor informações
              sensíveis.
            </p>
          </CaseSection>
        ))}
      </div>
    </PageShell>
  );
}
