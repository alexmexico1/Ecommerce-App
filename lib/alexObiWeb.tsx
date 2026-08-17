import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useShop } from '../context/ShopContext';

export function AlexObiWebTheme() {
  const { isDark } = useShop();

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }

    const theme = isDark ? 'dark' : 'light';
    const root = document.documentElement;
    const body = document.body;

    root.dataset.alexTheme = theme;
    body.dataset.alexTheme = theme;

    const applyTheme = (next: 'light' | 'dark') => {
      root.dataset.alexTheme = next;
      body.dataset.alexTheme = next;
      root.style.colorScheme = next;
      body.style.colorScheme = next;
    };

    root.style.colorScheme = theme;
    body.style.colorScheme = theme;

    (window as any).__ALEX_OBI_APPLY_THEME = applyTheme;

    return () => {
      if ((window as any).__ALEX_OBI_APPLY_THEME === applyTheme) {
        delete (window as any).__ALEX_OBI_APPLY_THEME;
      }
    };
  }, [isDark]);

  return null;
}
