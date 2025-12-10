"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import styles from "./user-filter.module.css";

// Pick for id and name
type UserOption = Pick<User, "id" | "name">;

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
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === "all") {
      router.push("/posts");
    } else {
      router.replace(`/posts?userId=${selectedValue}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Mobile dropdown */}
      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          onChange={handleSelectChange}
          value={currentUserId || "all"}
        >
          <option value="all"> All </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop pills */}
      <div className={styles.pillsContainer}>
        <button
          onClick={() => handleFilterClick("all")}
          className={`${styles.pill} ${
            currentUserId === null ? styles.active : ""
          }`}
        >
          All
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
