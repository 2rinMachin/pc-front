'use client';

import { useEffect, useState } from 'react';

export interface CartItem {
  product_id: string;
  quantity: number;
}

const STORAGE_KEY = 'cart';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored =
        typeof window !== 'undefined'
          ? localStorage.getItem(STORAGE_KEY)
          : null;
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product_id: string, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product_id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product_id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { product_id, quantity }];
    });
  };

  const removeItem = (product_id: string) => {
    setItems((prev) => prev.filter((i) => i.product_id !== product_id));
  };

  const updateQty = (product_id: string, quantity: number) => {
    if (quantity <= 0) {
      return removeItem(product_id);
    }
    setItems((prev) =>
      prev.map((i) => (i.product_id === product_id ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, updateQty, clearCart, totalItems };
};
