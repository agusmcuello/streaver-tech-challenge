"use client";

import styles from "./error.module.css";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Something went wrong</h2>
        <p className={styles.message}>
          We encountered an issue loading the posts. Please check your
          connection and try again.
        </p>
        <button onClick={() => reset()} className={styles.retryBtn}>
          Try Again
        </button>
      </div>
    </div>
  );
}
