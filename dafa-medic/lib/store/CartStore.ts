import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Basado en tu modelo:
 * - Product: id, name, slug, description, image, priceCents, currency, stock, isActive...
 * - OrderItem: name (snapshot), unitCents (snapshot), quantity
 *
 * En el carrito guardamos snapshot mínimo para luego construir Order + OrderItems.
 */

export type CartLine = {
  productId: string;

  // snapshot (como OrderItem)
  name: string;
  slug?: string;
  imageUrl?: string;
  unitCents: number; // precio unitario en centavos (snapshot)
  currency: string; // ej: "PEN"

  quantity: number;
};

type CartState = {
  items: CartLine[];

  // (opcional) si más adelante quieres calcular total con envío
  shippingCents: number;

  // selectors/derived
  totalItems: () => number;
  subtotalCents: () => number;
  totalCents: () => number;

  // helpers
  getItem: (productId: string) => CartLine | undefined;
  hasItem: (productId: string) => boolean;

  // actions
  addItem: (
    product: {
      id: string;
      name: string;
      slug?: string;
      imageUrl?: string;
      priceCents: number;
      currency?: string;
      isActive?: boolean;
      stock?: number | null;
    },
    qty?: number
  ) => void;

  removeItem: (productId: string) => void;
  increase: (productId: string, step?: number) => void;
  decrease: (productId: string, step?: number) => void;
  setQuantity: (productId: string, qty: number) => void;

  setShippingCents: (cents: number) => void;
  clear: () => void;
};

/**
 * SSR-safe storage:
 * - En Next.js, localStorage no existe en server.
 */
const storage =
  typeof window === "undefined"
    ? undefined
    : createJSONStorage(() => localStorage);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      shippingCents: 0,

      totalItems: () => get().items.reduce((acc, it) => acc + it.quantity, 0),

      subtotalCents: () =>
        get().items.reduce((acc, it) => acc + it.unitCents * it.quantity, 0),

      totalCents: () => get().subtotalCents() + get().shippingCents,

      getItem: (productId) =>
        get().items.find((it) => it.productId === productId),

      hasItem: (productId) =>
        get().items.some((it) => it.productId === productId),

      addItem: (product, qty = 1) => {
        const safeQty = Math.max(1, Math.floor(qty));

        // Si tu producto se maneja con isActive/stock, acá puedes bloquear
        if (product.isActive === false) return;
        if (typeof product.stock === "number" && product.stock <= 0) return;

        set((state) => {
          const existing = state.items.find(
            (it) => it.productId === product.id
          );

          // snapshot del precio/nombre al agregar
          const snapshot: Omit<CartLine, "quantity"> = {
            productId: product.id,
            name: product.name,
            slug: product.slug,
            imageUrl: product.imageUrl,
            unitCents: product.priceCents,
            currency: product.currency ?? "PEN",
          };

          if (existing) {
            // Si hay stock, opcionalmente limita la cantidad máxima
            let nextQty = existing.quantity + safeQty;
            if (typeof product.stock === "number") {
              nextQty = Math.min(nextQty, product.stock);
            }

            return {
              items: state.items.map((it) =>
                it.productId === product.id
                  ? { ...it, ...snapshot, quantity: nextQty }
                  : it
              ),
            };
          }

          return {
            items: [...state.items, { ...snapshot, quantity: safeQty }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((it) => it.productId !== productId),
        }));
      },

      increase: (productId, step = 1) => {
        const s = Math.max(1, Math.floor(step));
        set((state) => ({
          items: state.items.map((it) =>
            it.productId === productId
              ? { ...it, quantity: it.quantity + s }
              : it
          ),
        }));
      },

      decrease: (productId, step = 1) => {
        const s = Math.max(1, Math.floor(step));
        set((state) => ({
          items: state.items
            .map((it) =>
              it.productId === productId
                ? { ...it, quantity: it.quantity - s }
                : it
            )
            .filter((it) => it.quantity > 0),
        }));
      },

      setQuantity: (productId, qty) => {
        const safeQty = Math.max(0, Math.floor(qty));

        set((state) => ({
          items:
            safeQty === 0
              ? state.items.filter((it) => it.productId !== productId)
              : state.items.map((it) =>
                  it.productId === productId ? { ...it, quantity: safeQty } : it
                ),
        }));
      },

      setShippingCents: (cents) => {
        const safe = Math.max(0, Math.floor(cents));
        set({ shippingCents: safe });
      },

      clear: () => set({ items: [], shippingCents: 0 }),
    }),
    {
      name: "dafamedic-cart",
      storage, // SSR-safe
      partialize: (state) => ({
        items: state.items,
        shippingCents: state.shippingCents,
      }),
      version: 1,
    }
  )
);

/** Util opcional para formatear centavos a moneda */
export function formatMoney(cents: number, currency = "PEN") {
  const amount = cents / 100;
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency,
  }).format(amount);
}
