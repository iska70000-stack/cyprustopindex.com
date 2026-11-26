import type { Locale } from '../config/siteConfig';

export interface DecisionGuide {
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
  sourceLabel: Record<Locale, string>;
  source: string;
}

export const CATEGORY_GUIDES: Partial<Record<string, DecisionGuide>> = {
  'lawyers-relocation': {
    question: {
      en: 'How do I choose a lawyer in Cyprus?',
      el: 'Πώς επιλέγω δικηγόρο στην Κύπρο;',
      ru: 'Как выбрать юриста на Кипре?',
    },
    answer: {
      en: 'Start with the practice area and city. Check the individual lawyer in the Cyprus Bar Association register of practising advocates. Ask the firm to confirm the consultation language, scope and fees in writing.',
      el: 'Ξεκινήστε από την ειδίκευση και την πόλη. Αναζητήστε τον δικηγόρο στο μητρώο του Παγκύπριου Δικηγορικού Συλλόγου. Ζητήστε γραπτή επιβεβαίωση για τη γλώσσα, το αντικείμενο και τις αμοιβές.',
      ru: 'Начните со специализации и города. Проверьте конкретного адвоката в реестре практикующих адвокатов Кипра. Попросите письменно подтвердить язык консультации, объём работ и стоимость.',
    },
    sourceLabel: {
      en: 'Cyprus Bar Association register',
      el: 'Μητρώο Παγκύπριου Δικηγορικού Συλλόγου',
      ru: 'Реестр Кипрской ассоциации адвокатов',
    },
    source: 'https://www.cyprusbarassociation.org/departments/dioikisi/mitroa-pds/mitroo-dikigoron-pou-askoun-to-epangelma/',
  },
  'medical-dental': {
    question: {
      en: 'How can I check if a clinic or dentist takes GeSY?',
      el: 'Πώς ελέγχω αν μια κλινική ή ένας οδοντίατρος συμμετέχει στο ΓεΣΥ;',
      ru: 'Как проверить, работает ли клиника или стоматолог с GeSY?',
    },
    answer: {
      en: 'Search the official GeSY directory for the practitioner or facility. Before booking, confirm with the clinic that the provider takes GeSY for the specific service, whether you need a referral, and any charges.',
      el: 'Αναζητήστε τον επαγγελματία ή την κλινική στον επίσημο κατάλογο του ΓεΣΥ. Πριν κλείσετε ραντεβού, επιβεβαιώστε την κάλυψη της υπηρεσίας, αν απαιτείται παραπεμπτικό και τυχόν χρεώσεις.',
      ru: 'Найдите специалиста или учреждение в официальном каталоге GeSY. Перед записью уточните в клинике, покрывается ли конкретная услуга, нужно ли направление и будут ли доплаты.',
    },
    sourceLabel: {
      en: 'Official GeSY provider search',
      el: 'Επίσημη αναζήτηση παρόχων ΓεΣΥ',
      ru: 'Официальный каталог поставщиков GeSY',
    },
    source: 'https://www.gesy.org.cy/provider-search',
  },
};
