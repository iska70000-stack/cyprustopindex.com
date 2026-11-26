import type { Locale } from '../config/siteConfig';
import type { DirectoryItem } from './verifiedDirectory';

type City = DirectoryItem['city'];

export const CITY_NAMES: Record<City, Record<Locale, string>> = {
  Limassol: { en: 'Limassol', el: 'Λεμεσός', ru: 'Лимассол' },
  Nicosia: { en: 'Nicosia', el: 'Λευκωσία', ru: 'Никосия' },
  Larnaca: { en: 'Larnaca', el: 'Λάρνακα', ru: 'Ларнака' },
  Paphos: { en: 'Paphos', el: 'Πάφος', ru: 'Пафос' },
  'Island-wide': { en: 'Island-wide', el: 'Παγκύπρια', ru: 'Весь Кипр' },
};
