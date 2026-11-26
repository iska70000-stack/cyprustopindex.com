import type { Locale } from '../config/siteConfig';
import { getCategoryUrl } from './categorySeo';
import { isDentalListing } from './directorySchema';
import { VERIFIED_CATEGORIES, type DirectoryCategory } from './verifiedDirectory';

type LocalizedText = Record<Locale, string>;

export const SELECTIONS = [
  {
    slug: 'law-firms-limassol',
    category: 'lawyers-relocation',
    city: 'Limassol',
    name: { en: 'Law Firms in Limassol', el: 'Δικηγορικά γραφεία στη Λεμεσό', ru: 'Юридические фирмы в Лимассоле' },
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
    intro: {
      en: 'Compare Nicosia law firms for corporate matters, disputes and cross-border work. When contacting a firm, share the jurisdictions involved and ask for the scope, fees and likely next steps in writing.',
      el: 'Συγκρίνετε δικηγορικά γραφεία στη Λευκωσία για εταιρικά θέματα, διαφορές και διασυνοριακές υποθέσεις. Αναφέρετε τις σχετικές δικαιοδοσίες και ζητήστε γραπτώς το αντικείμενο, τις αμοιβές και τα επόμενα βήματα.',
      ru: 'Сравните фирмы Никосии по корпоративному праву, спорам и международным делам. В первом обращении укажите страны, связанные с делом, и попросите письменно описать объём работ, оплату и следующие шаги.',
    },
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
] satisfies Array<{
  slug: string;
  category: string;
  city?: string;
  name: LocalizedText;
  intro: LocalizedText;
}>;

export function getSelectionCategory(selection: (typeof SELECTIONS)[number]): DirectoryCategory {
  const category = VERIFIED_CATEGORIES.find((cat) => cat.slug === selection.category);
  if (!category) throw new Error(`Missing category for ${selection.slug}`);

  const items = 'city' in selection
    ? category.items.filter((item) => item.city === selection.city)
    : category.items.filter(isDentalListing);
  return { ...category, items };
}

export function getSelectionUrl(lang: Locale, slug: string) {
  return `/${lang}/guides/${slug}/`;
}

export function getCategoryCityUrl(category: string, city: string, lang: Locale) {
  const categoryUrl = getCategoryUrl(category, lang);
  return `${categoryUrl}?city=${encodeURIComponent(city)}#results`;
}
