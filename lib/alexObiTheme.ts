export type AlexObiTheme = {
  dark: boolean;

  /* Core tokens */
  bg: string;
  background: string;
  surface: string;
  surface2: string;
  card: string;
  border: string;

  text: string;
  textMuted: string;
  textSoft: string;
  muted: string;

  brand: string;
  brandStrong: string;
  brandSoft: string;

  primary: string;
  primary2: string;
  accent: string;

  success: string;
  danger: string;
  gold: string;

  onPrimary: string;
  onDanger: string;

  shadow: string;
};

export const LIGHT_THEME: AlexObiTheme = {
  dark: false,

  bg: '#F7F5FC',
  background: '#F7F5FC',
  surface: '#FFFFFF',
  surface2: '#F1EDFA',
  card: '#FFFFFF',
  border: '#E5DDF2',

  text: '#171322',
  textMuted: '#5D586A',
  textSoft: '#858091',
  muted: '#5D586A',

  brand: '#7C3AED',
  brandStrong: '#5B21B6',
  brandSoft: '#EDE9FE',

  primary: '#7C3AED',
  primary2: '#EC4899',
  accent: '#EC4899',

  success: '#16A34A',
  danger: '#DC2626',
  gold: '#F59E0B',

  onPrimary: '#FFFFFF',
  onDanger: '#FFFFFF',

  shadow: 'rgba(31, 20, 60, 0.12)',
};

export const DARK_THEME: AlexObiTheme = {
  dark: true,

  bg: '#09070F',
  background: '#09070F',
  surface: '#12101A',
  surface2: '#1A1725',
  card: '#171421',
  border: '#30283D',

  text: '#F8F7FC',
  textMuted: '#C4BFCE',
  textSoft: '#918A9F',
  muted: '#C4BFCE',

  brand: '#A78BFA',
  brandStrong: '#8B5CF6',
  brandSoft: '#2A1C46',

  primary: '#8B5CF6',
  primary2: '#F472B6',
  accent: '#F472B6',

  success: '#4ADE80',
  danger: '#FB7185',
  gold: '#FBBF24',

  onPrimary: '#FFFFFF',
  onDanger: '#FFFFFF',

  shadow: 'rgba(0, 0, 0, 0.38)',
};

export function getAlexObiTheme(dark: boolean): AlexObiTheme {
  return dark ? DARK_THEME : LIGHT_THEME;
}
