// @ts-nocheck
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShopProvider, useShop } from '../context/ShopContext';
import { installPremiumWebTheme, setPremiumWebTheme } from '../lib/premiumWebTheme';
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
  const shop = useShop();
  const isDark = Boolean((shop as any).isDark ?? ((shop as any).theme === 'dark'));

  useEffect(() => {
    installPremiumWebTheme();
    setPremiumWebTheme(isDark ? 'dark' : 'light');
  }, [isDark]);
return (
    <ShopProvider>
      <AppShell />
    </ShopProvider>
  );
}
