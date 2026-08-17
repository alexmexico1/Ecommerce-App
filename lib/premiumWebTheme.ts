const STYLE_ID = 'alex-obi-premium-theme';

export function installPremiumWebTheme() {
  if (typeof document === 'undefined') return () => {};

  const existing = document.getElementById(STYLE_ID);
  if (existing) return () => {};

  const style = document.createElement('style');
  style.id = STYLE_ID;

  style.textContent = `
    :root {
      --alex-brand: #6d28d9;
      --alex-brand-2: #9333ea;
      --alex-accent: #f59e0b;
      --alex-bg: #ffffff;
      --alex-surface: #ffffff;
      --alex-surface-2: #f8fafc;
      --alex-text: #111827;
      --alex-text-2: #475569;
      --alex-border: #e5e7eb;
      --alex-shadow: 0 18px 50px rgba(15,23,42,.08);
    }

    html[data-theme="dark"] {
      --alex-bg: #0b0713;
      --alex-surface: #130d20;
      --alex-surface-2: #1b122b;
      --alex-text: #f8fafc;
      --alex-text-2: #cbd5e1;
      --alex-border: #312044;
      --alex-shadow: 0 18px 50px rgba(0,0,0,.35);
    }

    html, body {
      background: var(--alex-bg) !important;
      color: var(--alex-text) !important;
    }

    body {
      transition:
        background-color .25s ease,
        color .25s ease;
    }

    body * {
      transition:
        background-color .2s ease,
        color .2s ease,
        border-color .2s ease;
    }

    a, button {
      color: inherit;
    }

    /* BRAND */
    [data-brand],
    .brand,
    .logo,
    [class*="brand"],
    [class*="logo"] {
      color: var(--alex-brand) !important;
    }

    /* Prevent white text on light surfaces */
    html:not([data-theme="dark"]) h1,
    html:not([data-theme="dark"]) h2,
    html:not([data-theme="dark"]) h3,
    html:not([data-theme="dark"]) h4,
    html:not([data-theme="dark"]) p,
    html:not([data-theme="dark"]) span,
    html:not([data-theme="dark"]) label {
      text-shadow: none;
    }

    /* Generic white text becomes readable unless it is over a dark hero */
    html:not([data-theme="dark"]) [style*="color: white"],
    html:not([data-theme="dark"]) [style*="color: #fff"],
    html:not([data-theme="dark"]) [style*="color:#fff"] {
      color: var(--alex-text) !important;
    }

    .alex-theme-toggle {
      border: 1px solid var(--alex-border);
      background: var(--alex-surface) !important;
      color: var(--alex-text) !important;
      border-radius: 999px;
      min-width: 44px;
      min-height: 44px;
      cursor: pointer;
      box-shadow: var(--alex-shadow);
    }

    .alex-theme-toggle:hover {
      border-color: var(--alex-brand);
      color: var(--alex-brand) !important;
      transform: translateY(-1px);
    }

    .alex-premium-surface {
      background: var(--alex-surface) !important;
      color: var(--alex-text) !important;
      border-color: var(--alex-border) !important;
    }

    .alex-premium-promo {
      background:
        linear-gradient(
          135deg,
          var(--alex-brand),
          var(--alex-brand-2)
        ) !important;
      color: #fff !important;
      border-radius: 24px;
    }

    .alex-premium-promo * {
      color: #fff !important;
    }

    footer {
      background: var(--alex-surface) !important;
      color: var(--alex-text) !important;
      border-top: 1px solid var(--alex-border) !important;
    }

    footer * {
      color: var(--alex-text-2);
    }

    footer a:hover {
      color: var(--alex-brand) !important;
    }

    input,
    textarea,
    select {
      background: var(--alex-surface) !important;
      color: var(--alex-text) !important;
      border-color: var(--alex-border) !important;
    }

    input::placeholder,
    textarea::placeholder {
      color: var(--alex-text-2) !important;
      opacity: .75;
    }
  `;

  document.head.appendChild(style);

  const saved = localStorage.getItem('alex-obi-theme');
  const theme =
    saved === 'dark' || saved === 'light'
      ? saved
      : window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  return () => {
    style.remove();
  };
}

export function setPremiumWebTheme(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return;

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  try {
    localStorage.setItem('alex-obi-theme', theme);
  } catch {}
}
