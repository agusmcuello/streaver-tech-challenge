import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import UserFilter from "@/components/UserFilter";

// Props types
interface PostsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  // Await params
  const params = await searchParams;
  const userId = params.userId ? parseInt(params.userId as string) : undefined;

  // Fetch post
  const posts = await prisma.post.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: true,
    },
  });

  // Fetch users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog Posts</h1>
        <UserFilter users={users} />
      </header>

      <div className={styles.grid}>
        {posts.map((post) => (
          <article key={post.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardBody}>{post.body}</p>

            <div className={styles.cardFooter}>
              <span>
                By <strong>{post.user.username}</strong>
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
