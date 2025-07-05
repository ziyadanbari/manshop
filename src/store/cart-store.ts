import { create } from "zustand";
import type { Product } from "@/types/product";

export interface CartItem {
  id: number;
  name: string;
  originalPrice: number;
  price: number;
  images: string[];
  size: string;
  color: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (id: number, size: string, color: string) => void;
  updateQuantity: (
    id: number,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemsCount: () => number;
}

const STORAGE_KEY = "cart-items";

function getInitialItems(): CartItem[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
  }
  return [];
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: getInitialItems(),

  addItem: (product, size, color) => {
    const { items } = get();
    const existingItem = items.find(
      (item) =>
        item.id === product.id && item.size === size && item.color === color,
    );

    let newItems;
    if (existingItem) {
      newItems = items.map((item) =>
        item.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      newItems = [
        ...items,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          images: product.images,
          originalPrice: product.originalPrice,
          size,
          color,
          quantity: 1,
        },
      ];
    }
    set({ items: newItems });
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    }
  },

  removeItem: (id, size, color) => {
    const { items } = get();
    const newItems = items.filter(
      (item) => !(item.id === id && item.size === size && item.color === color),
    );
    set({ items: newItems });
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    }
  },

  updateQuantity: (id, size, color, quantity) => {
    const { items, removeItem } = get();
    if (quantity === 0) {
      removeItem(id, size, color);
    } else {
      const newItems = items.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item,
      );
      set({ items: newItems });
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      }
    }
  },

  clearCart: () => {
    set({ items: [] });
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getItemsCount: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
}));
