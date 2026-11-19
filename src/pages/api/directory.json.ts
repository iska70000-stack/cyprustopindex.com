import type { APIRoute } from 'astro';
import { activePreset } from '../../config/siteConfig';
import { VERIFIED_CATEGORIES } from '../../data/verifiedDirectory';
import { CATEGORY_GUIDES, HOME_MARKET_GUIDE } from '../../data/categoryGuides';
import freshness from '../../data/freshness.json';

export const GET: APIRoute = async () => {
  const payload = {
    site: activePreset.siteName,
    url: activePreset.siteUrl,
    region: 'Republic of Cyprus',
    cities: activePreset.cities,
    currency: activePreset.currency,
    lastVerified: freshness.lastVerified,
    marketFacts2026: HOME_MARKET_GUIDE,
    categories: VERIFIED_CATEGORIES.map((cat) => ({
      slug: cat.slug,
      titles: cat.titles,
      marketGuide: CATEGORY_GUIDES[cat.slug] || null,
      items: cat.items,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
