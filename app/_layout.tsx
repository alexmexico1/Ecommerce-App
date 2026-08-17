import { useEffect } from 'react';
// @ts-nocheck
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShopProvider, useShop } from '../context/ShopContext';
import { installPremiumWebTheme } from '../lib/premiumWebTheme';

function AppShell() {
  const { isDark } = useShop();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown:false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    return installPremiumWebTheme();
  }, []);

  return (
    <ShopProvider>
      <AppShell />
    </ShopProvider>
  );
}
