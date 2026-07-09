/**
 * tokens.ts — source de vérité du design system Deukway.
 * Ces valeurs doivent rester synchronisées avec tailwind.config.js.
 * Utilisées directement dans les composants qui ont besoin de valeurs JS
 * (ex: react-native-maps, icônes, animations) plutôt que de classes NativeWind.
 */

export const colors = {
  primary: "#0E7C5A",
  primaryLight: "#12A374",
  primaryDark: "#0A5C42",
  accent: "#F5A623",
  ink: "#101418",
  muted: "#6B7280",
  surface: "#F7F8F7",
  border: "#E6E8E6",
  white: "#FFFFFF",
  danger: "#DC2626",
  success: "#16A34A",
  warning: "#D97706",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: "700" as const, color: colors.ink },
  h2: { fontSize: 22, fontWeight: "700" as const, color: colors.ink },
  h3: { fontSize: 18, fontWeight: "600" as const, color: colors.ink },
  body: { fontSize: 15, fontWeight: "400" as const, color: colors.ink },
  bodyMuted: { fontSize: 14, fontWeight: "400" as const, color: colors.muted },
  caption: { fontSize: 12, fontWeight: "500" as const, color: colors.muted },
  price: { fontSize: 16, fontWeight: "700" as const, color: colors.primaryDark },
};

export default { colors, spacing, radius, typography };
