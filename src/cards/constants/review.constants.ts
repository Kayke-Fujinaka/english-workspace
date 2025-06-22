export const REVIEW_INTERVALS = [
  1, // 1 min - First time wrong
  15, // 15 min - Initial stage
  1440, // 1 day (24 * 60)
  4320, // 3 days (72 * 60)
  10080, // 7 days (168 * 60)
  21600, // 15 days (360 * 60)
  43200, // 30 days (720 * 60)
  64800, // 45 days (1080 * 60)
  108000, // 75 days (1800 * 60)
  172800, // 120 days (2880 * 60)
  259200, // 180 days (4320 * 60)
] as const;

export const REVIEW_STAGE = {
  FIRST_WRONG: 0,
  INITIAL: 1,
  MIN_STAGE_AFTER_WRONG: 1,
  STAGE_REDUCTION_BASE: 2,
} as const;
