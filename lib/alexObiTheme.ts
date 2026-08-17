export const LIGHT_THEME = {
  background: '#F8F7FB',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  text: '#17151F',
  textSecondary: '#625E6B',
  textMuted: '#85808F',
  border: '#E7E3EE',
  brand: '#6D28D9',
  brandStrong: '#5B21B6',
  brandSoft: '#EDE9FE',
  accent: '#F59E0B',
  success: '#16A34A',
  danger: '#DC2626',
};

export const DARK_THEME = {
  background: '#0B0910',
  surface: '#15121C',
  surfaceElevated: '#1C1825',
  text: '#F8F7FC',
  textSecondary: '#C7C1D0',
  textMuted: '#9992A5',
  border: '#302A3A',
  brand: '#A78BFA',
  brandStrong: '#8B5CF6',
  brandSoft: '#2E1B55',
  accent: '#FBBF24',
  success: '#4ADE80',
  danger: '#F87171',
};

export function getTheme(isDark: boolean) {
  return isDark ? DARK_THEME : LIGHT_THEME;
}
