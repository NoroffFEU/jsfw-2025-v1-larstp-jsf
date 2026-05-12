export type CartItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartContextValue = CartState & {
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};
