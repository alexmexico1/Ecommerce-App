import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShopProvider, useShop } from '../context/ShopContext';
import { installPremiumWebTheme, setPremiumTheme, installAlexObiVisibilityCSS } from '../lib/premiumWebTheme';

function AppShell() {
  const { isDark, theme } = useShop();

  useEffect(() => {
    installPremiumWebTheme();
    installAlexObiVisibilityCSS();
    setPremiumTheme(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDark ? '#090611' : '#FFFFFF',
          },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <ShopProvider>
      <AppShell />
    </ShopProvider>
  );
}
