import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password', 10);

  // Manager
  const manager = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      email: 'manager@example.com',
      password,
      role: 'MANAGER',
    },
  });

  // Store Keeper
  const storeKeeper = await prisma.user.upsert({
    where: { email: 'keeper@example.com' },
    update: {},
    create: {
      email: 'keeper@example.com',
      password,
      role: 'STORE_KEEPER',
    },
  });

  // Seed some products
  const products = [
    { name: 'Red T-Shirt', price: 19.99, stock: 100 },
    { name: 'Blue Jeans', price: 49.99, stock: 50 },
    { name: 'Running Shoes', price: 89.99, stock: 75 },
    { name: 'Winter Jacket', price: 120.0, stock: 3 }, // Low stock
    { name: 'Black Socks', price: 5.99, stock: 0 }, // Out of stock
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log({ manager, storeKeeper });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
