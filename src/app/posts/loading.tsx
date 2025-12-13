import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.skeletonPulse} ${styles.titleSkeleton}`} />
        <div className={styles.pillsContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
            <div
              key={i}
              className={`${styles.skeletonPulse} ${styles.pillSkeleton}`}
            />
          ))}
        </div>
      </div>

      {/* Grid section */}
      <div className={styles.grid}>
        {/* Cards skeleton */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`${styles.skeletonPulse} ${styles.cardSkeleton}`}
          >
            {/* Title */}
            <div
              className={`${styles.skeletonPulse} ${styles.textLine} ${styles.textLineShort}`}
            />

            {/* Body */}
            <div className={`${styles.skeletonPulse} ${styles.textLine}`} />
            <div className={`${styles.skeletonPulse} ${styles.textLine}`} />
            <div
              className={`${styles.skeletonPulse} ${styles.textLine} ${styles.textLineShort}`}
            />
            <div className={`${styles.skeletonPulse} ${styles.footerLine}`} />
          </div>
        ))}
      </div>
    </main>
  );
}
