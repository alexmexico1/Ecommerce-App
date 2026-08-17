type ThemeName = 'light' | 'dark';

const STYLE_ID = 'alex-obi-real-theme';

const LIGHT = {
  bg: '#F7F5FC',
  surface: '#FFFFFF',
  surface2: '#F0ECF8',
  text: '#171329',
  muted: '#675F78',
  border: '#DED7EA',
  brand: '#6D28D9',
  brand2: '#8B5CF6',
  brandSoft: '#EDE9FE',
  danger: '#DC2626',
  success: '#059669',
};

const DARK = {
  bg: '#0D0A14',
  surface: '#17121F',
  surface2: '#21192D',
  text: '#F8F7FC',
  muted: '#B9B0C8',
  border: '#352B43',
  brand: '#A78BFA',
  brand2: '#C084FC',
  brandSoft: '#2A1D3D',
  danger: '#FB7185',
  success: '#34D399',
};

function vars(theme: ThemeName) {
  const c = theme === 'dark' ? DARK : LIGHT;

  return `
    --ao-bg:${c.bg};
    --ao-surface:${c.surface};
    --ao-surface-2:${c.surface2};
    --ao-text:${c.text};
    --ao-muted:${c.muted};
    --ao-border:${c.border};
    --ao-brand:${c.brand};
    --ao-brand-2:${c.brand2};
    --ao-brand-soft:${c.brandSoft};
    --ao-danger:${c.danger};
    --ao-success:${c.success};
  `;
}

function css() {
  return `
    :root {
      ${vars('light')}
      color-scheme: light;
    }

    html[data-ao-theme="light"] {
      ${vars('light')}
      color-scheme: light;
    }

    html[data-ao-theme="dark"] {
      ${vars('dark')}
      color-scheme: dark;
    }

    html,
    body,
    #root {
      min-height: 100%;
      margin: 0;
      padding: 0;
    }

    html,
    body {
      background: var(--ao-bg) !important;
      color: var(--ao-text) !important;
    }

    body {
      transition:
        background-color .22s ease,
        color .22s ease;
    }

    #root {
      background: var(--ao-bg) !important;
      color: var(--ao-text) !important;
    }

    /*
      IMPORTANT:
      Do not globally force every element to white or black.
      Components can still use their own colors.
    */

    input,
    textarea,
    select {
      background: var(--ao-surface) !important;
      color: var(--ao-text) !important;
      border-color: var(--ao-border) !important;
    }

    input::placeholder,
    textarea::placeholder {
      color: var(--ao-muted) !important;
      opacity: 1 !important;
    }

    /*
      Common React Native Web surfaces.
    */
    [data-ao-surface],
    .card,
    .product-card,
    .productCard,
    .surface,
    .panel,
    .section-card,
    .modal,
    [role="dialog"] {
      color: var(--ao-text);
    }

    /*
      Light mode must never leave ordinary text white on a light page.
      The runtime below catches inline React Native styles too.
    */
    html[data-ao-theme="light"] p,
    html[data-ao-theme="light"] span,
    html[data-ao-theme="light"] h1,
    html[data-ao-theme="light"] h2,
    html[data-ao-theme="light"] h3,
    html[data-ao-theme="light"] h4,
    html[data-ao-theme="light"] h5,
    html[data-ao-theme="light"] h6,
    html[data-ao-theme="light"] label {
      --ao-safe-text: var(--ao-text);
    }

    /*
      Premium ALEX OBI branding.
    */
    [data-ao-brand],
    .ao-brand,
    .alex-obi-brand {
      color: var(--ao-brand) !important;
    }

    .ao-gradient-text {
      background: linear-gradient(
        135deg,
        var(--ao-brand),
        var(--ao-brand-2)
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent !important;
    }

    /*
      Buttons with a filled brand background keep white text.
    */
    button[data-ao-primary],
    a[data-ao-primary],
    .ao-primary-button {
      color: #FFFFFF !important;
      background:
        linear-gradient(
          135deg,
          var(--ao-brand),
          var(--ao-brand-2)
        ) !important;
      border-color: transparent !important;
    }

    /*
      Theme toggle.
    */
    [data-theme-toggle],
    .theme-toggle,
    .ao-theme-toggle {
      color: var(--ao-text) !important;
      background: var(--ao-surface) !important;
      border: 1px solid var(--ao-border) !important;
    }

    /*
      Navigation / header.
    */
    header,
    nav {
      color: var(--ao-text);
    }

    /*
      Product images should never disappear behind a white layer.
    */
    img {
      max-width: 100%;
    }

    /*
      Accessibility: visible focus.
    */
    button:focus-visible,
    a:focus-visible,
    input:focus-visible,
    textarea:focus-visible,
    select:focus-visible {
      outline: 3px solid color-mix(
        in srgb,
        var(--ao-brand) 45%,
        transparent
      ) !important;
      outline-offset: 2px;
    }

    /*
      Dark mode surfaces.
    */
    html[data-ao-theme="dark"] body,
    html[data-ao-theme="dark"] #root {
      background: var(--ao-bg) !important;
      color: var(--ao-text) !important;
    }

    html[data-ao-theme="dark"] input,
    html[data-ao-theme="dark"] textarea,
    html[data-ao-theme="dark"] select {
      background: var(--ao-surface) !important;
      color: var(--ao-text) !important;
    }

    /*
      Premium browser scrollbar.
    */
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      background: var(--ao-bg);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--ao-border);
      border-radius: 999px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--ao-brand);
    }
  `;
}

function isWhite(rgb: string) {
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return false;

  const [r, g, b] = match.slice(0, 3).map(Number);

  return r >= 245 && g >= 245 && b >= 245;
}

function isLight(rgb: string) {
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return false;

  const [r, g, b] = match.slice(0, 3).map(Number);

  return r >= 225 && g >= 225 && b >= 225;
}

function findVisualBackground(el: HTMLElement) {
  let current: HTMLElement | null = el;

  while (current) {
    const style = window.getComputedStyle(current);

    if (
      style.backgroundImage &&
      style.backgroundImage !== 'none'
    ) {
      return {
        hasImage: true,
        color: style.backgroundColor,
      };
    }

    if (
      style.backgroundColor &&
      style.backgroundColor !== 'transparent' &&
      style.backgroundColor !== 'rgba(0, 0, 0, 0)'
    ) {
      return {
        hasImage: false,
        color: style.backgroundColor,
      };
    }

    current = current.parentElement;
  }

  return {
    hasImage: false,
    color: window.getComputedStyle(document.body).backgroundColor,
  };
}

function repairWhiteOnWhite() {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  if (root.dataset.aoTheme !== 'light') return;

  const elements = document.querySelectorAll<HTMLElement>(
    'p,span,h1,h2,h3,h4,h5,h6,label,a,button,strong,em,small'
  );

  elements.forEach((el) => {
    if (!el.textContent?.trim()) return;

    const style = window.getComputedStyle(el);
    const color = style.color;

    if (!isWhite(color)) return;

    /*
      Never change white text sitting on an image/gradient.
    */
    const background = findVisualBackground(el);

    if (background.hasImage) return;

    /*
      White text on a light/white background is unreadable.
    */
    if (isLight(background.color)) {
      el.style.setProperty(
        'color',
        LIGHT.text,
        'important'
      );
      el.dataset.aoVisibilityFixed = 'true';
    }
  });
}

function installStyle() {
  if (typeof document === 'undefined') return;

  let style = document.getElementById(
    STYLE_ID
  ) as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = css();
}

function apply(theme: ThemeName) {
  if (typeof document === 'undefined') return;

  installStyle();

  const root = document.documentElement;

  root.dataset.aoTheme = theme;
  root.dataset.theme = theme;

  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');

  document.body?.classList.toggle(
    'dark',
    theme === 'dark'
  );

  document.body?.classList.toggle(
    'light',
    theme === 'light'
  );

  document.body?.setAttribute(
    'data-ao-theme',
    theme
  );

  try {
    localStorage.setItem(
      'alex-obi-theme',
      theme
    );
  } catch {}

  if (theme === 'light') {
    requestAnimationFrame(() => {
      repairWhiteOnWhite();
    });
  }
}

export function getPremiumTheme(): ThemeName {
  if (typeof window === 'undefined') {
    return 'light';
  }

  try {
    const saved = localStorage.getItem(
      'alex-obi-theme'
    );

    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {}

  return 'light';
}

export function setPremiumTheme(
  theme: ThemeName
) {
  apply(theme);

  if (
    typeof window !== 'undefined' &&
    (window as any).__ALEX_OBI_THEME_CHANGE
  ) {
    (window as any).__ALEX_OBI_THEME_CHANGE(theme);
  }
}

export function togglePremiumTheme() {
  const next =
    getPremiumTheme() === 'dark'
      ? 'light'
      : 'dark';

  setPremiumTheme(next);

  return next;
}

export function installPremiumWebTheme() {
  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined'
  ) {
    return;
  }

  installStyle();

  const saved = getPremiumTheme();

  apply(saved);

  /*
    Allow React Native / ShopContext to notify this engine.
  */
  (window as any).__ALEX_OBI_APPLY_THEME =
    (theme: ThemeName) => {
      apply(theme);
    };

  /*
    Make theme changes work even if an old toggle button
    still exists and has no working onPress.
  */
  if (!(window as any).__ALEX_OBI_THEME_LISTENER) {
    const listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) return;

      const button =
        target.closest(
          'button,[role="button"],a'
        ) as HTMLElement | null;

      if (!button) return;

      const label = (
        button.getAttribute('aria-label') ||
        button.getAttribute('title') ||
        button.textContent ||
        ''
      ).toLowerCase();

      const looksLikeThemeButton =
        button.hasAttribute('data-theme-toggle') ||
        button.classList.contains('theme-toggle') ||
        button.classList.contains('ao-theme-toggle') ||
        label.includes('dark mode') ||
        label.includes('light mode') ||
        label.includes('toggle theme') ||
        label.includes('theme') ||
        label.includes('night mode') ||
        label.includes('appearance');

      if (!looksLikeThemeButton) return;

      event.preventDefault();
      event.stopPropagation();

      togglePremiumTheme();
    };

    document.addEventListener(
      'click',
      listener,
      true
    );

    (window as any).__ALEX_OBI_THEME_LISTENER =
      listener;
  }

  /*
    Continuously repair newly-rendered React Native Web
    nodes without touching text that is intentionally
    white on a hero/image/gradient.
  */
  if (!(window as any).__ALEX_OBI_VISIBILITY_OBSERVER) {
    const observer =
      new MutationObserver(() => {
        if (
          document.documentElement.dataset.aoTheme ===
          'light'
        ) {
          repairWhiteOnWhite();
        }
      });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [
        'style',
        'class',
      ],
    });

    (window as any).__ALEX_OBI_VISIBILITY_OBSERVER =
      observer;
  }

  requestAnimationFrame(() => {
    repairWhiteOnWhite();
  });
}


// Backward-compatible API used by the existing app layout.
export function setPremiumWebTheme(theme: 'light' | 'dark') {
  setPremiumTheme(theme);
}
