import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShopProvider, useShop } from '../context/ShopContext';
import { installPremiumWebTheme } from '../lib/premiumWebTheme';

function ThemeBoot() {
  useEffect(() => {
    installPremiumWebTheme();
  }, []);

  return null;
}

function AppNavigator() {
  const shop = useShop();

  const isDark =
    typeof shop.isDark === 'boolean'
      ? shop.isDark
      : shop.theme === 'dark';

  return (
    <>
      <ThemeBoot />

      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDark ? '#0B0810' : '#F7F5FC',
          },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <ShopProvider>
      <AppNavigator />
    </ShopProvider>
  );
}
