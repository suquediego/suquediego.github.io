type CaseHeroProps = {
  title: string;
  category: string;
  description: string;
};

export function CaseHero({ title, category, description }: CaseHeroProps) {
  return (
    <section className="mx-auto max-w-[1180px]">
      <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#777777]">
        {category}
      </p>

      <h1 className="mt-5 text-[56px] font-black leading-[0.92] tracking-[-0.055em] text-[#303030] sm:text-[74px] lg:text-[96px]">
        {title}
      </h1>

      <p className="mt-7 max-w-[760px] text-[18px] leading-[1.7] text-[#727272] sm:text-[20px]">
        {description}
      </p>
    </section>
  );
}
