export const COUNT_BY_VALUES = [1, 4, 6, 2] as const;

export type CountBy = (typeof COUNT_BY_VALUES)[number];
