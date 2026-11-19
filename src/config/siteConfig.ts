export type Locale = 'en' | 'el' | 'ru';

export type MacroClusterId = 'property-living' | 'law-relocation-finance' | 'mobility-health' | 'tech-business';

export interface MacroClusterMeta {
  id: MacroClusterId;
  icon: string;
  names: Record<Locale, string>;
  descriptions: Record<Locale, string>;
}

export interface CategoryMeta {
  slug: string;
  clusterId: MacroClusterId;
  icon: string;
  titles: Record<Locale, string>;
  descriptions: Record<Locale, string>;
  methodologyOverview: Record<Locale, string>;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  defaultLocale: Locale;
  locales: Locale[];
  currency: 'EUR';
  currencySymbol: '€';
  allowIndexing: boolean;
  region: string;
  cities: readonly string[];
  regionNames: Record<Locale, string>;
  tagline: Record<Locale, string>;
  missionStatement: Record<Locale, string>;
  updateDate: string;
  macroClusters: MacroClusterMeta[];
  categories: CategoryMeta[];
}

export const MACRO_CLUSTERS: MacroClusterMeta[] = [
  {
    id: 'property-living',
    icon: '🏠',
    names: {
      en: 'Real Estate & Renovation',
      el: 'Ακίνητα & Ανακαινίσεις',
      ru: 'Недвижимость и Ремонт',
    },
    descriptions: {
      en: 'Licensed property advisors, developers, architects and renovation contractors across Limassol, Nicosia, Larnaca and Paphos.',
      el: 'Αδειούχοι σύμβουλοι ακινήτων, αρχιτέκτονες και εργολάβοι ανακαινίσεων σε Λεμεσό, Λευκωσία, Λάρνακα και Πάφο.',
      ru: 'Лицензированные риелторы, архитекторы и строительно-ремонтные компании в Лимассоле, Никосии, Ларнаке и Пафосе.',
    },
  },
  {
    id: 'law-relocation-finance',
    icon: '⚖️',
    names: {
      en: 'Law, Tax & Relocation',
      el: 'Δίκαιο, Φόροι & Μετεγκατάσταση',
      ru: 'Юристы, Налоги и ВНЖ',
    },
    descriptions: {
      en: 'Cyprus Bar Association lawyers, immigration & PR specialists, Non-Dom tax advisors and corporate auditors.',
      el: 'Δικηγόροι εγγεγραμμένοι στον Παγκύπριο Δικηγορικό Σύλλογο, σύμβουλοι μετανάστευσης και φορολογικοί ελεγκτές.',
      ru: 'Лицензированные адвокаты Кипра, специалисты по ВНЖ/ПМЖ, налоговому резидентству Non-Dom и аудиту.',
    },
  },
  {
    id: 'mobility-health',
    icon: '🩺',
    names: {
      en: 'Auto, Mobility & Clinics',
      el: 'Αυτοκίνητο & Ιατρικές Κλινικές',
      ru: 'Авто, Трансферы и Клиники',
    },
    descriptions: {
      en: 'Transparent car rentals, airport transfers (LCA/PFO), private medical centers and GeSY-connected dental clinics.',
      el: 'Διαφανείς ενοικιάσεις αυτοκινήτων, μεταφορές αεροδρομίων (LCA/PFO), ιδιωτικά ιατρικά κέντρα και οδοντιατρεία.',
      ru: 'Честный автопрокат, трансферы из аэропортов Ларнаки и Пафоса, частные медицинские центры и стоматологии.',
    },
  },
  {
    id: 'tech-business',
    icon: '💻',
    names: {
      en: 'IT, Fintech & Business Services',
      el: 'Πληροφορική & Επιχειρηματικές Υπηρεσίες',
      ru: 'IT и Бизнес-сервисы',
    },
    descriptions: {
      en: 'Software engineering hubs, IP Box & fintech consultancies, B2B accounting and digital marketing agencies in Cyprus.',
      el: 'Εταιρείες λογισμικού, συμβουλευτική IP Box & fintech, B2B λογιστικά γραφεία και ψηφιακό μάρκετινγκ στην Κύπρο.',
      ru: 'IT-компании, консалтинг по IP Box и финтеху, B2B-бухгалтерия и digital-агентства Республики Кипр.',
    },
  },
];

export const CATEGORIES_REGISTRY: CategoryMeta[] = [
  {
    slug: 'real-estate',
    clusterId: 'property-living',
    icon: '🏠',
    titles: {
      en: 'Real Estate & Property Advisors',
      el: 'Ακίνητα & Μεσιτικά Γραφεία',
      ru: 'Недвижимость и Риелторы',
    },
    descriptions: {
      en: 'Licensed real estate agencies and independent property advisors in Limassol, Nicosia, Larnaca, and Paphos with Title Deed verification.',
      el: 'Αδειούχα μεσιτικά γραφεία και ανεξάρτητοι σύμβουλοι ακινήτων σε Λεμεσό, Λευκωσία, Λάρνακα και Πάφο.',
      ru: 'Лицензированные агентства недвижимости и эксперты по аренде и покупке жилья на Кипре (Title Deed, 5% VAT, PR-программы).',
    },
    methodologyOverview: {
      en: 'Verified via Cyprus Council for Registration of Real Estate Agents (CREAA) licenses, active listings, and direct contact validation.',
      el: 'Επαληθευμένα μέσω μητρώου Συμβουλίου Εγγραφής Κτηματομεσιτών Κύπρου και επιβεβαιωμένων στοιχείων επικοινωνίας.',
      ru: 'Проверка лицензии Совета по регистрации агентов недвижимости Кипра (CREAA), актуальности портфеля и прямых контактов.',
    },
  },
  {
    slug: 'lawyers-relocation',
    clusterId: 'law-relocation-finance',
    icon: '⚖️',
    titles: {
      en: 'Lawyers, Tax & Relocation',
      el: 'Δικηγόροι, Φόροι & Μετεγκατάσταση',
      ru: 'Юристы, Налоги и Релокация',
    },
    descriptions: {
      en: 'Cyprus Bar Association advocates, corporate tax advisors (12.5% CIT, Non-Dom), and immigration lawyers for Pink Slip & Fast-Track PR.',
      el: 'Δικηγόροι του Παγκύπριου Δικηγορικού Συλλόγου, φοροτεχνικοί Non-Dom και ειδικοί αδειών παραμονής.',
      ru: 'Адвокаты Коллегии адвокатов Кипра, налоговые консультанты (Non-Dom, 12.5% CIT) и юристы по ВНЖ / ПМЖ.',
    },
    methodologyOverview: {
      en: 'Evaluated by Cyprus Bar Association registration, ICPAC audit accreditation, transparent EUR fee structures, and multilingual support.',
      el: 'Αξιολόγηση βάσει εγγραφής στον Παγκύπριο Δικηγορικό Σύλλογο, διαφάνειας αμοιβών σε EUR και πολύγλωσσης εξυπηρέτησης.',
      ru: 'Отбор по наличию лицензии Cyprus Bar Association / ICPAC, прозрачным тарифам в евро (€) и поддержке на EN/EL/RU.',
    },
  },
  {
    slug: 'car-rental-mobility',
    clusterId: 'mobility-health',
    icon: '🚗',
    titles: {
      en: 'Car Rental & Airport Transfers',
      el: 'Ενοικίαση Αυτοκινήτων & Μεταφορές',
      ru: 'Аренда авто и Трансферы',
    },
    descriptions: {
      en: 'Transparent car rental providers and licensed private transfers serving Larnaca (LCA) and Paphos (PFO) airports, Limassol, and Nicosia.',
      el: 'Διαφανείς εταιρείες ενοικίασης αυτοκινήτων και ιδιωτικές μεταφορές από αεροδρόμια Λάρνακας (LCA) και Πάφου (PFO).',
      ru: 'Проверенный прокат автомобилей и лицензированные трансферы из аэропортов Ларнаки (LCA) и Пафоса (PFO) без скрытых сборов.',
    },
    methodologyOverview: {
      en: 'Ranked by transparent deposit and SCDW insurance terms in EUR, fleet age, and 24/7 airport pickup reliability.',
      el: 'Κατάταξη βάσει διαφάνειας εγγύησης, ασφάλισης SCDW σε EUR, ηλικίας στόλου και αξιοπιστίας παραλαβής 24/7.',
      ru: 'Оценка по честным условиям депозита и страховки SCDW в евро (€), возрасту автопарка и пунктуальности подачи в аэропортах.',
    },
  },
  {
    slug: 'medical-dental',
    clusterId: 'mobility-health',
    icon: '🩺',
    titles: {
      en: 'Medical & Dental Clinics',
      el: 'Ιατρικές & Οδοντιατρικές Κλινικές',
      ru: 'Медицина и Стоматологии',
    },
    descriptions: {
      en: 'Private multi-specialty hospitals, family doctors, and modern dental clinics in Limassol, Nicosia, Larnaca, and Paphos.',
      el: 'Ιδιωτικά νοσοκομεία, γενικοί ιατροί και σύγχρονα οδοντιατρικά κέντρα σε Λεμεσό, Λευκωσία, Λάρνακα και Πάφο.',
      ru: 'Частные многопрофильные клиники, врачи общей практики и современные стоматологии Кипра (включая систему GeSY).',
    },
    methodologyOverview: {
      en: 'Verified through Cyprus Medical Association / Dental Association licensing, GeSY participation status, and direct appointment access.',
      el: 'Επαλήθευση μέσω Παγκύπριου Ιατρικού και Οδοντιατρικού Συλλόγου, συμμετοχής στο ΓεΣΥ και άμεσης επικοινωνίας.',
      ru: 'Проверка регистрации врачей, статуса участия в государственной системе GeSY и наличия прямых каналов записи.',
    },
  },
  {
    slug: 'it-business-services',
    clusterId: 'tech-business',
    icon: '💻',
    titles: {
      en: 'IT, Fintech & Business Services',
      el: 'Πληροφορική & Επιχειρηματικές Υπηρεσίες',
      ru: 'IT и Бизнес-сервисы',
    },
    descriptions: {
      en: 'Software development studios, Cyprus IP Box & corporate formation specialists, accounting firms, and B2B digital agencies.',
      el: 'Εταιρείες ανάπτυξης λογισμικού, σύμβουλοι IP Box, λογιστικά γραφεία και ψηφιακές υπηρεσίες B2B.',
      ru: 'IT-компании, разработка ПО, сопровождение режима IP Box (2.5% налог), бухгалтерия и B2B-услуги для компаний на Кипре.',
    },
    methodologyOverview: {
      en: 'Assessed by active Cyprus corporate registration, verified technical portfolio, and transparent B2B SLA and EUR retainers.',
      el: 'Αξιολόγηση βάσει εγγραφής εταιρείας στην Κύπρο, επαληθευμένου χαρτοφυλακίου και διαφανών όρων B2B σε EUR.',
      ru: 'Отбор по реальной регистрации в Реестре компаний Кипра, подтверждённым кейсам и прозрачным условиям обслуживания в €.',
    },
  },
  {
    slug: 'renovation-construction',
    clusterId: 'property-living',
    icon: '🛠️',
    titles: {
      en: 'Renovation, Construction & Interiors',
      el: 'Ανακαινίσεις, Κατασκευές & Εσωτερικοί Χώροι',
      ru: 'Ремонт, Строительство и Дизайн',
    },
    descriptions: {
      en: 'ETEK-licensed civil engineers, villa renovation contractors, MEP specialists, and architectural interior studios across Cyprus.',
      el: 'Πολιτικοί μηχανικοί ΕΤΕΚ, εργολάβοι ανακαινίσεων, εγκαταστάτες HVAC/φωτοβολταϊκών και αρχιτεκτονικά γραφεία.',
      ru: 'Лицензированные инженеры ETEK, подрядчики по ремонту квартир и вилл, установка солнечных панелей и дизайн интерьера.',
    },
    methodologyOverview: {
      en: 'Checked for ETEK engineering credentials, itemized EUR estimates per m², and documented warranty terms.',
      el: 'Έλεγχος πιστοποίησης ΕΤΕΚ, αναλυτικών προσφορών σε EUR ανά τ.μ. και γραπτών εγγυήσεων εργασιών.',
      ru: 'Проверка лицензий ETEK, детализированных смет в евро (€) за м² и документальных гарантий на работы.',
    },
  },
];

export const activePreset: SiteConfig = {
  siteName: 'CyprusTopIndex',
  siteUrl: 'https://www.cyprustopindex.com',
  defaultLocale: 'en',
  locales: ['en', 'el', 'ru'],
  currency: 'EUR',
  currencySymbol: '€',
  // Set PUBLIC_ALLOW_INDEXING=true in Vercel env vars once cyprustopindex.com domain is attached
  allowIndexing: import.meta.env.PUBLIC_ALLOW_INDEXING === 'true',
  region: 'cyprus',
  cities: ['Limassol', 'Nicosia', 'Larnaca', 'Paphos'],
  regionNames: {
    en: 'Republic of Cyprus',
    el: 'Κυπριακή Δημοκρατία',
    ru: 'Республика Кипр',
  },
  tagline: {
    en: 'Curated AI-ready directory of verified businesses & services in Cyprus (Limassol, Nicosia, Larnaca, Paphos).',
    el: 'Επιμελημένος κατάλογος επαληθευμένων επιχειρήσεων και υπηρεσιών στην Κύπρο (Λεμεσός, Λευκωσία, Λάρνακα, Πάφος).',
    ru: 'Курируемый AI-справочник проверенных бизнесов и сервисов Республики Кипр (Лимассол, Никосия, Ларнака, Пафос).',
  },
  missionStatement: {
    en: 'Independent verification of Cyprus businesses with transparent EUR pricing benchmarks, physical addresses, and direct contacts.',
    el: 'Ανεξάρτητη επαλήθευση επιχειρήσεων στην Κύπρο με διαφανή στοιχεία τιμών σε EUR, φυσικές διευθύνσεις και άμεση επικοινωνία.',
    ru: 'Независимая проверка компаний Кипра: прозрачные ценовые ориентиры в EUR (€), реальные адреса и прямые контакты.',
  },
  updateDate: '2026-11-19',
  macroClusters: MACRO_CLUSTERS,
  categories: CATEGORIES_REGISTRY,
};
