// Single source for destination-country display names (web UI and emails).
// The DB stores "NewZealand"; the API/UI use "New Zealand" — both map here.
export const COUNTRY_LABELS: Record<string, string> = {
  USA: 'Mỹ',
  Canada: 'Canada',
  'New Zealand': 'New Zealand',
  NewZealand: 'New Zealand',
  Germany: 'Đức',
  France: 'Pháp',
};

export function countryLabel(country?: string | null) {
  return country ? (COUNTRY_LABELS[country] ?? country) : '';
}
