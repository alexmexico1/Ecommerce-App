import React from 'react';
import { Stack } from 'expo-router';
import { ShopProvider } from '../context/ShopContext';

export default function RootLayout() {
  return (
    <ShopProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
      </Stack>
    </ShopProvider>
  );
}
