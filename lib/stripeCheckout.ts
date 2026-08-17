import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

export type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export async function startStripeCheckout(items: CheckoutItem[]) {
  const apiUrl =
    process.env.EXPO_PUBLIC_CHECKOUT_API_URL ||
    'http://localhost:4242';

  const origin =
    Platform.OS === 'web' && typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:8082';

  const response = await fetch(
    `${apiUrl.replace(/\/$/, '')}/api/create-checkout-session`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        origin,
      }),
    },
  );

  const payload = await response.json();

  if (!response.ok || !payload?.url) {
    throw new Error(
      payload?.error || 'Unable to start secure checkout.',
    );
  }

  await Linking.openURL(payload.url);
}
