// lib/cart.ts

export type ID = string | number;

export interface Product {
  id: ID;
  name: string;
  price: number;
  image?: string | null;
}

export interface CartItem {
  id: ID;
  name: string;
  price: number;
  image?: string | null;
  quantity: number;
}

const STORAGE_KEY = "cart";

function safeParseCart(raw: string | null): CartItem[] {
  try {
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
    // Basic sanity check
    if (!Array.isArray(parsed)) return [];
    return parsed.map((it) => ({
      id: it.id,
      name: String(it.name),
      price: Number(it.price) || 0,
      image: it.image ?? null,
      quantity: Number(it.quantity) || 0,
    }));
  } catch {
    return [];
  }
}

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return safeParseCart(raw);
}

function writeCartToStorage(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // ignore storage errors (quota etc.)
  }
}

/**
 * Add a product to the cart or increase its quantity.
 * Returns the updated cart.
 */
export const addToCart = (product: Product, quantity = 1): CartItem[] => {
  if (typeof window === "undefined") return [];

  const cart = readCartFromStorage();
  const existing = cart.find((it) => it.id === product.id);

  if (existing) {
    existing.quantity = existing.quantity + Math.max(0, quantity);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ?? null,
      quantity: Math.max(0, quantity),
    });
  }

  writeCartToStorage(cart);
  return cart;
};

/** Return all cart items (safe for SSR — returns [] on server) */
export const getCartItems = (): CartItem[] => {
  return readCartFromStorage();
};

/** Total price (number) */
export const getCartTotal = (): number => {
  const cart = getCartItems();
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

/** Total item count (sum of quantities) */
export const getCartItemCount = (): number => {
  const cart = getCartItems();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

/* ---------- optional helpers ---------- */

/** Remove an item completely from the cart by id */
export const removeFromCart = (id: ID): CartItem[] => {
  if (typeof window === "undefined") return [];
  const cart = readCartFromStorage().filter((it) => it.id !== id);
  writeCartToStorage(cart);
  return cart;
};

/** Update the quantity of an item; if quantity <= 0 the item is removed */
export const updateCartItemQuantity = (id: ID, quantity: number): CartItem[] => {
  if (typeof window === "undefined") return [];
  const cart = readCartFromStorage();
  const idx = cart.findIndex((it) => it.id === id);
  if (idx === -1) return cart;

  if (quantity <= 0) {
    cart.splice(idx, 1);
  } else {
    cart[idx].quantity = quantity;
  }

  writeCartToStorage(cart);
  return cart;
};

/** Clear the whole cart */
export const clearCart = (): void => {
  if (typeof window === "undefined") return;
  writeCartToStorage([]);
};
