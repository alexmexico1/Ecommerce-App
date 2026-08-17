import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useShop } from '../context/ShopContext';
import { installPremiumWebTheme } from '../lib/premiumWebTheme';

function AppShell() {
  const { isDark } = useShop();

  useEffect(() => {
    installPremiumWebTheme();
  }, []);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: {
            backgroundColor: isDark ? '#0B0714' : '#FAF8FF',
          },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return <AppShell />;
}
