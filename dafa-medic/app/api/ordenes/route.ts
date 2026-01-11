import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface OrderItemInput {
  productId: string;
  quantity: number;
  priceCents: number;
}

interface CreateOrderItemData {
  name: string;
  unitCents: number;
  quantity: number;
  productId: string;
}

export async function POST(request: Request) {
  try {
    const {
      userEmail,
      userFullName,
      userPhone,
      shippingAddress,
      shippingCity,
      shippingPostalCode,
      items,
      totalCents,
    } = await request.json();

    // Validar datos
    if (!userEmail || !userFullName || !items.length) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }

    // Calcular subtotal y shipping
    let subtotalCents = 0;
    const orderItems: CreateOrderItemData[] = [];

    // Verificar stock y preparar items
    for (const item of items as OrderItemInput[]) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${product?.name || 'producto'}` },
          { status: 400 }
        );
      }

      subtotalCents += item.priceCents * item.quantity;
      orderItems.push({
        name: product.name,
        unitCents: item.priceCents,
        quantity: item.quantity,
        productId: item.productId,
      });
    }

    const shippingCents = 0; // Envío gratis
    const finalTotalCents = subtotalCents + shippingCents;

    // Crear orden dentro de una transacción
    const order = await prisma.$transaction(async (tx) => {
      // Crear orden
      const newOrder = await tx.order.create({
        data: {
          email: userEmail,
          fullName: userFullName,
          phone: userPhone || null,
          address: shippingAddress,
          district: shippingCity,
          subtotalCents,
          shippingCents,
          totalCents: finalTotalCents,
          status: 'PENDING_PAYMENT',
          items: {
            create: orderItems,
          },
        },
        include: { items: true },
      });

      // Actualizar stock
      for (const item of items as OrderItemInput[]) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    return NextResponse.json(
      {
        orderId: order.id,
        email: order.email,
        totalCents: order.totalCents,
        status: order.status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Error al crear la orden' },
      { status: 500 }
    );
  }
}