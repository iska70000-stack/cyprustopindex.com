import type { Locale } from '../config/siteConfig';
import type { DecisionGuide } from './categoryGuides';
import { getCategoryUrl } from './categorySeo';
import { isDentalListing } from './directorySchema';
import { IMMIGRATION_GUIDE, IMMIGRATION_PRACTICES, type ListingNote } from './immigrationGuide';
import { VERIFIED_CATEGORIES, type DirectoryCategory, type DirectoryItem } from './verifiedDirectory';

type LocalizedText = Record<Locale, string>;

export interface DirectorySelection {
  slug: string;
  category: string;
  city?: DirectoryItem['city'];
  name: LocalizedText;
  navLabel?: LocalizedText;
  intro: LocalizedText;
  listingNotes?: Readonly<Record<string, ListingNote>>;
  guide?: DecisionGuide;
}

export const SELECTIONS: DirectorySelection[] = [
  {
    slug: 'law-firms-limassol',
    category: 'lawyers-relocation',
    city: 'Limassol',
    name: { en: 'Law Firms in Limassol', el: 'Δικηγορικά γραφεία στη Λεμεσό', ru: 'Юридические фирмы в Лимассоле' },
    navLabel: { en: 'Limassol', el: 'Λεμεσός', ru: 'Лимассол' },
    intro: {
      en: 'Compare Limassol law firms for company matters, property and relocation. Before booking, ask who will handle your case, what the initial consultation covers and which language they can use.',
      el: 'Συγκρίνετε δικηγορικά γραφεία στη Λεμεσό για εταιρικά θέματα, ακίνητα και μετεγκατάσταση. Ρωτήστε ποιος θα αναλάβει την υπόθεση, τι καλύπτει η πρώτη συνάντηση και σε ποια γλώσσα γίνεται.',
      ru: 'Сравните фирмы Лимассола по услугам для бизнеса, сделок с недвижимостью и переезда. До встречи уточните, кто будет вести дело, что входит в консультацию и на каком языке она доступна.',
    },
  },
  {
    slug: 'law-firms-nicosia',
    category: 'lawyers-relocation',
    city: 'Nicosia',
    name: { en: 'Law Firms in Nicosia', el: 'Δικηγορικά γραφεία στη Λευκωσία', ru: 'Юридические фирмы в Никосии' },
    navLabel: { en: 'Nicosia', el: 'Λευκωσία', ru: 'Никосия' },
    intro: {
      en: 'Compare Nicosia law firms for corporate matters, disputes and cross-border work. When contacting a firm, share the jurisdictions involved and ask for the scope, fees and likely next steps in writing.',
      el: 'Συγκρίνετε δικηγορικά γραφεία στη Λευκωσία για εταιρικά θέματα, διαφορές και διασυνοριακές υποθέσεις. Αναφέρετε τις σχετικές δικαιοδοσίες και ζητήστε γραπτώς το αντικείμενο, τις αμοιβές και τα επόμενα βήματα.',
      ru: 'Сравните фирмы Никосии по корпоративному праву, спорам и международным делам. В первом обращении укажите страны, связанные с делом, и попросите письменно описать объём работ, оплату и следующие шаги.',
    },
  },
  {
    slug: 'immigration-lawyers',
    category: 'lawyers-relocation',
    name: { en: 'Immigration Lawyers in Cyprus', el: 'Δικηγόροι μετανάστευσης στην Κύπρο', ru: 'Иммиграционные юристы на Кипре' },
    navLabel: { en: 'Immigration lawyers', el: 'Δικηγόροι μετανάστευσης', ru: 'Иммиграционные юристы' },
    intro: {
      en: 'Compare immigration law firms in Limassol, Nicosia and Larnaca for residence, work and family applications.',
      el: 'Συγκρίνετε δικηγορικά γραφεία σε Λεμεσό, Λευκωσία και Λάρνακα για άδειες διαμονής, εργασίας και οικογενειακές αιτήσεις.',
      ru: 'Сравните юридические фирмы в Лимассоле, Никосии и Ларнаке по вопросам ВНЖ, разрешений на работу и семейной релокации.',
    },
    listingNotes: IMMIGRATION_PRACTICES,
    guide: IMMIGRATION_GUIDE,
  },
  {
    slug: 'dentists',
    category: 'medical-dental',
    name: { en: 'Dentists and Dental Clinics in Cyprus', el: 'Οδοντίατροι και οδοντιατρεία στην Κύπρο', ru: 'Стоматологи и стоматологии Кипра' },
    intro: {
      en: 'Find dental practices in Limassol, Nicosia and Larnaca. Compare listed specialties and ask the clinic what a first visit includes, whether it participates in GeSY and which services are billed privately.',
      el: 'Βρείτε οδοντιατρεία σε Λεμεσό, Λευκωσία και Λάρνακα. Συγκρίνετε ειδικότητες και ρωτήστε τι περιλαμβάνει η πρώτη επίσκεψη, εάν συμμετέχουν στο ΓεΣΥ και ποιες υπηρεσίες χρεώνονται ιδιωτικά.',
      ru: 'Найдите стоматологии в Лимассоле, Никосии и Ларнаке. Сравните специализации и уточните, что входит в первичный приём, работает ли клиника с GeSY и какие услуги оплачиваются отдельно.',
    },
  },
];

export function getSelectionCategory(selection: DirectorySelection): DirectoryCategory {
  const category = VERIFIED_CATEGORIES.find((cat) => cat.slug === selection.category);
  if (!category) throw new Error(`Missing category for ${selection.slug}`);

  const { city, listingNotes } = selection;
  const items = city
    ? category.items.filter((item) => item.city === city)
    : listingNotes
      ? category.items.filter((item) => Object.hasOwn(listingNotes, item.id))
      : category.items.filter(isDentalListing);
  if (listingNotes && items.length !== Object.keys(listingNotes).length) {
    throw new Error(`Missing listing for ${selection.slug}`);
  }
  return { ...category, items };
}

export function getSelectionUrl(lang: Locale, slug: string) {
  return `/${lang}/guides/${slug}/`;
}

export function getCategoryCityUrl(category: string, city: string, lang: Locale) {
  const categoryUrl = getCategoryUrl(category, lang);
  return `${categoryUrl}?city=${encodeURIComponent(city)}#results`;
}
