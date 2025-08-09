// Centralized legal-age mapping for our age gate.
// IMPORTANT: This is a convenience table. Laws change and may differ by product (casino vs. lottery).
// Always verify locally relevant rules with counsel/regulators before shipping updates.

export type CountryCode = string;     // ISO 3166-1 alpha-2 (e.g., "US", "GB")
export type RegionCode = string;      // Subdivision code like "US-NV", "CA-AB"

export interface AgeRule {
  country: CountryCode;
  requiredAge: number;
  // Optional per-region overrides (state/province)
  regions?: Record<string /* RegionCode */, number /* requiredAge */>;
}

export const DEFAULT_REQUIRED_AGE = 18;

// Starter table: default 18 for most, explicit overrides where commonly higher (19/20/21).
// Expand as needed; entries later in the array can override earlier ones if duplicated.
export const AGE_RULES: AgeRule[] = [
  // North America
  {
    country: "US",
    requiredAge: 21, // Most iGaming contexts
    regions: {
      // Example structure if you ever need to deviate by state:
      // "US-AL": 21,
      // "US-NV": 21,
    },
  },
  {
    country: "CA",
    requiredAge: 19,
    regions: {
      "CA-AB": 18,
      "CA-MB": 18,
      "CA-QC": 18,
      // Most others 19 (BC, ON, SK, NB, NS, NL, PE)
    },
  },

  // Europe (broad defaults commonly used for online casino)
  { country: "GB", requiredAge: 18 }, // UK
  { country: "IE", requiredAge: 18 },
  { country: "MT", requiredAge: 18 },
  { country: "DE", requiredAge: 18 },
  { country: "FR", requiredAge: 18 },
  { country: "ES", requiredAge: 18 },
  { country: "PT", requiredAge: 18 },
  { country: "IT", requiredAge: 18 },
  { country: "NL", requiredAge: 18 },
  { country: "SE", requiredAge: 18 },
  { country: "NO", requiredAge: 18 },
  { country: "FI", requiredAge: 18 },
  { country: "DK", requiredAge: 18 },
  // If you operate in territories with higher thresholds, add them here:
  // { country: "GR", requiredAge: 21 },

  // APAC
  { country: "AU", requiredAge: 18 },
  { country: "NZ", requiredAge: 20 }, // Many venues enforce 20; adjust if your product differs

  // LATAM (defaults; adjust per market/regulator)
  { country: "BR", requiredAge: 18 },
  { country: "AR", requiredAge: 18 },
  { country: "CL", requiredAge: 18 },
  { country: "CO", requiredAge: 18 },
  { country: "MX", requiredAge: 18 },

  // Middle East / Africa (varies widely; these are placeholders—verify before enabling markets)
  { country: "ZA", requiredAge: 18 }, // South Africa
  // Add / adjust as needed...
];

// Utility to resolve age requirement from country + region code
export function resolveRequiredAge(
  country?: string | null,
  region?: string | null
): number {
  if (!country) return DEFAULT_REQUIRED_AGE;

  const cc = country.toUpperCase();
  const rc = region?.toUpperCase();

  // Find first matching rule by country
  const rule = AGE_RULES.find(r => r.country === cc);
  if (!rule) return DEFAULT_REQUIRED_AGE;

  // Region override (expects full code e.g., "CA-AB")
  if (rc && rule.regions && rule.regions[rc] != null) {
    return rule.regions[rc];
  }
  return rule.requiredAge ?? DEFAULT_REQUIRED_AGE;
}
