"use client";

import { works } from "@/data/works";
import { WorkCard } from "@/components/work-card";
import { useTranslation } from "@/hooks/use-translation";

export function FeaturedWork() {
  const t = useTranslation();

  return (
    <section className="relative bg-[#E8E8E8] px-4 pb-[96px] pt-[76px]">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-[34px] flex items-center justify-center gap-8">
          <div className="h-px w-full max-w-[280px] bg-[#D0D0D0]" />

          <p className="shrink-0 text-center text-[11px] font-bold uppercase tracking-[0.32em] text-[#777777]">
            {t.featuredWork.eyebrow}
          </p>

          <div className="h-px w-full max-w-[280px] bg-[#D0D0D0]" />
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 xl:grid-cols-3">
          {works.map((work) => (
            <WorkCard key={work.title} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}
