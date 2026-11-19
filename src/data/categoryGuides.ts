import type { Locale } from '../config/siteConfig';

export interface PricePoint {
  label: Record<Locale, string>;
  value: Record<Locale, string>;
}

export interface FaqItem {
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export interface CategoryGuide {
  slug: string;
  guideTitle: Record<Locale, string>;
  overview: Record<Locale, string>;
  pricePoints: PricePoint[];
  faqs: FaqItem[];
}

export const HOME_MARKET_GUIDE: CategoryGuide = {
  slug: 'home',
  guideTitle: {
    en: 'Cyprus Market Prices & Quick Facts (2026)',
    el: 'Τιμές Αγοράς Κύπρου & Στοιχεία (2026) — Cyprus Market Prices & Quick Facts',
    ru: 'Cyprus Market Prices & Quick Facts (2026) — Цены и факты рынка Кипра',
  },
  overview: {
    en: 'In 2026, average 1-bedroom apartment rent in Cyprus ranges from €950–€1,250/month in Larnaca and Paphos to €1,400–€2,100/month in Limassol, while Cyprus company incorporation costs €1,500–€2,800 with a 12.5% corporate tax rate. Economy car rentals average €25–€45/day, private specialist clinic visits cost €50–€90 (€10–€25 under GeSY), and turnkey apartment renovations start at €650–€1,100/m².',
    el: 'Το 2026, το μέσο ενοίκιο διαμερίσματος 1 υπνοδωματίου στην Κύπρο κυμαίνεται από €950–€1,250/μήνα σε Λάρνακα και Πάφο έως €1,400–€2,100/μήνα στη Λεμεσό, ενώ η σύσταση κυπριακής εταιρείας κοστίζει €1,500–€2,800 με εταιρικό φόρο 12.5%. Η ενοικίαση αυτοκινήτου κοστίζει €25–€45/ημέρα, η επίσκεψη σε ιδιώτη ιατρό €50–€90 (€10–€25 μέσω ΓεΣΥ) και οι ανακαινίσεις ξεκινούν από €650–€1,100/τ.μ.',
    ru: 'В 2026 году средняя аренда 1-спальной квартиры на Кипре составляет €950–€1,250/мес в Ларнаке и Пафосе и €1,400–€2,100/мес в Лимассоле, а регистрация компании обходится в €1,500–€2,800 при корпоративном налоге 12.5%. Прокат авто стоит €25–€45/день, приём в частной клинике — €50–€90 (€10–€25 по GeSY), а ремонт под ключ — от €650–€1,100 за м².',
  },
  pricePoints: [
    {
      label: {
        en: '1-BR Rent (Limassol / Larnaca)',
        el: 'Ενοίκιο 1ΥΔ (Λεμεσός / Λάρνακα)',
        ru: 'Аренда 1-BR (Лимассол / Ларнака)',
      },
      value: {
        en: '€1,400–€2,100 / €950–€1,250',
        el: '€1,400–€2,100 / €950–€1,250',
        ru: '€1,400–€2,100 / €950–€1,250',
      },
    },
    {
      label: {
        en: 'Company Setup & Corporate Tax',
        el: 'Σύσταση Εταιρείας & Φόρος',
        ru: 'Регистрация LTD и Налог',
      },
      value: {
        en: '€1,500–€2,800 • 12.5% CIT',
        el: '€1,500–€2,800 • 12.5% Φόρος',
        ru: '€1,500–€2,800 • 12.5% CIT',
      },
    },
    {
      label: {
        en: 'Car Rental / Private Doctor Visit',
        el: 'Ενοικίαση Αυτοκ. / Ιατρός',
        ru: 'Авто в сутки / Приём врача',
      },
      value: {
        en: '€25–€45/day • €50–€90/visit',
        el: '€25–€45/ημέρα • €50–€90/επίσκεψη',
        ru: '€25–€45/день • €50–€90/визит',
      },
    },
  ],
  faqs: [],
};

export const CATEGORY_GUIDES: Record<string, CategoryGuide> = {
  'real-estate': {
    slug: 'real-estate',
    guideTitle: {
      en: 'Cyprus Market Prices & Quick Facts (2026) — Real Estate',
      el: 'Cyprus Market Prices & Quick Facts (2026) — Ακίνητα Κύπρου',
      ru: 'Cyprus Market Prices & Quick Facts (2026) — Недвижимость Кипра',
    },
    overview: {
      en: 'In 2026, long-term 1–2 bedroom apartment rents in Cyprus average €1,400–€2,600/month in Limassol, €950–€1,650/month in Nicosia and Larnaca, and €900–€1,550/month in Paphos. New-build residential prices average €3,200–€5,500/m² in Limassol and €2,300–€3,600/m² in Larnaca/Paphos, with a reduced 5% VAT rate available on qualifying primary residences and a €300,000+ threshold for Fast-Track Permanent Residency.',
      el: 'Το 2026, τα μακροχρόνια ενοίκια διαμερισμάτων 1–2 υπνοδωματίων κυμαίνονται στα €1,400–€2,600/μήνα στη Λεμεσό, €950–€1,650/μήνα σε Λευκωσία και Λάρνακα και €900–€1,550/μήνα στην Πάφο. Οι τιμές νεόδμητων κατοικιών είναι €3,200–€5,500/τ.μ. στη Λεμεσό και €2,300–€3,600/τ.μ. σε Λάρνακα/Πάφο, με μειωμένο ΦΠΑ 5% για πρώτη κατοικία και όριο €300,000+ για μόνιμη διαμονή Fast-Track.',
      ru: 'В 2026 году долгосрочная аренда 1–2-спальных квартир на Кипре стоит в среднем €1,400–€2,600/мес в Лимассоле, €950–€1,650/мес в Никосии и Ларнаке и €900–€1,550/мес в Пафосе. Новостройки оцениваются в €3,200–€5,500/м² в Лимассоле и €2,300–€3,600/м² в Ларнаке/Пафосе; действует льготный НДС 5% на первое жильё и порог €300,000+ для ускоренного ПМЖ.',
    },
    pricePoints: [
      {
        label: {
          en: 'Limassol 1–2 BR Rent / New Build',
          el: 'Λεμεσός Ενοίκιο / Νεόδμητα',
          ru: 'Лимассол: Аренда / Новострой',
        },
        value: {
          en: '€1,400–€2,600/mo • €3,200–€5,500/m²',
          el: '€1,400–€2,600/μήνα • €3,200–€5,500/τ.μ.',
          ru: '€1,400–€2,600/мес • €3,200–€5,500/м²',
        },
      },
      {
        label: {
          en: 'Larnaca & Paphos 1–2 BR Rent',
          el: 'Λάρνακα & Πάφος Ενοίκιο 1–2ΥΔ',
          ru: 'Ларнака и Пафос: Аренда 1–2 BR',
        },
        value: {
          en: '€900–€1,650/mo • €2,300–€3,600/m²',
          el: '€900–€1,650/μήνα • €2,300–€3,600/τ.μ.',
          ru: '€900–€1,650/мес • €2,300–€3,600/м²',
        },
      },
      {
        label: {
          en: 'Agency Fee & PR Threshold',
          el: 'Μεσίτης & Όριο PR',
          ru: 'Комиссия / Порог ПМЖ',
        },
        value: {
          en: '3–5% + VAT (Sales) • €300,000+ PR',
          el: '3–5% + ΦΠΑ • €300,000+ PR',
          ru: '3–5% + VAT • €300,000+ ПМЖ',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'What is the standard real estate agent commission in Cyprus in 2026?',
          el: 'Ποια είναι η τυπική προμήθεια μεσίτη στην Κύπρο το 2026;',
          ru: 'Какова стандартная комиссия риелтора на Кипре в 2026 году?',
        },
        answer: {
          en: 'For long-term rentals, the landlord typically pays 1 month’s rent (+ 19% VAT) to the licensed agent. For property sales, statutory commission ranges from 3% to 5% (+ VAT), paid by the seller.',
          el: 'Για μακροχρόνιες ενοικιάσεις, ο ιδιοκτήτης καταβάλλει συνήθως 1 ενοίκιο (+ 19% ΦΠΑ). Στις αγοραπωλησίες, η νόμιμη προμήθεια είναι 3%–5% (+ ΦΠΑ) από τον πωλητή.',
          ru: 'При долгосрочной аренде комиссию (обычно 1 месяц аренды + 19% VAT) платит собственник. При продаже комиссия составляет 3–5% (+ VAT) и оплачивается продавцом.',
        },
      },
      {
        question: {
          en: 'How much does Title Deed transfer or VAT cost when buying property?',
          el: 'Πόσο κοστίζει η μεταβίβαση Τίτλου Ιδιοκτησίας ή ο ΦΠΑ;',
          ru: 'Сколько стоит оформление Title Deed и НДС при покупке жилья?',
        },
        answer: {
          en: 'Brand-new properties carry 19% VAT (reducible to 5% on the first 130 m² up to €350,000 for primary residences) and are exempt from Transfer Fees. Resale properties have no VAT and pay tiered Land Registry Transfer Fees (approx. 1.5%–4% after the 50% statutory reduction).',
          el: 'Τα νεόδμητα επιβαρύνονται με ΦΠΑ 19% (ή 5% για κύρια κατοικία υπό όρους) χωρίς τέλη μεταβίβασης. Τα μεταχειρισμένα δεν έχουν ΦΠΑ και καταβάλλουν μειωμένα τέλη Κτηματολογίου.',
          ru: 'На новостройки начисляется VAT 19% (снижается до 5% для первого жилья при соблюдении лимитов), но не платится Transfer Fee. На вторичном рынке VAT нет, оплачивается только сбор Земельного департамента (с 50% скидкой — около 1.5–4%).',
        },
      },
      {
        question: {
          en: 'How can I verify that a Cyprus real estate agency is licensed?',
          el: 'Πώς ελέγχω αν ένα μεσιτικό γραφείο στην Κύπρο έχει άδεια;',
          ru: 'Как проверить лицензию агентства недвижимости на Кипре?',
        },
        answer: {
          en: 'All legal agencies must hold an active registration number from the Cyprus Council for Registration of Real Estate Agents (CREAA / Reg. No.).',
          el: 'Όλα τα νόμιμα γραφεία διαθέτουν ενεργό Αριθμό Μητρώου και Άδεια από το Συμβούλιο Εγγραφής Κτηματομεσιτών Κύπρου.',
          ru: 'У каждого официального агентства должен быть действующий регистрационный номер Совета по регистрации агентов недвижимости Кипра (CREAA).',
        },
      },
    ],
  },

  'lawyers-relocation': {
    slug: 'lawyers-relocation',
    guideTitle: {
      en: 'Cyprus Market Prices & Quick Facts (2026) — Law, Tax & Relocation',
      el: 'Cyprus Market Prices & Quick Facts (2026) — Δίκαιο, Φόροι & Μετεγκατάσταση',
      ru: 'Cyprus Market Prices & Quick Facts (2026) — Юристы, Налоги и ВНЖ',
    },
    overview: {
      en: 'In 2026, Cyprus company incorporation (LTD) costs €1,500–€2,800 with a 12.5% corporate tax rate, while Non-Domicile tax residents pay 0% tax on dividends and interest (subject to 2.65% GeSY up to €180,000/year). Immigration legal support costs €600–€1,200 for a Visitor Pink Slip or BCS work permit and €2,000–€3,500 for Regulation 6(2) Fast-Track Permanent Residency.',
      el: 'Το 2026, η σύσταση κυπριακής εταιρείας (LTD) κοστίζει €1,500–€2,800 με εταιρικό φόρο 12.5%, ενώ οι φορολογικοί κάτοικοι Non-Dom πληρώνουν 0% φόρο σε μερίσματα (μόνο 2.65% ΓεΣΥ έως €180,000/έτος). Οι νομικές αμοιβές για Pink Slip ή άδεια εργασίας BCS είναι €600–€1,200 και για μόνιμη άδεια Fast-Track €2,000–€3,500.',
      ru: 'В 2026 году регистрация компании (LTD) на Кипре стоит €1,500–€2,800 при корпоративном налоге 12.5%, а статус Non-Dom освобождает дивиденды и проценты от налога (0% SDC, взимается только 2.65% GeSY до €180,000/год). Юридическое сопровождение ВНЖ (Pink Slip или рабочий BCS) обходится в €600–€1,200, а ПМЖ по ускоренной программе 6(2) — €2,000–€3,500.',
    },
    pricePoints: [
      {
        label: {
          en: 'LTD Incorporation + Tax Rate',
          el: 'Ίδρυση LTD + Εταιρικός Φόρος',
          ru: 'Регистрация LTD + Налог CIT',
        },
        value: {
          en: '€1,500–€2,800 • 12.5% CIT',
          el: '€1,500–€2,800 • 12.5% Φόρος',
          ru: '€1,500–€2,800 • 12.5% CIT',
        },
      },
      {
        label: {
          en: 'Pink Slip / BCS Work Permit',
          el: 'Άδεια Διαμονής / Εργασίας BCS',
          ru: 'Юр. услуги: ВНЖ / BCS',
        },
        value: {
          en: '€600–€1,200 legal fee',
          el: '€600–€1,200 νομική αμοιβή',
          ru: '€600–€1,200 гонорар',
        },
      },
      {
        label: {
          en: 'Non-Dom Dividend Tax / Fast-Track PR',
          el: 'Φόρος Non-Dom / Μόνιμη Άδεια',
          ru: 'Налог Non-Dom / ПМЖ 6(2)',
        },
        value: {
          en: '0% SDC • €2,000–€3,500 PR fee',
          el: '0% SDC • €2,000–€3,500 PR',
          ru: '0% SDC • €2,000–€3,500 ПМЖ',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'How does the Cyprus 60-day tax residency and Non-Dom rule work?',
          el: 'Πώς λειτουργεί ο κανόνας των 60 ημερών και το καθεστώς Non-Dom;',
          ru: 'Как работает правило 60 дней и налоговый статус Non-Dom на Кипре?',
        },
        answer: {
          en: 'Individuals spending at least 60 days in Cyprus (without spending 183+ days in any other single state), maintaining a permanent home and business/employment in Cyprus, qualify for tax residency and 0% tax on worldwide dividends and interest for 17 years.',
          el: 'Όσοι διαμένουν τουλάχιστον 60 ημέρες στην Κύπρο (χωρίς 183+ ημέρες αλλού) και διατηρούν κατοικία και επαγγελματική δραστηριότητα, αποκτούν καθεστώς Non-Dom με 0% φόρο σε μερίσματα και τόκους για 17 έτη.',
          ru: 'При проживании на Кипре от 60 дней в году (без 183+ дней в другой стране), наличии жилья и работы/директорства в кипрской компании вы получаете статус Non-Dom с 0% налогом на дивиденды и проценты на 17 лет.',
        },
      },
      {
        question: {
          en: 'What is the salary requirement for a BCS (Foreign Interest Company) permit?',
          el: 'Ποιος είναι ο ελάχιστος μισθός για άδεια εργασίας σε εταιρεία BCS;',
          ru: 'Какая минимальная зарплата требуется для рабочей визы через BCS-компанию?',
        },
        answer: {
          en: 'Highly skilled third-country employees hired via a registered Business Facilitation Unit (BFU) company generally require a gross monthly salary of at least €2,500.',
          el: 'Για εξειδικευμένο προσωπικό σε εταιρείες ξένων συμφερόντων (BFU) απαιτείται ελάχιστος ακαθάριστος μηνιαίος μισθός €2,500.',
          ru: 'Для высококвалифицированных специалистов в компании с иностранным капиталом (BFU/BCS) минимальная зарплата брутто составляет от €2,500 в месяц.',
        },
      },
    ],
  },

  'car-rental-mobility': {
    slug: 'car-rental-mobility',
    guideTitle: {
      en: 'Cyprus Market Prices & Quick Facts (2026) — Car Rental & Transfers',
      el: 'Cyprus Market Prices & Quick Facts (2026) — Ενοικίαση Αυτοκινήτων',
      ru: 'Cyprus Market Prices & Quick Facts (2026) — Аренда авто и Трансферы',
    },
    overview: {
      en: 'In 2026, economy car rentals in Cyprus cost €25–€45/day (€550–€850/month long-term), SUVs and crossovers run €55–€95/day, and refundable security deposits range from €0 (with SCDW full insurance) to €300–€600. Licensed private airport transfers from Larnaca (LCA) cost €65–€85 to Limassol, €45–€60 to Nicosia, and €130–€160 to Paphos.',
      el: 'Το 2026, η ενοικίαση μικρού αυτοκινήτου στην Κύπρο κοστίζει €25–€45/ημέρα (€550–€850/μήνα), τα SUV €55–€95/ημέρα, με εγγύηση €0 (με πλήρη ασφάλεια SCDW) έως €300–€600. Οι ιδιωτικές μεταφορές από το αεροδρόμιο Λάρνακας (LCA) κοστίζουν €65–€85 προς Λεμεσό, €45–€60 προς Λευκωσία και €130–€160 προς Πάφο.',
      ru: 'В 2026 году аренда эконом-авто на Кипре стоит €25–€45/сутки (€550–€850/мес на долгий срок), кроссовера — €55–€95/сутки, а возвратный депозит составляет от €0 (со страховкой SCDW) до €300–€600. Индивидуальный трансфер из аэропорта Ларнаки (LCA) стоит €65–€85 в Лимассол, €45–€60 в Никосию и €130–€160 в Пафос.',
    },
    pricePoints: [
      {
        label: {
          en: 'Economy / SUV Daily Rental',
          el: 'Ημερήσια Ενοικίαση (Economy / SUV)',
          ru: 'Прокат в сутки (Эконом / SUV)',
        },
        value: {
          en: '€25–€45 / €55–€95 per day',
          el: '€25–€45 / €55–€95 / ημέρα',
          ru: '€25–€45 / €55–€95 в день',
        },
      },
      {
        label: {
          en: 'Long-Term Monthly Lease',
          el: 'Μηνιαία Μίσθωση Αυτοκινήτου',
          ru: 'Долгосрочная аренда (1 мес.)',
        },
        value: {
          en: '€550–€850 / month',
          el: '€550–€850 / μήνα',
          ru: '€550–€850 / мес',
        },
      },
      {
        label: {
          en: 'Larnaca Airport (LCA) → Limassol',
          el: 'Μεταφορά LCA → Λεμεσός',
          ru: 'Трансфер LCA → Лимассол',
        },
        value: {
          en: '€65–€85 fixed sedan',
          el: '€65–€85 σταθερή τιμή',
          ru: '€65–€85 фиксированно',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Is an International Driving Permit required to rent a car in Cyprus?',
          el: 'Απαιτείται Διεθνής Άδεια Οδήγησης στην Κύπρο;',
          ru: 'Нужны ли международные права для аренды авто на Кипре?',
        },
        answer: {
          en: 'EU, UK, and most national photo driving licenses in Latin script are accepted for tourists up to 6 months. Remember Cyprus drives on the left.',
          el: 'Γίνονται δεκτές άδειες ΕΕ, ΗΒ και οι περισσότερες εθνικές άδειες με λατινικούς χαρακτήρες. Η οδήγηση στην Κύπρο γίνεται αριστερά.',
          ru: 'Принимаются права ЕС, Великобритании и национальные права с дублированием на латинице. На Кипре левостороннее движение.',
        },
      },
      {
        question: {
          en: 'Can I drive a rental car across the Green Line to Northern Cyprus?',
          el: 'Επιτρέπεται η διέλευση ενοικιαζόμενου αυτοκινήτου στα κατεχόμενα;',
          ru: 'Можно ли выезжать на арендованном авто на Северный Кипр?',
        },
        answer: {
          en: 'Standard Republic of Cyprus rental insurance does not cover the northern part; separate third-party insurance (€20–€35 at the checkpoint) is required and most agencies restrict cross-border travel.',
          el: 'Η τυπική ασφάλιση της Κυπριακής Δημοκρατίας δεν καλύπτει τις κατεχόμενες περιοχές και οι περισσότερες εταιρείες δεν επιτρέπουν τη διέλευση.',
          ru: 'Стандартная страховка Республики Кипр там не действует, а большинство прокатчиков прямо запрещают выезд за «Зелёную линию» по договору.',
        },
      },
    ],
  },

  'medical-dental': {
    slug: 'medical-dental',
    guideTitle: {
      en: 'Cyprus Market Prices & Quick Facts (2026) — Medical & Dental Clinics',
      el: 'Cyprus Market Prices & Quick Facts (2026) — Ιατρικές & Οδοντιατρικές Κλινικές',
      ru: 'Cyprus Market Prices & Quick Facts (2026) — Клиники и Стоматологии',
    },
    overview: {
      en: 'In 2026, a private specialist consultation in Cyprus costs €50–€90 (or €10–€25 co-payment with GeSY registration), while an MRI scan averages €250–€380 privately. Dental check-ups and cleanings cost €60–€95, composite fillings €80–€140, and single titanium dental implants €900–€1,450.',
      el: 'Το 2026, μια ιδιωτική επίσκεψη σε ειδικό ιατρό στην Κύπρο κοστίζει €50–€90 (€10–€25 με ΓεΣΥ), ενώ μια μαγνητική τομογραφία (MRI) €250–€380 ιδιωτικά. Ο οδοντιατρικός καθαρισμός κοστίζει €60–€95, το σφράγισμα €80–€140 και το εμφύτευμα δοντιού €900–€1,450.',
      ru: 'В 2026 году приём профильного врача в частной клинике Кипра стоит €50–€90 (по государственной страховке GeSY — €10–€25), а частное МРТ — €250–€380. Профессиональная чистка зубов стоит €60–€95, пломба — €80–€140, установка зубного импланта — €900–€1,450.',
    },
    pricePoints: [
      {
        label: {
          en: 'Private Specialist / GeSY Visit',
          el: 'Ιδιώτης Ιατρός / Μέσω ΓεΣΥ',
          ru: 'Приём врача (Частный / GeSY)',
        },
        value: {
          en: '€50–€90 / €10–€25 GeSY',
          el: '€50–€90 / €10–€25 ΓεΣΥ',
          ru: '€50–€90 / €10–€25 GeSY',
        },
      },
      {
        label: {
          en: 'Dental Hygiene & Filling',
          el: 'Οδοντιατρικός Καθαρισμός & Σφράγισμα',
          ru: 'Чистка зубов / Пломба',
        },
        value: {
          en: '€60–€95 / €80–€140',
          el: '€60–€95 / €80–€140',
          ru: '€60–€95 / €80–€140',
        },
      },
      {
        label: {
          en: 'Dental Implant / Private MRI',
          el: 'Εμφύτευμα Δοντιού / Ιδιωτικό MRI',
          ru: 'Имплант зуба / МРТ частно',
        },
        value: {
          en: '€900–€1,450 / €250–€380',
          el: '€900–€1,450 / €250–€380',
          ru: '€900–€1,450 / €250–€380',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Who is eligible for Cyprus GeSY public healthcare?',
          el: 'Ποιος δικαιούται εγγραφή στο ΓεΣΥ Κύπρου;',
          ru: 'Кто имеет право на подключение к системе GeSY на Кипре?',
        },
        answer: {
          en: 'Cyprus citizens, EU nationals, and non-EU residents holding valid permanent residency or legal employment permits who pay social insurance/GeSY contributions.',
          el: 'Κύπριοι πολίτες, πολίτες ΕΕ και κάτοικοι τρίτων χωρών με νόμιμη άδεια εργασίας ή μόνιμη διαμονή που καταβάλλουν εισφορές ΓεΣΥ.',
          ru: 'Граждане Кипра и ЕС, а также резиденты из третьих стран с действующим ПМЖ или рабочей визой, уплачивающие взносы GeSY.',
        },
      },
      {
        question: {
          en: 'Are dental treatments covered by GeSY?',
          el: 'Καλύπτονται οι οδοντιατρικές θεραπείες από το ΓεΣΥ;',
          ru: 'Покрывает ли страховка GeSY стоматологию?',
        },
        answer: {
          en: 'GeSY covers only one preventive dental cleaning/check-up per year for registered beneficiaries; fillings, crowns, orthodontics, and implants are paid privately.',
          el: 'Το ΓεΣΥ καλύπτει μόνο έναν προληπτικό καθαρισμό ετησίως· σφραγίσματα, θήκες και εμφυτεύματα πληρώνονται ιδιωτικά.',
          ru: 'GeSY покрывает только 1 профилактическую чистку в год; лечение кариеса, коронки и имплантация оплачиваются отдельно.',
        },
      },
    ],
  },

  'it-business-services': {
    slug: 'it-business-services',
    guideTitle: {
      en: 'Cyprus Market Prices & Quick Facts (2026) — IT & Business Services',
      el: 'Cyprus Market Prices & Quick Facts (2026) — Πληροφορική & Επιχειρηματικές Υπηρεσίες',
      ru: 'Cyprus Market Prices & Quick Facts (2026) — IT и Бизнес-сервисы',
    },
    overview: {
      en: 'In 2026, Cyprus monthly accounting and VAT compliance retainers cost €200–€450/month for active SMEs (annual ICPAC audit €1,800–€3,500), while custom software development agencies charge €45–€85/hour. Companies qualifying under the Cyprus IP Box regime benefit from an 80% tax exemption on qualifying IP profits, resulting in an effective corporate tax rate as low as 2.5%.',
      el: 'Το 2026, η μηνιαία λογιστική υποστήριξη και ΦΠΑ στην Κύπρο κοστίζει €200–€450/μήνα (ετήσιος έλεγχος €1,800–€3,500), ενώ οι εταιρείες λογισμικού χρεώνουν €45–€85/ώρα. Το καθεστώς Cyprus IP Box προσφέρει απαλλαγή 80%, μειώνοντας τον πραγματικό εταιρικό φόρο έως και στο 2.5%.',
      ru: 'В 2026 году ежемесячное бухгалтерское обслуживание и подача VAT на Кипре обходятся в €200–€450/мес (годовой аудит ICPAC — €1,800–€3,500), а разработка ПО у локальных студий стоит €45–€85/час. Режим Cyprus IP Box освобождает 80% квалифицированной прибыли от интеллектуальной собственности, снижая эффективную ставку налога до 2.5%.',
    },
    pricePoints: [
      {
        label: {
          en: 'Monthly Accounting & VAT',
          el: 'Μηνιαία Λογιστική & ΦΠΑ',
          ru: 'Бухгалтерия и VAT (в мес.)',
        },
        value: {
          en: '€200–€450 / month',
          el: '€200–€450 / μήνα',
          ru: '€200–€450 / мес',
        },
      },
      {
        label: {
          en: 'Annual Audit / IP Box Effective Tax',
          el: 'Ετήσιος Έλεγχος / Φόρος IP Box',
          ru: 'Годовой аудит / Ставка IP Box',
        },
        value: {
          en: '€1,800–€3,500 • 2.5% IP Box',
          el: '€1,800–€3,500 • 2.5% IP Box',
          ru: '€1,800–€3,500 • 2.5% IP Box',
        },
      },
      {
        label: {
          en: 'Software Agency Hourly Rate',
          el: 'Ωριαία Χρέωση Ανάπτυξης Λογισμικού',
          ru: 'Ставка IT-разработки',
        },
        value: {
          en: '€45–€85 / hour',
          el: '€45–€85 / ώρα',
          ru: '€45–€85 / час',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do all Cyprus LTD companies require an annual financial audit?',
          el: 'Απαιτείται ετήσιος έλεγχος (audit) για όλες τις κυπριακές LTD;',
          ru: 'Обязателен ли ежегодный аудит для всех кипрских компаний?',
        },
        answer: {
          en: 'Yes, under Cyprus Companies Law (Cap. 113), every registered limited liability company must submit audited financial statements signed by a licensed ICPAC auditor.',
          el: 'Ναι, βάσει της κυπριακής νομοθεσίας, κάθε εταιρεία περιορισμένης ευθύνης υποχρεούται σε ετήσιο έλεγχο από εγκεκριμένο ελεγκτή (ΣΕΛΚ/ICPAC).',
          ru: 'Да, по закону Республики Кипр (Cap. 113) каждая компания LTD обязана ежегодно проходить аудит отчёта у лицензированного аудитора ICPAC.',
        },
      },
      {
        question: {
          en: 'What is the Cyprus VAT threshold and standard rate in 2026?',
          el: 'Ποιο είναι το όριο ΦΠΑ και ο κανονικός συντελεστής στην Κύπρο;',
          ru: 'Какой порог регистрации VAT и стандартная ставка НДС на Кипре?',
        },
        answer: {
          en: 'The standard VAT rate is 19% (with reduced 9% and 5% tiers), and mandatory VAT registration applies once taxable turnover exceeds €15,600 over 12 months.',
          el: 'Ο κανονικός συντελεστής ΦΠΑ είναι 19% και η εγγραφή είναι υποχρεωτική όταν ο κύκλος εργασιών υπερβαίνει τις €15,600 σε 12 μήνες.',
          ru: 'Стандартная ставка VAT — 19% (льготные — 9% и 5%), обязательная регистрация наступает при обороте свыше €15,600 за 12 месяцев.',
        },
      },
    ],
  },

  'renovation-construction': {
    slug: 'renovation-construction',
    guideTitle: {
      en: 'Cyprus Market Prices & Quick Facts (2026) — Renovation & Construction',
      el: 'Cyprus Market Prices & Quick Facts (2026) — Ανακαινίσεις & Κατασκευές',
      ru: 'Cyprus Market Prices & Quick Facts (2026) — Ремонт и Строительство',
    },
    overview: {
      en: 'In 2026, turnkey apartment renovation in Cyprus costs €650–€1,100/m² (cosmetic refresh €350–€500/m²), while new residential construction averages €1,650–€2,400/m² excluding land. Installing a 5 kW residential solar photovoltaic system costs €5,200–€6,800 (before government net-metering grants), and full architectural interior design runs €35–€65/m².',
      el: 'Το 2026, η πλήρης ανακαίνιση διαμερίσματος στην Κύπρο κοστίζει €650–€1,100/τ.μ. (βασικό φρεσκάρισμα €350–€500/τ.μ.) και η νέα κατασκευή €1,650–€2,400/τ.μ. χωρίς το οικόπεδο. Ένα φωτοβολταϊκό σύστημα 5 kW κοστίζει €5,200–€6,800 και ο αρχιτεκτονικός σχεδιασμός €35–€65/τ.μ.',
      ru: 'В 2026 году капитальный ремонт квартиры на Кипре под ключ стоит €650–€1,100/м² (косметический — €350–€500/м²), а строительство нового дома — €1,650–€2,400/м² без учёта земли. Установка солнечной системы 5 кВт обходится в €5,200–€6,800 (до вычета госсубсидии), а дизайн-проект интерьера — €35–€65/м².',
    },
    pricePoints: [
      {
        label: {
          en: 'Turnkey Apartment Renovation',
          el: 'Πλήρης Ανακαίνιση Διαμερίσματος',
          ru: 'Капитальный ремонт под ключ',
        },
        value: {
          en: '€650–€1,100 / m²',
          el: '€650–€1,100 / τ.μ.',
          ru: '€650–€1,100 / м²',
        },
      },
      {
        label: {
          en: 'New Construction (excl. land)',
          el: 'Νέα Κατασκευή (χωρίς οικόπεδο)',
          ru: 'Новое строительство (без земли)',
        },
        value: {
          en: '€1,650–€2,400 / m²',
          el: '€1,650–€2,400 / τ.μ.',
          ru: '€1,650–€2,400 / м²',
        },
      },
      {
        label: {
          en: '5 kW Solar PV / Interior Design',
          el: 'Φωτοβολταϊκά 5 kW / Σχεδιασμός',
          ru: 'Солнечная 5 kW / Дизайн-проект',
        },
        value: {
          en: '€5,200–€6,800 • €35–€65/m²',
          el: '€5,200–€6,800 • €35–€65/τ.μ.',
          ru: '€5,200–€6,800 • €35–€65/м²',
        },
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do I need an ETEK-licensed engineer for renovations in Cyprus?',
          el: 'Χρειάζεται μηχανικός ΕΤΕΚ για ανακαίνιση στην Κύπρο;',
          ru: 'Нужен ли лицензированный инженер ETEK для ремонта на Кипре?',
        },
        answer: {
          en: 'Cosmetic work (painting, flooring, kitchen cabinets) does not require permits, but structural changes, extensions, or facade alterations require an ETEK-registered architect/civil engineer and municipal Town Planning approval.',
          el: 'Οι αισθητικές εργασίες δεν απαιτούν άδεια, αλλά δομικές αλλαγές ή επεκτάσεις απαιτούν μελέτη από μηχανικό ΕΤΕΚ και πολεοδομική άδεια.',
          ru: 'Для косметического ремонта разрешения не нужны, но перепланировка несущих стен, пристройки и изменение фасада требуют проекта инженера ETEK и согласования в муниципалитете.',
        },
      },
      {
        question: {
          en: 'How long does a standard 90 m² apartment renovation take in Limassol or Paphos?',
          el: 'Πόσο διαρκεί η ανακαίνιση διαμερίσματος 90 τ.μ. στην Κύπρο;',
          ru: 'Сколько времени занимает ремонт квартиры 90 м² на Кипре?',
        },
        answer: {
          en: 'A full turnkey renovation including plumbing, electrical rewiring, tiling, and custom joinery typically takes 10 to 16 weeks depending on material lead times.',
          el: 'Μια πλήρης ανακαίνιση (υδραυλικά, ηλεκτρολογικά, πλακάκια, ξυλουργικά) διαρκεί συνήθως 10 έως 16 εβδομάδες.',
          ru: 'Полный ремонт с заменой электрики, сантехники, плитки и мебели на заказ занимает в среднем 10–16 недель.',
        },
      },
    ],
  },
};
