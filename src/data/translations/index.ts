import { en } from "@/data/translations/en";
import { es } from "@/data/translations/es";
import { pt, type Translation } from "@/data/translations/pt";

import type { Language } from "@/contexts/language-context";

export { en, es, pt };
export type { Translation };

export const translations: Record<Language, Translation> = {
  pt,
  en,
  es,
};
