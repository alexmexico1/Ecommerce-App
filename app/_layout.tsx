import React from 'react';
import { Stack } from 'expo-router';
import { ShopProvider } from '../context/ShopContext';
import { AlexObiWebTheme } from '../lib/alexObiWeb';
import '../lib/alexObiWeb.css';

export default function RootLayout() {
  return (
    <ShopProvider>
      <AlexObiWebTheme />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ShopProvider>
  );
}
