'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  name: string;
  unitCents: number;
}

interface Order {
  id: string;
  email: string;
  fullName: string;
  totalCents: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderConfirmedPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/ordenes/${orderId}`);
        if (!response.ok) throw new Error('Error al cargar orden');
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando pedido...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">❌ {error || 'Error al cargar el pedido'}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = (order.totalCents / 100).toFixed(2);
  const statusLabel = {
    PENDING_PAYMENT: '⏳ Pendiente de Pago',
    PAID: '✅ Pagado',
    PREPARING: '📦 Preparando',
    SHIPPED: '🚚 Enviado',
    DELIVERED: '🎉 Entregado',
    CANCELED: '❌ Cancelado',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          {/* Icono de éxito */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-gray-600 text-lg">
              Gracias por tu compra. Recibirás un email de confirmación en breve.
            </p>
          </div>

          {/* Detalles del pedido */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">ID del Pedido</p>
                <p className="text-lg font-bold text-gray-900">{order.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Estado</p>
                <p className="text-lg font-bold">
                  {statusLabel[order.status as keyof typeof statusLabel] || order.status}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Correo</p>
                <p className="text-sm font-semibold text-gray-900">{order.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Total</p>
                <p className="text-lg font-bold text-blue-600">S/ {totalPrice}</p>
              </div>
            </div>

            {/* Artículos pedidos */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-semibold text-gray-600 mb-4">Artículos:</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      S/ {((item.unitCents * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900">
              <strong>📧 Información:</strong> Se enviará un email a <strong>{order.email}</strong> con los detalles del pedido y el seguimiento del envío.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <Link
              href="/productos"
              className="block w-full text-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Seguir Comprando
            </Link>
            <Link
              href="/"
              className="block w-full text-center rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}