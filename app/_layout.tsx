import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShopProvider, useShop } from '../context/ShopContext';
import '../lib/alexObiWeb.css';

function AppShell() {
  const { theme } = useShop();
  const dark = theme === 'dark';

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.documentElement.setAttribute(
      'data-alex-obi-theme',
      dark ? 'dark' : 'light'
    );

    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  }, [dark]);

  return (
    <>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: dark ? '#09070F' : '#F7F7FB',
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
