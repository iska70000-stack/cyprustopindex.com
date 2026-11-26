import { activePreset, type Locale } from '../config/siteConfig';
import type { DirectoryCategory, DirectoryItem } from './verifiedDirectory';
import { getProfileUrl } from './categorySeo';

export function getBusinessId(category: string, id: string) {
  return `${activePreset.siteUrl}${getProfileUrl(category, id, activePreset.defaultLocale)}#business`;
}

export function businessList(cat: DirectoryCategory, lang: Locale, path: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${activePreset.siteUrl}${path}#list`,
    name,
    numberOfItems: cat.items.length,
    itemListElement: cat.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': getBusinessId(cat.slug, item.id),
        name: item.name[lang],
        url: `${activePreset.siteUrl}${getProfileUrl(cat.slug, item.id, lang)}`,
      },
    })),
  };
}

const dentists = new Set([
  'smalto-dental-nicosia',
  'adamantio-dental-nicosia',
  'dr-onisiforou-limassol',
  'dental-house-larnaca',
]);

export function isDentalListing(item: DirectoryItem) {
  return dentists.has(item.id);
}

export function businessSchema(cat: DirectoryCategory, item: DirectoryItem, lang: Locale) {
  let type = 'LocalBusiness';
  if (cat.slug === 'lawyers-relocation') type = 'LegalService';
  if (cat.slug === 'car-rental-mobility') type = 'AutoRental';
  if (isDentalListing(item)) type = 'Dentist';

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': getBusinessId(cat.slug, item.id),
    name: item.name[lang],
    description: item.description[lang],
    mainEntityOfPage: `${activePreset.siteUrl}${getProfileUrl(cat.slug, item.id, lang)}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: item.address[lang],
      ...(item.city !== 'Island-wide' ? { addressLocality: item.city } : {}),
      addressCountry: 'CY',
    },
    ...(item.phones?.[0] ? { telephone: item.phones[0] } : {}),
    ...(item.website ? { url: item.website } : {}),
  };
}

export function breadcrumbs(crumbs: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(({ name, path }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: `${activePreset.siteUrl}${path}`,
    })),
  };
}
