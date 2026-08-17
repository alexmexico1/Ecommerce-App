import React, { createContext, useContext, useMemo, useState } from 'react';

const products = [
  {
    id: '1',
    name: 'Minimal Leather Backpack',
    category: 'Bags',
    price: 89,
    oldPrice: 119,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900',
    badge: 'BESTSELLER',
    description: 'A refined everyday backpack with premium leather details, spacious storage and a clean modern silhouette.'
  },
  {
    id: '2',
    name: 'Premium Chronograph Watch',
    category: 'Watches',
    price: 149,
    oldPrice: 199,
    rating: 4.8,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900',
    badge: 'POPULAR',
    description: 'A sophisticated chronograph designed for everyday wear with a timeless premium finish.'
  },
  {
    id: '3',
    name: 'Cloud Runner Sneakers',
    category: 'Sneakers',
    price: 109,
    oldPrice: 139,
    rating: 4.7,
    reviews: 211,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900',
    badge: 'NEW',
    description: 'Lightweight everyday sneakers combining comfort, cushioning and a sharp contemporary look.'
  },
  {
    id: '4',
    name: 'Essential Cotton Hoodie',
    category: 'Clothing',
    price: 64,
    oldPrice: 79,
    rating: 4.8,
    reviews: 176,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900',
    badge: '',
    description: 'Soft heavyweight cotton hoodie with a relaxed premium fit for effortless everyday styling.'
  },
  {
    id: '5',
    name: 'Classic Sunglasses',
    category: 'Accessories',
    price: 54,
    oldPrice: 69,
    rating: 4.6,
    reviews: 83,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900',
    badge: '',
    description: 'Clean classic sunglasses with a versatile frame made for daily wear.'
  },
  {
    id: '6',
    name: 'Modern Desk Headphones',
    category: 'Tech',
    price: 129,
    oldPrice: 169,
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900',
    badge: 'TOP RATED',
    description: 'Immersive wireless headphones with rich sound, comfortable cushions and a minimalist design.'
  },
];

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        return current.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart(current =>
      current
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({
      products,
      cart,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
    }),
    [cart, cartCount, subtotal]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error('useShop must be used inside ShopProvider');
  return value;
}
