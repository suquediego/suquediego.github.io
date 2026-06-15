"use client";

import { CaseSection } from "@/components/case-section";
import { PageShell } from "@/components/page-shell";
import { useTranslation } from "@/hooks/use-translation";

export default function SobrePage() {
  const t = useTranslation();

  return (
    <PageShell>
      <section className="mx-auto max-w-[1180px]">
        <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#777777]">
          {t.pages.about.eyebrow}
        </p>

        <h1 className="mt-5 text-[56px] font-black leading-[0.92] tracking-[-0.055em] text-[#303030] sm:text-[74px] lg:text-[96px]">
          {t.pages.about.title}
        </h1>

        <p className="mt-7 max-w-[840px] text-[18px] leading-[1.7] text-[#727272] sm:text-[20px]">
          {t.pages.about.description}
        </p>
      </section>

      <div className="mx-auto mt-16 grid max-w-[1180px] gap-7 md:grid-cols-2">
        {t.pages.about.blocks.map((block) => (
          <CaseSection key={block.title} title={block.title}>
            <p>{block.text}</p>
          </CaseSection>
        ))}
      </div>
    </PageShell>
  );
}
