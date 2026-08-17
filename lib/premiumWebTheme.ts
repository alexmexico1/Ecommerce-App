export type PremiumTheme = 'light' | 'dark';

const LIGHT = {
  background: '#FAF8FF',
  surface: '#FFFFFF',
  surface2: '#F4F0FF',
  text: '#171122',
  muted: '#6D647D',
  border: '#E6DFF0',
  brand: '#7C3AED',
  brand2: '#A855F7',
  accent: '#EC4899',
};

const DARK = {
  background: '#0B0714',
  surface: '#151021',
  surface2: '#211634',
  text: '#F8F5FF',
  muted: '#B9ADC9',
  border: '#342542',
  brand: '#A78BFA',
  brand2: '#C084FC',
  accent: '#F472B6',
};

function getTheme(): PremiumTheme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark'
    ? 'dark'
    : 'light';
}

export function setPremiumTheme(theme: PremiumTheme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const colors = theme === 'dark' ? DARK : LIGHT;

  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const vars: Record<string, string> = {
    '--app-bg': colors.background,
    '--app-surface': colors.surface,
    '--app-surface-2': colors.surface2,
    '--app-text': colors.text,
    '--app-muted': colors.muted,
    '--app-border': colors.border,
    '--app-brand': colors.brand,
    '--app-brand-2': colors.brand2,
    '--app-accent': colors.accent,
  };

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  document.body.style.backgroundColor = colors.background;
  document.body.style.color = colors.text;

  root.querySelectorAll<HTMLElement>(
    '[data-theme-text="auto"]'
  ).forEach((el) => {
    el.style.color = colors.text;
  });

  root.querySelectorAll<HTMLElement>(
    '[data-theme-surface="auto"]'
  ).forEach((el) => {
    el.style.backgroundColor = colors.surface;
    el.style.borderColor = colors.border;
  });

  root.querySelectorAll<HTMLElement>(
    '[data-theme-muted="auto"]'
  ).forEach((el) => {
    el.style.color = colors.muted;
  });
}

export function getPremiumTheme(): PremiumTheme {
  return getTheme();
}

export function installPremiumWebTheme() {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (!root.dataset.theme) {
    const stored = window.localStorage.getItem('@alex_obi_theme');
    const preferred =
      stored === 'dark' || stored === 'light'
        ? stored
        : window.matchMedia?.('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    root.dataset.theme = preferred;
  }

  const styleId = 'alex-obi-premium-theme';

  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;

    style.textContent = `
      :root {
        --app-bg: #FAF8FF;
        --app-surface: #FFFFFF;
        --app-surface-2: #F4F0FF;
        --app-text: #171122;
        --app-muted: #6D647D;
        --app-border: #E6DFF0;
        --app-brand: #7C3AED;
        --app-brand-2: #A855F7;
        --app-accent: #EC4899;
      }

      html[data-theme="dark"] {
        --app-bg: #0B0714;
        --app-surface: #151021;
        --app-surface-2: #211634;
        --app-text: #F8F5FF;
        --app-muted: #B9ADC9;
        --app-border: #342542;
        --app-brand: #A78BFA;
        --app-brand-2: #C084FC;
        --app-accent: #F472B6;
      }

      html, body, #root {
        background: var(--app-bg) !important;
        color: var(--app-text) !important;
      }

      body {
        margin: 0;
      }

      input, textarea, select {
        background: var(--app-surface) !important;
        color: var(--app-text) !important;
        border-color: var(--app-border) !important;
      }

      input::placeholder,
      textarea::placeholder {
        color: var(--app-muted) !important;
      }

      [data-theme="dark"] * {
        border-color: var(--app-border);
      }

      [data-theme="dark"] a,
      [data-theme="dark"] p,
      [data-theme="dark"] span,
      [data-theme="dark"] label,
      [data-theme="dark"] h1,
      [data-theme="dark"] h2,
      [data-theme="dark"] h3,
      [data-theme="dark"] h4,
      [data-theme="dark"] h5,
      [data-theme="dark"] h6 {
        color: inherit;
      }

      .alex-obi-brand {
        color: var(--app-brand) !important;
        background: linear-gradient(
          90deg,
          var(--app-brand),
          var(--app-brand-2),
          var(--app-accent)
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .alex-obi-surface {
        background: var(--app-surface) !important;
        color: var(--app-text) !important;
        border-color: var(--app-border) !important;
      }

      .alex-obi-muted {
        color: var(--app-muted) !important;
      }
    `;

    document.head.appendChild(style);
  }

  setPremiumTheme(getPremiumTheme());
}
