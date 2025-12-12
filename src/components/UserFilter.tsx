"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import styles from "./user-filter.module.css";
import CustomSelect from "./CustomSelect";

// Pick for id and name
type UserOption = Pick<User, "id" | "name" | "username">;

interface UserFilterProps {
  users: UserOption[];
}

export default function UserFilter({ users }: UserFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUserId = searchParams.get("userId");

  // Desktop pills handler
  const handleFilterClick = (userId: number | "all") => {
    if (userId === "all") {
      router.push("/posts");
    } else {
      router.replace(`/posts?userId=${userId}`);
    }
  };

  // Mobile dropdown handler
  const handleSelectChange = (value: string) => {
    if (value === "all") {
      router.push("/posts");
    } else {
      router.replace(`/posts?userId=${value}`);
    }
  };

  const selectOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
    username: user.username,
  }));

  return (
    <div className={styles.wrapper}>
      {/* Mobile dropdown */}
      <div className={styles.selectContainer}>
        <CustomSelect
          options={selectOptions}
          value={currentUserId || "all"}
          onChange={handleSelectChange}
          placeholder="All Authors"
        />
      </div>

      {/* Desktop pills */}
      <div className={styles.pillsContainer}>
        <button
          onClick={() => handleFilterClick("all")}
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
              onClick={() => handleFilterClick(user.id)}
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
