import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL_UNPOOLED!,
  }),
});

async function main() {
  console.log('🌱 Starting seed...');

  // 1️⃣ ADMIN USER
  const adminEmail = 'ts10danieltrujillo@gmail.com';

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      fullName: 'Administrador Dafa Medic',
      password: await bcrypt.hash('firstPassword123!', 10),
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Admin user ready:', admin.email);

  // 2️⃣ PRODUCTS
  const products = [
    {
      name: 'Oxímetro de Pulso Profesional',
      slug: 'oximetro-pulso-profesional',
      brand: 'Riester',
      priceCents: 18000,
      stock: 25,
      description:
        'Oxímetro confiable para medición de SpO2 y frecuencia cardíaca.',
      images: ['https://example.com/oximetro.jpg'],
      isActive: true,
    },
    {
      name: 'Glucometro Accu Check Instant',
      slug: 'glucometro-accu-check-instant',
      brand: 'Accu Check',
      priceCents: 4500,
      stock: 40,
      description:
        'Glucometro fácil de usar con resultados rápidos y precisos.',
      images: ['https://example.com/glucometro.jpg'],
      isActive: true,
    },
    {
      name: 'Estetoscopio Profesional',
      slug: 'estetoscopio-profesional',
      brand: 'Dafa Medic',
      priceCents: 32000,
      stock: 15,
      description:
        'Estetoscopio de alta sensibilidad para diagnóstico clínico.',
      images: ['https://example.com/estetoscopio.jpg'],
      isActive: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log(`✅ ${products.length} products seeded`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });