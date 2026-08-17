export type PremiumTheme = 'light' | 'dark';

const STORAGE_KEY = 'alex-obi-theme';

const LIGHT = {
  bg: '#F7F5FC',
  surface: '#FFFFFF',
  surface2: '#EEE8F8',
  text: '#17121F',
  muted: '#625B70',
  border: '#D9D1E5',
  brand: '#6D28D9',
  brand2: '#8B5CF6',
  accent: '#C026D3',
};

const DARK = {
  bg: '#0B0810',
  surface: '#15101C',
  surface2: '#21182B',
  text: '#FFFFFF',
  muted: '#BDB3C9',
  border: '#392D45',
  brand: '#A78BFA',
  brand2: '#8B5CF6',
  accent: '#E879F9',
};

function colors(theme: PremiumTheme) {
  return theme === 'dark' ? DARK : LIGHT;
}

export function getPremiumTheme(): PremiumTheme {
  if (typeof window === 'undefined') return 'light';

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved === 'dark' || saved === 'light') {
      return saved;
    }

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch {
    return 'light';
  }
}

export function applyPremiumTheme(theme: PremiumTheme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const c = colors(theme);

  root.dataset.alexTheme = theme;
  root.style.colorScheme = theme;

  const vars: Record<string, string> = {
    '--alex-bg': c.bg,
    '--alex-surface': c.surface,
    '--alex-surface2': c.surface2,
    '--alex-text': c.text,
    '--alex-muted': c.muted,
    '--alex-border': c.border,
    '--alex-brand': c.brand,
    '--alex-brand2': c.brand2,
    '--alex-accent': c.accent,
  };

  Object.entries(vars).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });

  document.body.style.backgroundColor = c.bg;
  document.body.style.color = c.text;

  let style = document.getElementById('alex-obi-theme');

  if (!style) {
    style = document.createElement('style');
    style.id = 'alex-obi-theme';
    document.head.appendChild(style);
  }

  style.textContent = `
    html,
    body,
    #root {
      background: ${c.bg} !important;
      color: ${c.text} !important;
    }

    body {
      margin: 0;
      min-height: 100vh;
    }

    input,
    textarea,
    select {
      color: ${c.text} !important;
      background: ${c.surface} !important;
      border-color: ${c.border} !important;
    }

    input::placeholder,
    textarea::placeholder {
      color: ${c.muted} !important;
      opacity: 1 !important;
    }

    [data-alex-brand] {
      color: ${c.brand} !important;
    }

    [data-alex-surface] {
      background: ${c.surface} !important;
      color: ${c.text} !important;
      border-color: ${c.border} !important;
    }

    [data-alex-gradient] {
      background: linear-gradient(
        135deg,
        ${c.brand},
        ${c.brand2},
        ${c.accent}
      ) !important;
      color: #FFFFFF !important;
    }

    [data-alex-muted] {
      color: ${c.muted} !important;
    }

    [data-alex-theme="light"] .alex-readable-white {
      color: ${c.text} !important;
    }
  `;
}

export function setPremiumTheme(theme: PremiumTheme): void {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }

  applyPremiumTheme(theme);
}

export function togglePremiumTheme(): PremiumTheme {
  const next = getPremiumTheme() === 'dark' ? 'light' : 'dark';
  setPremiumTheme(next);
  return next;
}

export function installPremiumWebTheme(): void {
  if (typeof window === 'undefined') return;
  applyPremiumTheme(getPremiumTheme());
}
