import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShopProvider, useShop } from '../context/ShopContext';

function AppShell() {
  const shop = useShop();
  const isDark = Boolean((shop as any)?.isDark);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: {
            backgroundColor: isDark ? '#09070F' : '#FAF9FC',
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
