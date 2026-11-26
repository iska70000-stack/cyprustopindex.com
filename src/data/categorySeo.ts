import type { Locale } from '../config/siteConfig';
import { VERIFIED_CATEGORIES, type DirectoryCategory } from './verifiedDirectory';

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

export function getProfileUrl(catSlug: string, itemId: string, lang: Locale): string {
  return `${getCategoryUrl(catSlug, lang)}${itemId}/`;
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

const categoryCopy: Record<string, Record<Locale, [heading: string, description: string]>> = {
  'real-estate': {
    en: ['Real Estate Agents in Cyprus', 'Find property agents and developers by city. Compare residential sales, long-term rentals and property management, with direct contact details.'],
    el: ['Μεσίτες και εταιρείες ακινήτων στην Κύπρο', 'Βρείτε μεσίτες και εταιρείες ανάπτυξης ανά πόλη. Συγκρίνετε υπηρεσίες πώλησης, ενοικίασης και διαχείρισης ακινήτων.'],
    ru: ['Агентства недвижимости на Кипре', 'Найдите риелторов и застройщиков по городу. Сравните услуги по продаже, долгосрочной аренде и управлению недвижимостью.'],
  },
  'lawyers-relocation': {
    en: ['Law Firms in Cyprus for Immigration & Business', 'Compare Cyprus law firms by city and practice area, from immigration and tax to property and company law. Find phone numbers and official websites.'],
    el: ['Δικηγορικά γραφεία στην Κύπρο', 'Συγκρίνετε δικηγορικά γραφεία ανά πόλη και ειδίκευση, από μετανάστευση και φορολογία έως ακίνητα και εταιρικό δίκαιο.'],
    ru: ['Юристы на Кипре по иммиграции и бизнесу', 'Сравните юридические фирмы по городу и специализации: иммиграция, налоги, недвижимость и корпоративное право. Телефоны и сайты.'],
  },
  'car-rental-mobility': {
    en: ['Car Rental in Cyprus by City & Airport', 'Find car rental companies in Cyprus, including operators at Larnaca and Paphos airports. Compare locations and contact providers directly.'],
    el: ['Ενοικίαση αυτοκινήτου στην Κύπρο', 'Βρείτε εταιρείες ενοικίασης ανά πόλη και παρόχους στα αεροδρόμια Λάρνακας και Πάφου. Δείτε διευθύνσεις και τηλέφωνα.'],
    ru: ['Прокат авто на Кипре по городам и аэропортам', 'Найдите прокатчиков по городу, в том числе в аэропортах Ларнаки и Пафоса. Сравните расположение и свяжитесь с компанией напрямую.'],
  },
  'medical-dental': {
    en: ['Dentists, Clinics & Private Hospitals in Cyprus', 'Find dental clinics and private hospitals by city. Compare listed services, find direct contacts and check GeSY participation in the official directory.'],
    el: ['Οδοντίατροι, κλινικές και νοσοκομεία στην Κύπρο', 'Βρείτε οδοντιατρεία και ιδιωτικά νοσοκομεία ανά πόλη. Δείτε υπηρεσίες και τηλέφωνα και ελέγξτε τους παρόχους του ΓεΣΥ.'],
    ru: ['Стоматологии и частные клиники на Кипре', 'Найдите стоматологии и частные больницы по городу. Сравните услуги, найдите телефоны и проверьте участие в GeSY по официальной базе.'],
  },
  'it-business-services': {
    en: ['IT, Cybersecurity & Business Services in Cyprus', 'Browse Cyprus companies in IT, cybersecurity, fintech and professional services. Compare specialties in Limassol and Nicosia and find direct contacts.'],
    el: ['Πληροφορική και επιχειρηματικές υπηρεσίες στην Κύπρο', 'Βρείτε εταιρείες πληροφορικής, κυβερνοασφάλειας, fintech και συμβουλευτικών υπηρεσιών σε Λεμεσό και Λευκωσία.'],
    ru: ['IT, кибербезопасность и бизнес-услуги на Кипре', 'Найдите компании в Лимассоле и Никосии: IT, кибербезопасность, финтех и консалтинг. Сравните специализации и найдите контакты.'],
  },
  'renovation-construction': {
    en: ['Renovation & Building Contractors in Cyprus', 'Find Cyprus builders, renovation companies and interior designers by city. Compare project specialties and contact firms for quotes.'],
    el: ['Ανακαινίσεις και κατασκευαστικές εταιρείες στην Κύπρο', 'Βρείτε κατασκευαστές, συνεργεία ανακαίνισης και σχεδιαστές εσωτερικών χώρων ανά πόλη και ζητήστε προσφορά απευθείας.'],
    ru: ['Ремонт и строительные подрядчики на Кипре', 'Найдите строителей, ремонтные компании и дизайнеров интерьера по городу. Сравните специализации и запросите сметы напрямую.'],
  },
};

export function getCategorySeoMeta(cat: DirectoryCategory, lang: Locale) {
  const [h1, description] = categoryCopy[cat.slug][lang];
  return { title: h1, description, h1, subtitle: description };
}

export const HOME_COPY: Record<Locale, [title: string, description: string]> = {
  en: ['Cyprus Business Directory | CyprusTopIndex', 'Find law firms, clinics, car rentals and other local services in Cyprus. Filter by city, compare specialties and contact businesses directly.'],
  el: ['Κατάλογος επιχειρήσεων Κύπρου | CyprusTopIndex', 'Βρείτε δικηγόρους, κλινικές, ενοικιάσεις αυτοκινήτων και άλλες υπηρεσίες στην Κύπρο. Επιλέξτε πόλη και επικοινωνήστε απευθείας.'],
  ru: ['Каталог компаний Кипра | CyprusTopIndex', 'Найдите юристов, клиники, прокат авто и другие услуги на Кипре. Выберите город, сравните специализации и свяжитесь с компаниями напрямую.'],
};
