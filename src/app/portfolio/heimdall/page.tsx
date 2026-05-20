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

export default function HeimdallPage() {
  return (
    <PageShell>
      <CaseHero
        title="Heimdall"
        category="KYC / Compliance"
        description="Plataforma de KYC para análise de identidade, validação cadastral, compliance e tomada de decisão em ambientes financeiros."
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
