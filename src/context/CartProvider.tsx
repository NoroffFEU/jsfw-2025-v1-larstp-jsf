import { useState, type ReactNode } from "react";
import type { CartContextValue, CartItem } from "../types/cart";
import { CartContext } from "./cart-context";

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart: CartContextValue["addToCart"] = (item, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.productId === item.productId,
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }

      return [...currentItems, { ...item, quantity }];
    });
  };

  const removeFromCart: CartContextValue["removeFromCart"] = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((cartItem) => cartItem.productId !== productId),
    );
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (
    productId,
    quantity,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.productId === productId
          ? { ...cartItem, quantity }
          : cartItem,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const value: CartContextValue = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}