const validCountryCodes: string[] = [
  "BR", // Brazil
  "US", // United States
  "UK", // United Kingdom
  "JP", // Japan
  "IT", // Italy
  "FR", // France
  "AU", // Australia
  "DE", // Germany
] as const;
type ValidCountryCode = (typeof validCountryCodes)[number];

/*
 *  This is going to create a valid tracking code using the current date,
 *  a random generated code and the country under ISO 3166-1 alpha-2 format
 *  eg: BRABC12320251212 (this is a valid tracking code)
 *  eg: BRABC12320251340 (this is NOT a valid tracking code)
 */
export function GenerateTrackingCode(countryCode: ValidCountryCode): string {
  const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}`;

  return `${countryCode}${randomCode}${date}`;
}

/*
 *  This is going to validate a given tracking code as args, filtering it
 *  by regex validation:
 *
 *  Regex: ^ start, $ end
 *  ([A-Z]{2}) → country with 2 uppercase letters
 *  ([A-Z0-9]{6}) → random 6 digit alphanumeric code
 *  (\d{8}) → date with 8 digits (YYYYMMDD)
 */
export function ValidateTrackingCode(code: string): boolean {
  const regex = /^([A-Z]{2})([A-Z0-9]{6})(\d{8})$/;

  const match = regex.exec(code);
  if (!match) return false;

  const [, country, randomCode, dateStr] = match;

  if (!validCountryCodes.includes(country as ValidCountryCode)) return false;

  const year = parseInt(dateStr!.substring(0, 4), 10);
  const month = parseInt(dateStr!.substring(4, 6), 10);
  const day = parseInt(dateStr!.substring(6, 8), 10);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  )
    return false;

  return true;
}
