"use client";

import type { Language } from "@/contexts/language-context";
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/hooks/use-translation";

const languages: Language[] = ["pt", "en", "es"];

const sliderPosition: Record<Language, string> = {
  pt: "translateX(0%)",
  en: "translateX(100%)",
  es: "translateX(200%)",
};

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation();

  return (
    <div
      role="radiogroup"
      aria-label={t.language.ariaLabel}
      className="relative grid h-[38px] w-[124px] grid-cols-3 rounded-full border border-[#D7D7D7] bg-[#E6E6E6] p-[4px] shadow-[inset_3px_3px_7px_#cfcfcf,inset_-3px_-3px_7px_#ffffff]"
    >
      <span
        aria-hidden="true"
        className="absolute left-[4px] top-[4px] h-[30px] w-[calc((100%_-_8px)/3)] rounded-full border border-[#E7E7E7] bg-[linear-gradient(to_top,#F2F2F2_0%,#fff_88%)] shadow-[2px_2px_5px_#cfcfcf,-2px_-2px_5px_#ffffff] transition-transform duration-200 ease-out"
        style={{ transform: sliderPosition[language] }}
      />

      {languages.map((item) => (
        <button
          key={item}
          type="button"
          role="radio"
          aria-checked={language === item}
          aria-label={t.language.options[item]}
          onClick={() => setLanguage(item)}
          className="relative z-10 rounded-full text-[11px] font-black uppercase tracking-[0.08em] text-[#777777] outline-none transition-colors duration-200 hover:text-[#303030] focus-visible:ring-2 focus-visible:ring-[#606060] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8E8E8] aria-checked:text-[#303030]"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
