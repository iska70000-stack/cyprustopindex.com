import type { Locale } from '../config/siteConfig';
import type { DecisionGuide } from './categoryGuides';

export interface ListingNote {
  text: Record<Locale, string>;
  source: string;
}

export const IMMIGRATION_PRACTICES: Readonly<Record<string, ListingNote>> = {
  'elias-neocleous-law': {
    text: {
      en: 'Work and residence permits, temporary residence for employees’ families, and relocation support for employers.',
      el: 'Άδειες εργασίας και διαμονής, προσωρινή διαμονή για οικογένειες εργαζομένων και υποστήριξη μετεγκατάστασης για εργοδότες.',
      ru: 'Разрешения на работу и проживание, временный ВНЖ для семей сотрудников и сопровождение работодателей при релокации.',
    },
    source: 'https://neo.law/expertise/immigration-law',
  },
  'michael-kyprianou-law': {
    text: {
      en: 'Temporary and permanent residence, family and partner applications, work permits and appeals.',
      el: 'Προσωρινή και μόνιμη διαμονή, αιτήσεις για οικογένειες και συντρόφους, άδειες εργασίας και προσφυγές.',
      ru: 'Временный и постоянный ВНЖ, заявления для членов семьи и партнёров, разрешения на работу и обжалование решений.',
    },
    source: 'https://www.kyprianou.com/expertises/immigration-law-cyprus/',
  },
  'agplaw-limassol': {
    text: {
      en: 'Temporary and permanent residence, relocation and work permits for staff of foreign-interest companies.',
      el: 'Προσωρινή και μόνιμη διαμονή, μετεγκατάσταση και άδειες εργασίας για προσωπικό εταιρειών ξένων συμφερόντων.',
      ru: 'Временный и постоянный ВНЖ, релокация и разрешения на работу для сотрудников компаний с иностранным участием.',
    },
    source: 'https://www.agplaw.com/transactions-advisory/immigration-cypriot-citizenship/',
  },
  'chrysostomides-advocates': {
    text: {
      en: 'Work and residence permits for hires at foreign-interest companies, applications for dependants and EU employee registration.',
      el: 'Άδειες εργασίας και διαμονής για προσωπικό εταιρειών ξένων συμφερόντων, αιτήσεις για εξαρτώμενα μέλη και εγγραφή εργαζομένων από την ΕΕ.',
      ru: 'Разрешения на работу и проживание для сотрудников компаний с иностранным участием, заявления для членов семьи и регистрация работников из ЕС.',
    },
    source: 'https://www.chrysostomides.com/legal-service/employment-immigration-citizenship-law/',
  },
  'harris-kyriakides-larnaca': {
    text: {
      en: 'Residence and investor visa applications, family reunification and immigration appeals.',
      el: 'Αιτήσεις για άδειες διαμονής και θεωρήσεις επενδυτών, οικογενειακή επανένωση και προσφυγές σε μεταναστευτικές υποθέσεις.',
      ru: 'Заявления на ВНЖ и визы инвесторов, воссоединение семьи и обжалование иммиграционных решений.',
    },
    source: 'https://www.harriskyriakides.law/expertise/practices/private-client/immigration/',
  },
};

export const IMMIGRATION_GUIDE: DecisionGuide = {
  question: {
    en: 'What should I ask an immigration lawyer before booking?',
    el: 'Τι να ρωτήσω έναν δικηγόρο μετανάστευσης πριν κλείσω ραντεβού;',
    ru: 'Что спросить у иммиграционного юриста перед консультацией?',
  },
  answer: {
    en: 'Tell the firm whether you are moving for work, with family or for another reason. Ask who will handle your case, what the quote covers, and which government fees or translation costs are separate. Check the official forms and instructions for your residence category with the Cyprus Migration Department.',
    el: 'Πείτε στο γραφείο αν μετακομίζετε για εργασία, με την οικογένειά σας ή για άλλον λόγο. Ρωτήστε ποιος θα αναλάβει την υπόθεση, τι καλύπτει η προσφορά και ποια κρατικά τέλη ή έξοδα μετάφρασης χρεώνονται χωριστά. Δείτε τα επίσημα έντυπα και τις οδηγίες για την κατηγορία σας στο Τμήμα Μετανάστευσης.',
    ru: 'Объясните фирме, переезжаете ли вы по работе, с семьёй или по другой причине. Уточните, кто будет вести дело, что входит в смету и какие госпошлины и расходы на перевод оплачиваются отдельно. Сверьте формы и требования для вашей категории ВНЖ на сайте Департамента миграции Кипра.',
  },
  sourceLabel: {
    en: 'Cyprus Migration Department',
    el: 'Τμήμα Μετανάστευσης Κύπρου',
    ru: 'Департамент миграции Кипра',
  },
  source: 'https://www.gov.cy/mip-md/en/',
};
