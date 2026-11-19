import type { Locale } from '../config/siteConfig';
import { VERIFIED_CATEGORIES, type DirectoryCategory } from './verifiedDirectory';
import { stripLeadingEmoji } from '../utils/textUtils';

export const CATEGORY_SEO_SLUGS: Record<string, Record<Locale, string>> = {
  'real-estate': {
    en: 'real-estate',
    el: 'akinita-mesites',
    ru: 'nedvizhimost',
  },
  'lawyers-relocation': {
    en: 'lawyers-relocation',
    el: 'dikigoroi-foroi',
    ru: 'yuristy-nalogi',
  },
  'car-rental-mobility': {
    en: 'car-rental-mobility',
    el: 'enoikiasi-autokinitou',
    ru: 'prokat-avto',
  },
  'medical-dental': {
    en: 'medical-dental',
    el: 'iatrikes-klinikes',
    ru: 'kliniki-stomatologiya',
  },
  'it-business-services': {
    en: 'it-business-services',
    el: 'pliroforiki-ypiresies',
    ru: 'it-biznes-servisy',
  },
  'renovation-construction': {
    en: 'renovation-construction',
    el: 'anakainiseis-kataskeves',
    ru: 'remont-stroitelstvo',
  },
};

export function getCategoryRouteSlug(catSlug: string, lang: Locale): string {
  return CATEGORY_SEO_SLUGS[catSlug]?.[lang] || catSlug;
}

export function getCategoryUrl(catSlug: string, lang: Locale): string {
  const routeSlug = getCategoryRouteSlug(catSlug, lang);
  return `/${lang}/${routeSlug}/`;
}

export function resolveCategoryByRouteParam(routeParam: string, lang: Locale): DirectoryCategory | undefined {
  const normalized = routeParam.toLowerCase().trim();
  for (const cat of VERIFIED_CATEGORIES) {
    if (cat.slug === normalized) return cat;
    const localized = CATEGORY_SEO_SLUGS[cat.slug]?.[lang];
    if (localized === normalized) return cat;
    for (const l of Object.values(CATEGORY_SEO_SLUGS[cat.slug] || {})) {
      if (l === normalized) return cat;
    }
  }
  return undefined;
}

export function getCategorySeoMeta(cat: DirectoryCategory, lang: Locale): {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
} {
  const cleanTitle = stripLeadingEmoji(cat.titles[lang] || cat.titles.en);
  const count = cat.items.length;

  const titles: Record<Locale, string> = {
    en: `${cleanTitle} in Cyprus — Top ${count} Verified (2026) | CyprusTopIndex`,
    el: `${cleanTitle} στην Κύπρο — Top ${count} Επαληθευμένα (2026) | CyprusTopIndex`,
    ru: `${cleanTitle} на Кипре — Топ-${count} проверенных (2026) | CyprusTopIndex`,
  };

  const descriptions: Record<Locale, string> = {
    en: `Verified ${cleanTitle.toLowerCase()} in Limassol, Nicosia, Larnaca & Paphos. Direct contacts, EUR (€) market prices (2026), and official websites.`,
    el: `Επαληθευμένα ${cleanTitle.toLowerCase()} σε Λεμεσό, Λευκωσία, Λάρνακα & Πάφο. Άμεσες επαφές, τιμές αγοράς σε EUR (€) για το 2026.`,
    ru: `Проверенные компании в категории «${cleanTitle}» в Лимассоле, Никосии, Ларнаке и Пафосе. Прямые контакты, цены в EUR (€) на 2026 год.`,
  };

  const h1s: Record<Locale, string> = {
    en: `${cleanTitle} in Cyprus (2026)`,
    el: `${cleanTitle} στην Κύπρο (2026)`,
    ru: `${cleanTitle} на Кипре (2026)`,
  };

  const subtitles: Record<Locale, string> = {
    en: `Curated directory of ${count} verified providers across Limassol, Nicosia, Larnaca & Paphos with direct contacts and EUR benchmarks.`,
    el: `Επιμελημένος κατάλογος ${count} επαληθευμένων παρόχων σε Λεμεσό, Λευκωσία, Λάρνακα & Πάφο με άμεσες επαφές και τιμές σε EUR.`,
    ru: `Независимый рейтинг ${count} проверенных компаний в Лимассоле, Никосии, Ларнаке и Пафосе с прямыми контактами и ценами в €. `,
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    h1: h1s[lang],
    subtitle: subtitles[lang],
  };
}
