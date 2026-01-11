'use client';

import { useCartStore } from '@/lib/store/CartStore';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();

  const totalPrice = getTotalPrice();
  const totalPriceInSoles = (totalPrice / 100).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-gray-600 mb-8">
            Agrega algunos productos antes de proceder al checkout.
          </p>
          <Link
            href="/productos"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
          >
            Explorar Tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Lista de items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg bg-white p-4 shadow hover:shadow-md transition-shadow"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg object-cover bg-gray-200"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-semibold">{item.brand}</p>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    S/ {(item.priceCents / 100).toFixed(2)} c/u
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="rounded-lg bg-gray-200 px-3 py-1 hover:bg-gray-300 font-bold transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-12 border border-gray-300 rounded-lg text-center"
                    />
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="rounded-lg bg-gray-200 px-3 py-1 hover:bg-gray-300 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between">
                  <p className="font-bold text-gray-900">
                    S/ {((item.priceCents * item.quantity) / 100).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-600 hover:text-red-800 font-semibold"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="rounded-lg bg-white p-6 shadow h-fit sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen del Pedido</h2>

            <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>S/ {totalPriceInSoles}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600 font-semibold">Gratis</span>
              </div>
            </div>

            <div className="mb-6 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-blue-600">S/ {totalPriceInSoles}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center rounded-lg bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 transition-colors mb-3"
            >
              ✅ Proceder al Pago
            </Link>

            <button
              onClick={clearCart}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors mb-3"
            >
              Vaciar Carrito
            </button>

            <Link
              href="/productos"
              className="block w-full text-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}