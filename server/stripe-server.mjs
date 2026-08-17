import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = Number(process.env.STRIPE_SERVER_PORT || 4242);
const stripeKey = process.env.STRIPE_SECRET_KEY;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'ALEX OBI Stripe Checkout',
    stripeConfigured: Boolean(stripeKey),
  });
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if (!stripeKey) {
      return res.status(503).json({
        error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local.',
      });
    }

    const stripe = new Stripe(stripeKey);

    const items = Array.isArray(req.body?.items) ? req.body.items : [];

    if (!items.length) {
      return res.status(400).json({ error: 'Your cart is empty.' });
    }

    const origin =
      typeof req.body?.origin === 'string' && req.body.origin
        ? req.body.origin
        : 'http://localhost:8082';

    const currency =
      String(process.env.STRIPE_CURRENCY || 'usd').toLowerCase();

    const lineItems = items
      .map((item) => {
        const price = Number(item.price);
        const quantity = Math.max(1, Number(item.quantity || 1));

        if (!item.name || !Number.isFinite(price) || price <= 0) {
          return null;
        }

        return {
          price_data: {
            currency,
            product_data: {
              name: String(item.name).slice(0, 250),
              ...(item.image
                ? {
                    images: [String(item.image).slice(0, 2000)],
                  }
                : {}),
            },
            unit_amount: Math.round(price * 100),
          },
          quantity,
        };
      })
      .filter(Boolean);

    if (!lineItems.length) {
      return res.status(400).json({ error: 'Cart contains invalid products.' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${origin}/cart?payment=success`,
      cancel_url: `${origin}/cart?payment=cancelled`,
      metadata: {
        store: 'ALEX OBI',
      },
    });

    return res.json({
      ok: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'Unable to create Stripe checkout session.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`ALEX OBI Stripe server running on http://localhost:${PORT}`);
});
