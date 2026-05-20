import type { ReactNode } from "react";

type CaseSectionProps = {
  title: string;
  children: ReactNode;
};

export function CaseSection({ title, children }: CaseSectionProps) {
  return (
    <section className="rounded-[24px] border border-[#E2E2E2] bg-[#F2F2F2] p-7 shadow-[8px_8px_18px_#cfcfcf,-8px_-8px_18px_#ffffff] md:p-9">
      <h2 className="text-[28px] font-black leading-none tracking-[-0.045em] text-[#303030]">
        {title}
      </h2>

      <div className="mt-5 text-[16px] leading-[1.7] text-[#727272]">
        {children}
      </div>
    </section>
  );
}
