// @ts-nocheck
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShopProvider, useShop } from '../context/ShopContext';

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
  return (
    <ShopProvider>
      <AppShell />
    </ShopProvider>
  );
}
