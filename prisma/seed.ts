import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Fetch users
  const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersData = await usersRes.json();

  // Map API response to match Prisma schema, filtering out unused fields
  const users = usersData.map((user: any) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  }));

  // Insert users
  await prisma.user.createMany({
    data: users,
  });

  // Fetch Posts
  const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");
  const postsData = await postsRes.json();

  // Map posts and link them via userId
  const posts = postsData.map((post: any) => ({
    id: post.id,
    title: post.title,
    body: post.body,
    userId: post.userId, // La clave foránea que conecta con el usuario
  }));

  // Insert Posts
  await prisma.post.createMany({
    data: posts,
  });
}

// Execute the seed function
(async () => {
  try {
    await main();
    await prisma.$disconnect();
  } catch (e) {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
