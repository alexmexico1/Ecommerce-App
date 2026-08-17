import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

import { products as catalogProducts } from '../data/products';

export type ThemeMode = 'light' | 'dark';

export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image?: any;
  images?: any[];
  category: string;
  sub?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  color?: string;
  sizes?: string[];
  colors?: string[];
  stock?: number;
};

export type CartItem = Product & {
  quantity: number;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read?: boolean;
};

export type ShopState = {
  theme: ThemeMode;
  products: Product[];
  cart: CartItem[];
  notifications: NotificationItem[];
  wishlist: string[];
};

type Action =
  | { type: 'INIT_STATE'; payload: Partial<ShopState> }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: ThemeMode }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; delta: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_NOTIFICATION'; payload: NotificationItem }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'MARK_NOTIFICATIONS_READ' }
  | { type: 'TOGGLE_WISHLIST'; payload: string };

export type ShopContextValue = {
  state: ShopState;
  dispatch: React.Dispatch<Action>;

  products: Product[];
  cart: CartItem[];
  notifications: NotificationItem[];
  theme: ThemeMode;
  isDark: boolean;

  wishlist: string[];
  toggleWishlist: (id: string) => void;

  subtotal: number;
  cartCount: number;

  addToCart: (product: Product) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  addNotification: (
    title: string,
    message: string
  ) => void;
  clearNotifications: () => void;
  markNotificationsRead: () => void;
};

const PRODUCTS: Product[] = catalogProducts as Product[];

const initialState: ShopState = {
  theme: 'light',
  wishlist: [],
  products: PRODUCTS,
  cart: [],
  notifications: [
    {
      id: 'welcome',
      title: 'Welcome to ALEX OBI',
      message: 'Premium everyday essentials are ready to shop.',
      createdAt: new Date().toISOString(),
      read: false,
    },
  ],
};

function reducer(
  state: ShopState,
  action: Action
): ShopState {
  switch (action.type) {
    case 'INIT_STATE':
      return {
        ...state,
        ...action.payload,
        products: PRODUCTS,
        cart: Array.isArray(action.payload.cart)
          ? action.payload.cart
          : [],
        notifications: Array.isArray(action.payload.notifications)
          ? action.payload.notifications
          : state.notifications,
        wishlist: Array.isArray(action.payload.wishlist)
          ? action.payload.wishlist
          : state.wishlist,
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };

    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };

    case 'ADD_TO_CART': {
      const product = action.payload;
      const existing = state.cart.find(
        item => item.id === product.id
      );

      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...product,
            quantity: 1,
          },
        ],
      };
    }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: Math.max(
                    0,
                    item.quantity + action.payload.delta
                  ),
                }
              : item
          )
          .filter(item => item.quantity > 0),
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          item => item.id !== action.payload
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          action.payload,
          ...state.notifications,
        ].slice(0, 50),
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };

    case 'MARK_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map(item => ({
          ...item,
          read: true,
        })),
      };

    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.payload)
          ? state.wishlist.filter(id => id !== action.payload)
          : [...state.wishlist, action.payload],
      };

    default:
      return state;
  }
}

const ShopContext = createContext<ShopContextValue | undefined>(
  undefined
);

export function ShopProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const saved =
          await AsyncStorage.getItem('ALEX_OBI_APP');

        if (!mounted || !saved) return;

        const parsed = JSON.parse(saved);

        dispatch({
          type: 'INIT_STATE',
          payload: parsed,
        });
      } catch {
        // Keep clean defaults if storage is unavailable.
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      'ALEX_OBI_APP',
      JSON.stringify({
        theme: state.theme,
        cart: state.cart,
        notifications: state.notifications,
      })
    ).catch(() => {});
  }, [
    state.theme,
    state.cart,
    state.notifications,
  ]);

  const value = useMemo<ShopContextValue>(() => {
    const subtotal = state.cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    const cartCount = state.cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

    return {
      state,
      dispatch,

      products: state.products,
      cart: state.cart,
      notifications: state.notifications,
      theme: state.theme,
      isDark: state.theme === 'dark',
      wishlist: state.wishlist,
      toggleWishlist: (id: string) => {
        dispatch({ type: 'TOGGLE_WISHLIST', payload: id });
      },

      subtotal,
      cartCount,

      addToCart: (product: Product) => {
        dispatch({
          type: 'ADD_TO_CART',
          payload: product,
        });
      },

      updateQuantity: (
        id: string,
        delta: number
      ) => {
        dispatch({
          type: 'UPDATE_QUANTITY',
          payload: { id, delta },
        });
      },

      removeFromCart: (id: string) => {
        dispatch({
          type: 'REMOVE_FROM_CART',
          payload: id,
        });
      },

      clearCart: () => {
        dispatch({
          type: 'CLEAR_CART',
        });
      },

      toggleTheme: () => {
        dispatch({
          type: 'TOGGLE_THEME',
        });
      },

      setTheme: (theme: ThemeMode) => {
        dispatch({
          type: 'SET_THEME',
          payload: theme,
        });
      },

      addNotification: (
        title: string,
        message: string
      ) => {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: `${Date.now()}-${Math.random()}`,
            title,
            message,
            createdAt: new Date().toISOString(),
            read: false,
          },
        });
      },

      clearNotifications: () => {
        dispatch({
          type: 'CLEAR_NOTIFICATIONS',
        });
      },

      markNotificationsRead: () => {
        dispatch({
          type: 'MARK_NOTIFICATIONS_READ',
        });
      },
    };
  }, [state, dispatch]);

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop(): ShopContextValue {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      'useShop must be used inside <ShopProvider />'
    );
  }

  return context;
}
