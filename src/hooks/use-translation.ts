"use client";

import { useLanguage } from "@/contexts/language-context";
import { pt, translations } from "@/data/translations";

export function useTranslation() {
  const { language } = useLanguage();

  return translations[language] ?? pt;
}
