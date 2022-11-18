export const formatStarCount = (num: number): string => new Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
