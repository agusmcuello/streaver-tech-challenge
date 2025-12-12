import { prisma } from "@/lib/prisma";
import styles from "./page.module.css";
import UserFilter from "@/components/UserFilter";
import PostsGrid from "@/components/PostsGrid";

interface PostsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const userId = params.userId ? parseInt(params.userId as string) : undefined;

  // 1. Fetch Posts
  const posts = await prisma.post.findMany({
    where: { userId: userId },
    include: { user: true },
  });

  // 2. Fetch Users (para el filtro)
  const users = await prisma.user.findMany({
    select: { id: true, name: true, username: true },
  });

  const hasPosts = posts.length > 0;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog Posts</h1>
        <UserFilter users={users} />
      </header>

      {!hasPosts ? (
        <div className={styles.emptyContainer}>
          <span className={styles.emptyIcon}>📭</span>
          <h3 className={styles.emptyTitle}>No posts found</h3>
          <p>Try selecting a different author or clearing the filter.</p>
        </div>
      ) : (
        <PostsGrid posts={posts} gridKey={userId ?? "all"} />
      )}
    </main>
  );
}
