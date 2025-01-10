export const MOCKABLE_RANGE_URL = String(process.env.MOCKABLE_RANGE_URL);

export const MOCKABLE_FIXED_RANGE_URL = String(
  process.env.MOCKABLE_FIXED_RANGE_URL
);

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
