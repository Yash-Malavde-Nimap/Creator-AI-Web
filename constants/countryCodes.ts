import { all } from 'country-codes-list';

export interface CountryCode {
  code: string;   // e.g. "+91"
  flag: string;   // e.g. "🇮🇳"
  name: string;   // e.g. "India"
  iso: string;    // e.g. "IN"
}

export const COUNTRY_CODES: CountryCode[] = all()
  .filter((c) => c.countryCallingCode)
  .map((c) => ({
    code: `+${c.countryCallingCode}`,
    flag: c.flag,
    name: c.countryNameEn,
    iso:  c.countryCode,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
