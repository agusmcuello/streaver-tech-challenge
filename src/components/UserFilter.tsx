"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import styles from "./user-filter.module.css";
import CustomSelect from "./CustomSelect";

// Pick only necessary fields from Prisma User type
type UserOption = Pick<User, "id" | "name" | "username">;

interface UserFilterProps {
  users: UserOption[];
}

export default function UserFilter({ users }: UserFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUserId = searchParams.get("userId");

  // Filter handler
  const applyFilter = (userId: string) => {
    if (userId === "all") {
      router.push("/posts");
    } else {
      router.push(`/posts?userId=${userId}`);
    }
  };

  // Map Prisma users to CustomSelect options format
  const selectOptions = users.map((user) => ({
    value: user.id,
    label: user.name ?? "Anonymous",
    username: user.username ?? "unknown",
  }));

  return (
    <div className={styles.wrapper}>
      {/* Mobile dropdown */}
      <div className={styles.selectContainer}>
        <CustomSelect
          options={selectOptions}
          value={currentUserId || "all"}
          onChange={applyFilter}
          placeholder="All Authors"
        />
      </div>

      {/* Desktop pills */}
      <div className={styles.pillsContainer}>
        <button
          onClick={() => applyFilter("all")}
          className={`${styles.pill} ${
            currentUserId === null ? styles.active : ""
          }`}
        >
          All Authors
        </button>

        {users.map((user) => {
          const isActive = currentUserId === String(user.id);
          return (
            <button
              key={user.id}
              onClick={() => applyFilter(String(user.id))}
              className={`${styles.pill} ${isActive ? styles.active : ""}`}
            >
              {user.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
