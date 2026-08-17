import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShopProvider, useShop } from '../context/ShopContext';
import { installPremiumWebTheme } from '../lib/premiumWebTheme';

function RootNavigator() {
  const { isDark } = useShop();

  useEffect(() => {
    const cleanup = installPremiumWebTheme();

    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDark ? '#0B0910' : '#F7F7FB',
          },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <ShopProvider>
      <RootNavigator />
    </ShopProvider>
  );
}
