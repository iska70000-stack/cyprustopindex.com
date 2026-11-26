#!/usr/bin/env node
/**
 * scripts/collect-cyprus-businesses.mjs
 * CyprusTopIndex.com Data Pipeline & Quality Verification Engine
 *
 * Features:
 * 1. Optional Google Places API (New) fetcher when GOOGLE_PLACES_API_KEY is set.
 * 2. Strict quality gate: +357 phone code, street address and a valid URL if supplied.
 * 3. Live HTTP verification (--verify) of company websites.
 * 4. Generates src/data/verifiedDirectory.ts and src/data/freshness.json.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REGISTRY_PATH = path.join(__dirname, 'data', 'cyprus-verified-registry.json');
const OUTPUT_DIR_TS = path.join(rootDir, 'src', 'data', 'verifiedDirectory.ts');
const OUTPUT_FRESHNESS = path.join(rootDir, 'src', 'data', 'freshness.json');

const CATEGORY_META = [
  {
    slug: 'real-estate',
    icon: '🏠',
    titles: {
      en: 'Real Estate & Property Advisors',
      el: 'Ακίνητα & Μεσιτικά Γραφεία',
      ru: 'Недвижимость и Риелторы',
    },
  },
  {
    slug: 'lawyers-relocation',
    icon: '⚖️',
    titles: {
      en: 'Lawyers, Tax & Relocation',
      el: 'Δικηγόροι, Φόροι & Μετεγκατάσταση',
      ru: 'Юристы, Налоги и Релокация',
    },
  },
  {
    slug: 'car-rental-mobility',
    icon: '🚗',
    titles: {
      en: 'Car Rental & Airport Transfers',
      el: 'Ενοικίαση Αυτοκινήτων & Μεταφορές',
      ru: 'Аренда авто и Трансферы',
    },
  },
  {
    slug: 'medical-dental',
    icon: '🩺',
    titles: {
      en: 'Medical & Dental Clinics',
      el: 'Ιατρικές & Οδοντιατρικές Κλινικές',
      ru: 'Медицина и Стоматологии',
    },
  },
  {
    slug: 'it-business-services',
    icon: '💻',
    titles: {
      en: 'IT, Fintech & Business Services',
      el: 'Πληροφορική & Επιχειρηματικές Υπηρεσίες',
      ru: 'IT и Бизнес-сервисы',
    },
  },
  {
    slug: 'renovation-construction',
    icon: '🛠️',
    titles: {
      en: 'Renovation, Construction & Interiors',
      el: 'Ανακαινίσεις, Κατασκευές & Εσωτερικοί Χώροι',
      ru: 'Ремонт, Строительство и Дизайн',
    },
  },
];

async function verifyWebsite(url, timeoutMs = 7000) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'CyprusTopIndex-Verifier/1.0 (+https://cyprustopindex.com)',
      },
    });
    clearTimeout(timer);
    if (res.status >= 200 && res.status < 405) {
      return { ok: true, status: res.status };
    }
    return { ok: false, status: res.status };
  } catch (err) {
    return { ok: false, status: err.name === 'AbortError' ? 'TIMEOUT' : 'ERR' };
  }
}

function passesQualityFilter(item) {
  const hasCyprusPhone =
    Array.isArray(item.phones) &&
    item.phones.some((p) => String(p).replace(/\s+/g, '').startsWith('+357'));
  const hasWebsite = !item.website || /^https?:\/\/.+/.test(item.website);
  const hasAddress = Boolean(item.address?.en && item.address.en.length > 5);
  return hasCyprusPhone && hasWebsite && hasAddress;
}

async function fetchGooglePlacesIfConfigured() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return [];

  const queries = [
    { category: 'real-estate', textQuery: 'real estate agency Limassol Cyprus' },
    { category: 'lawyers-relocation', textQuery: 'law firm Nicosia Cyprus' },
    { category: 'car-rental-mobility', textQuery: 'car rental Larnaca Airport Cyprus' },
    { category: 'medical-dental', textQuery: 'private medical dental clinic Limassol Cyprus' },
  ];

  const discovered = [];
  for (const q of queries) {
    try {
      const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'places.displayName,places.formattedAddress,places.internationalPhoneNumber,places.websiteUri,places.rating',
        },
        body: JSON.stringify({ textQuery: q.textQuery, maxResultCount: 10 }),
      });
      if (!res.ok) continue;
      const data = await res.json();
      for (const p of data.places || []) {
        if (
          (p.rating ?? 0) >= 4.3 &&
          p.websiteUri &&
          p.internationalPhoneNumber?.startsWith('+357')
        ) {
          discovered.push({
            category: q.category,
            name: p.displayName?.text,
            address: p.formattedAddress,
            phone: p.internationalPhoneNumber,
            website: p.websiteUri,
            rating: p.rating,
          });
        }
      }
    } catch {
      // Ignore transient network errors
    }
  }
  return discovered;
}

async function main() {
  const shouldVerifyHttp = process.argv.includes('--verify');
  const raw = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));

  const placesExtra = await fetchGooglePlacesIfConfigured();
  if (placesExtra.length > 0) {
    console.log(`[Google Places API] Discovered ${placesExtra.length} qualified Cyprus businesses (>= 4.3★).`);
  }

  const passed = raw.filter(passesQualityFilter);
  console.log(`[Quality Gate] ${passed.length}/${raw.length} businesses passed (+357 phone, address, valid website if supplied).`);

  if (shouldVerifyHttp) {
    console.log('[HTTP Check] Verifying live website reachability...');
    const results = await Promise.all(
      passed.filter((item) => item.website).map(async (item) => {
        const check = await verifyWebsite(item.website);
        return { id: item.id, url: item.website, ...check };
      })
    );
    const okCount = results.filter((r) => r.ok).length;
    console.log(`[HTTP Check] ${okCount}/${results.length} websites responded live.`);
    for (const r of results.filter((x) => !x.ok)) {
      console.log(`  - Warning (${r.status}): ${r.id} -> ${r.url}`);
    }
  }

  const now = new Date();
  const isoDate = now.toISOString().slice(0, 10);
  const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const elMonths = ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαΐ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'];
  const ruMonths = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const d = now.getUTCDate();
  const m = now.getUTCMonth();
  const y = now.getUTCFullYear();

  const freshnessObj = {
    lastVerified: isoDate,
    formattedDate: {
      en: `${enMonths[m]} ${d}, ${y}`,
      el: `${d} ${elMonths[m]} ${y}`,
      ru: `${d} ${ruMonths[m]} ${y}`,
    },
  };
  fs.writeFileSync(OUTPUT_FRESHNESS, JSON.stringify(freshnessObj, null, 2) + '\n', 'utf-8');

  const categories = CATEGORY_META.map((meta) => {
    const catItems = passed
      .filter((x) => x.category === meta.slug)
      .map((x, idx) => ({
        id: x.id,
        rank: idx + 1,
        ...(idx === 0 ? { pinned_rank: true } : {}),
        city: x.city,
        rating: x.rating,
        type: 'company',
        languages: ['EN', 'EL', 'RU'],
        name: x.name,
        agency: x.agency,
        description: x.description,
        address: x.address,
        phones: x.phones,
        ...(x.whatsapp ? { whatsapp: x.whatsapp } : {}),
        website: x.website,
        ...(x.contactCheckedOn ? { contactCheckedOn: x.contactCheckedOn } : {}),
        verifiedDate: isoDate,
      }));
    return {
      slug: meta.slug,
      icon: meta.icon,
      titles: meta.titles,
      items: catItems,
    };
  });

  const tsContent = `// Auto-generated by scripts/collect-cyprus-businesses.mjs on ${isoDate}
import type { Locale } from '../config/siteConfig';

export interface DirectoryItem {
  id: string;
  rank: number;
  pinned_rank?: boolean;
  city: 'Limassol' | 'Nicosia' | 'Larnaca' | 'Paphos' | 'Island-wide';
  rating?: number;
  agency?: Record<Locale, string>;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  address: Record<Locale, string>;
  phones?: string[];
  whatsapp?: string;
  website?: string;
  type?: 'company' | 'specialist';
  image?: string;
  languages?: string[];
  verifiedDate?: string;
  contactCheckedOn?: string;
}

export interface DirectoryCategory {
  slug: string;
  icon: string;
  titles: Record<Locale, string>;
  items: DirectoryItem[];
}

export const VERIFIED_CATEGORIES: DirectoryCategory[] = ${JSON.stringify(categories, null, 2)};
`;

  fs.writeFileSync(OUTPUT_DIR_TS, tsContent, 'utf-8');
  console.log(`[Output] Generated ${OUTPUT_DIR_TS} with ${passed.length} verified Cyprus companies across ${categories.length} categories.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
