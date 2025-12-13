"use client";

import { useState } from "react";
import styles from "./posts-grid.module.css";
import DeletePostButton from "./DeletePostButton";
import Toast from "./Toast";

type PostWithUser = {
  id: number;
  title: string;
  body: string;
  user: {
    name: string | null;
    username: string | null;
  };
};

export default function PostsGrid({
  posts,
  gridKey,
}: {
  posts: PostWithUser[];
  gridKey: string | number;
}) {
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  return (
    <>
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Posts Grid */}
      <div key={gridKey} className={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.cardWrapper}>
            <article className={styles.card}>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardBody}>{post.body}</p>
              <div className={styles.cardFooter}>
                <span>
                  By {post.user.name ?? "Anonymous"} |{" "}
                  <strong>@{post.user.username ?? "unknown"}</strong>
                </span>

                <DeletePostButton
                  postId={post.id}
                  onDeleteSuccess={() =>
                    setToast({
                      msg: "Post deleted successfully",
                      type: "success",
                    })
                  }
                  onDeleteError={(msg) => setToast({ msg, type: "error" })}
                />
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
}
