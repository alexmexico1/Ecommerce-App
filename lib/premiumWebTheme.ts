export type PremiumTheme = 'light' | 'dark';

const STORAGE_KEY = 'alex-obi-theme';

const LIGHT = {
  background: '#F7F7FB',
  surface: '#FFFFFF',
  surface2: '#F1F0F8',
  text: '#17151F',
  muted: '#686477',
  border: '#E7E4EE',
  brand: '#6D28D9',
  brand2: '#8B5CF6',
  accent: '#C026D3',
};

const DARK = {
  background: '#0B0910',
  surface: '#15121C',
  surface2: '#201B2A',
  text: '#F7F5FF',
  muted: '#B8B1C8',
  border: '#302A3B',
  brand: '#A78BFA',
  brand2: '#8B5CF6',
  accent: '#E879F9',
};

function getTheme(): PremiumTheme {
  if (typeof window === 'undefined') return 'light';

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') return saved;

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function apply(theme: PremiumTheme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const colors = theme === 'dark' ? DARK : LIGHT;

  root.dataset.alexTheme = theme;

  root.style.setProperty('--alex-bg', colors.background);
  root.style.setProperty('--alex-surface', colors.surface);
  root.style.setProperty('--alex-surface-2', colors.surface2);
  root.style.setProperty('--alex-text', colors.text);
  root.style.setProperty('--alex-muted', colors.muted);
  root.style.setProperty('--alex-border', colors.border);
  root.style.setProperty('--alex-brand', colors.brand);
  root.style.setProperty('--alex-brand-2', colors.brand2);
  root.style.setProperty('--alex-accent', colors.accent);

  document.body.style.background = colors.background;
  document.body.style.color = colors.text;
  document.body.style.margin = '0';
  document.body.style.minHeight = '100vh';

  let style = document.getElementById('alex-obi-premium-style');

  if (!style) {
    style = document.createElement('style');
    style.id = 'alex-obi-premium-style';
    document.head.appendChild(style);
  }

  style.textContent = `
    :root {
      --alex-bg: ${colors.background};
      --alex-surface: ${colors.surface};
      --alex-surface-2: ${colors.surface2};
      --alex-text: ${colors.text};
      --alex-muted: ${colors.muted};
      --alex-border: ${colors.border};
      --alex-brand: ${colors.brand};
      --alex-brand-2: ${colors.brand2};
      --alex-accent: ${colors.accent};
    }

    html,
    body,
    #root {
      background: var(--alex-bg) !important;
      color: var(--alex-text) !important;
      min-height: 100%;
    }

    body {
      transition:
        background-color .25s ease,
        color .25s ease;
      font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
    }

    input,
    textarea,
    select {
      color: var(--alex-text) !important;
      background: var(--alex-surface) !important;
      border-color: var(--alex-border) !important;
    }

    input::placeholder,
    textarea::placeholder {
      color: var(--alex-muted) !important;
      opacity: 1 !important;
    }

    button {
      font-family: inherit;
    }

    a {
      color: inherit;
    }

    [data-alex-brand] {
      color: var(--alex-brand) !important;
    }

    [data-alex-muted] {
      color: var(--alex-muted) !important;
    }

    [data-alex-surface] {
      background: var(--alex-surface) !important;
      border-color: var(--alex-border) !important;
    }

    [data-alex-gradient] {
      background:
        linear-gradient(
          135deg,
          var(--alex-brand),
          var(--alex-brand-2),
          var(--alex-accent)
        ) !important;
    }

    /*
     * Repair the white-on-white problem created by legacy inline
     * React Native Web styles.
     */
    [data-alex-theme="light"] .alex-legacy-white-fix {
      color: var(--alex-text) !important;
    }

    [data-alex-theme="dark"] .alex-legacy-white-fix {
      color: var(--alex-text) !important;
    }

    @media (max-width: 768px) {
      body {
        overflow-x: hidden;
      }
    }
  `;

  repairWhiteOnWhite(theme);
}

function repairWhiteOnWhite(theme: PremiumTheme) {
  if (typeof document === 'undefined') return;

  const colors = theme === 'dark' ? DARK : LIGHT;

  const elements = document.querySelectorAll<HTMLElement>(
    'body *'
  );

  elements.forEach((el) => {
    const computed = window.getComputedStyle(el);

    const color = computed.color;
    const background = computed.backgroundColor;

    const whiteText =
      color === 'rgb(255, 255, 255)' ||
      color === 'rgba(255, 255, 255, 1)' ||
      color === 'rgb(250, 250, 250)' ||
      color === 'rgba(250, 250, 250, 1)';

    const lightBackground =
      background === 'rgb(255, 255, 255)' ||
      background === 'rgba(255, 255, 255, 1)' ||
      background === 'rgb(247, 247, 251)' ||
      background === 'rgba(247, 247, 251, 1)';

    if (whiteText && lightBackground) {
      el.classList.add('alex-legacy-white-fix');
      el.style.setProperty('color', colors.text, 'important');
    }
  });
}

export function installPremiumWebTheme() {
  if (typeof window === 'undefined') return;

  const theme = getTheme();
  apply(theme);

  const observer = new MutationObserver(() => {
    repairWhiteOnWhite(theme);
  });

  if (document.body) {
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
  }

  return () => observer.disconnect();
}

export function setPremiumTheme(theme: PremiumTheme) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(STORAGE_KEY, theme);
  apply(theme);
}

export function getPremiumTheme(): PremiumTheme {
  return getTheme();
}

export function togglePremiumTheme(): PremiumTheme {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setPremiumTheme(next);
  return next;
}
