import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function ensureAdmin() {
  const existing = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL || "davidimanishimwe29@gmail.com" },
  });

  if (!existing) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@54321", 10);

    await prisma.user.create({
      data: {
        name: "Administrator",
        username: process.env.ADMIN_USERNAME || "Admin",
        email: process.env.ADMIN_EMAIL || "davidimanishimwe29@gmail.com",
        phone: "+250700000000",
        passwordHash,
        isAdmin: true,
        role: "ADMIN",
      },
    });
  }
}

async function seedPosts() {
  const users = await prisma.user.findMany({
    take: 3,
  });

  if (users.length === 0) return;

  const count = await prisma.post.count();
  if (count > 0) return;

  for (const user of users) {
    await prisma.post.create({
      data: {
        authorId: user.id,
        content: `Welcome to ClassConnect, ${user.name}! Keep sharing and stay connected with your classmates.`,
      },
    });
  }
}

async function main() {
  await ensureAdmin();
  await seedPosts();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
