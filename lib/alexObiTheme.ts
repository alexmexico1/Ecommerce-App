export type AlexObiTheme = {
  dark: boolean;
  bg: string;
  surface: string;
  surface2: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
  textSoft: string;
  brand: string;
  brandStrong: string;
  brandSoft: string;
  accent: string;
  success: string;
  danger: string;
  shadow: string;
};

export const LIGHT_THEME: AlexObiTheme = {
  dark: false,
  bg: '#F7F7FB',
  surface: '#FFFFFF',
  surface2: '#F1F0F8',
  card: '#FFFFFF',
  border: '#E6E3EF',
  text: '#171322',
  textMuted: '#5D586A',
  textSoft: '#858091',
  brand: '#7C3AED',
  brandStrong: '#5B21B6',
  brandSoft: '#EDE9FE',
  accent: '#EC4899',
  success: '#16A34A',
  danger: '#DC2626',
  shadow: 'rgba(31, 20, 60, 0.12)',
};

export const DARK_THEME: AlexObiTheme = {
  dark: true,
  bg: '#09070F',
  surface: '#12101A',
  surface2: '#1A1725',
  card: '#171421',
  border: '#2C2639',
  text: '#F8F7FC',
  textMuted: '#C4BFCE',
  textSoft: '#918A9F',
  brand: '#A78BFA',
  brandStrong: '#8B5CF6',
  brandSoft: '#2A1C46',
  accent: '#F472B6',
  success: '#4ADE80',
  danger: '#FB7185',
  shadow: 'rgba(0, 0, 0, 0.35)',
};

export function getAlexObiTheme(dark: boolean): AlexObiTheme {
  return dark ? DARK_THEME : LIGHT_THEME;
}
