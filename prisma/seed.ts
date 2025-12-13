/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Strict typing
interface JsonUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface JsonPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function main() {
  console.log("Start seeding...");

  // Clean existing data
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Users fetch
  const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersData = (await usersRes.json()) as JsonUser[];

  const users = usersData.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  }));

  await prisma.user.createMany({
    data: users,
  });

  // Posts fetch
  const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");
  const postsData = (await postsRes.json()) as JsonPost[];

  const posts = postsData.map((post) => ({
    id: post.id,
    title: post.title,
    body: post.body,
    userId: post.userId,
  }));

  await prisma.post.createMany({
    data: posts,
  });

  console.log("Seeding finished.");
}

// Execute
main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
