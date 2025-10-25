import { create } from "zustand";
import { persist } from "zustand/middleware";

// 1) Update interface (replace original CartItem)
export interface CartItem {
  id: string;
  name: string;
  // price is stored in subunits (e.g. kobo if NGN). Keep this convention across backend/frontend.
  price: number;
  imageUrl: string | null;
  // optional legacy alias for some components that still use `image`
  image?: string;
  quantity: number;
  // optional raw/subunit original price if you want to keep it
  originalPrice?: number;
}


interface CartStore {
  items: CartItem[];

  // add an item; quantity defaults to 1
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;

  // remove N quantity (default 1). If quantity reaches 0 it's removed.
  removeItem: (id: string, quantity?: number) => void;

  // remove all quantities of an item immediately
  removeAll: (id: string) => void;

  // set an exact quantity (if <=0 item removed)
  updateQuantity: (id: string, quantity: number) => void;

  // clear cart
  clearCart: () => void;

  // derived helpers
  getTotal: () => number; // returns total in subunits
  getTotalFormatted: (currency?: string) => string; // returns formatted string (e.g. "₦1,234.00")
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) =>
        set((state) => {
          const id = String(item.id);
          const existing = state.items.find((i) => i.id === id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl ?? null,
                quantity,
              },
            ],
          };
        }),

      removeItem: (id, quantity = 1) =>
        set((state) => {
          const stringId = String(id);
          return {
            items: state.items
              .map((item) =>
                item.id === stringId
                  ? { ...item, quantity: item.quantity - quantity }
                  : item
              )
              .filter((item) => item.quantity > 0),
          };
        }),

      removeAll: (id) =>
        set((state) => {
          const stringId = String(id);
          return { items: state.items.filter((i) => i.id !== stringId) };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const stringId = String(id);
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== stringId) };
          }
          return {
            items: state.items.map((i) =>
              i.id === stringId ? { ...i, quantity } : i
            ),
          };
        }),

      clearCart: () => set(() => ({ items: [] })),

      getTotal: () => {
        const items = get().items;
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getTotalFormatted: (currency = "NGN") => {
        const totalSubunits = get().getTotal();
        const totalMain = totalSubunits / 100;
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency,
        }).format(totalMain);
      },
    }),
    {
      name: "cart_v1",
    }
  )
);
