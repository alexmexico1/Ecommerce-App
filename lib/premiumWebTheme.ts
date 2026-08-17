
export function installPremiumWebTheme() {
  if (typeof document === 'undefined') return () => {};

  if (document.getElementById('alex-obi-premium-theme')) {
    return () => {};
  }

  const style = document.createElement('style');

  style.id = 'alex-obi-premium-theme';

  style.textContent = `
    :root {
      --alex-brand: #7c3aed;
      --alex-pink: #ec4899;
      --alex-blue: #2563eb;
      --alex-bg: #f7f7fb;
    }

    html,
    body,
    #root {
      min-height: 100%;
    }

    body {
      margin: 0;
      background:
        radial-gradient(
          circle at 15% 0%,
          rgba(124,58,237,.08),
          transparent 30%
        ),
        #f7f7fb !important;
      transition:
        background .3s ease,
        color .3s ease;
    }

    [data-alex-theme="dark"] body {
      background:
        radial-gradient(
          circle at 20% 0%,
          rgba(124,58,237,.18),
          transparent 35%
        ),
        #080811 !important;
      color: #f8fafc !important;
    }

    [data-alex-theme="dark"] input {
      background: #151521 !important;
      color: #ffffff !important;
      border-color: #303044 !important;
    }

    [data-alex-theme="dark"] button {
      color: #ffffff;
    }

    [data-alex-brand] {
      color: #7c3aed !important;
    }

    [data-alex-promo] {
      background:
        linear-gradient(
          135deg,
          #111827 0%,
          #312e81 45%,
          #7c3aed 100%
        ) !important;
      color: #ffffff !important;
      border: none !important;
    }

    [data-alex-promo] * {
      color: #ffffff !important;
    }

    [data-alex-theme="dark"] [data-alex-promo] {
      background:
        linear-gradient(
          135deg,
          #0f172a,
          #312e81,
          #7c3aed
        ) !important;
    }
  `;

  document.head.appendChild(style);

  const apply = () => {
    const root = document.documentElement;

    let theme = localStorage.getItem('alex-obi-theme');

    if (!theme) {
      theme = 'light';
      localStorage.setItem('alex-obi-theme', theme);
    }

    root.setAttribute(
      'data-alex-theme',
      theme === 'dark' ? 'dark' : 'light'
    );

    document.querySelectorAll('*').forEach((element) => {
      const text = (element.textContent || '').trim();

      if (
        text === 'ALEX OBI' ||
        text.startsWith('ALEX OBI PREMIUM')
      ) {
        element.setAttribute(
          'data-alex-brand',
          'true'
        );
      }

      if (
        text.includes(
          'Get 15% off your first order.'
        )
      ) {
        const parent =
          element.parentElement?.parentElement ||
          element.parentElement;

        if (parent) {
          parent.setAttribute(
            'data-alex-promo',
            'true'
          );
        }
      }
    });
  };

  apply();

  const observer =
    new MutationObserver(apply);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  const toggleTheme = () => {
    const current =
      document.documentElement.getAttribute(
        'data-alex-theme'
      );

    const next =
      current === 'dark'
        ? 'light'
        : 'dark';

    localStorage.setItem(
      'alex-obi-theme',
      next
    );

    document.documentElement.setAttribute(
      'data-alex-theme',
      next
    );
  };

  const handleClick = (event: Event) => {
    const target =
      event.target as HTMLElement | null;

    const button =
      target?.closest?.(
        '[data-testid="theme-toggle"]'
      );

    if (button) {
      toggleTheme();
    }
  };

  document.addEventListener(
    'click',
    handleClick
  );

  return () => {
    observer.disconnect();

    document.removeEventListener(
      'click',
      handleClick
    );

    style.remove();
  };
}
