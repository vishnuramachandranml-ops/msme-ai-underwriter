export const NavigationSection = {
  MAIN: "MAIN",
  ANALYTICS: "ANALYTICS",
  SYSTEM: "SYSTEM",
} as const;

export type NavigationSection =
  (typeof NavigationSection)[keyof typeof NavigationSection];