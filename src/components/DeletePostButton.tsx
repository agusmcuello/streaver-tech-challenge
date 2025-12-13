"use client";

import { useState, useTransition } from "react";
import { deletePost } from "@/actions/post";
import Modal from "./ui/Modal";
import styles from "./delete-post.module.css";

interface DeletePostButtonProps {
  postId: number;
  onDeleteSuccess: () => void; // Callback to father component
  onDeleteError: (msg: string) => void;
}

export default function DeletePostButton({
  postId,
  onDeleteSuccess,
  onDeleteError,
}: DeletePostButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deletePost(postId);

      if (result.success) {
        setIsOpen(false);
        onDeleteSuccess();
      } else {
        onDeleteError(result.message || "Failed to delete");
      }
    });
  };

  return (
    <>
      <button
        className={styles.deleteBtn}
        onClick={() => setIsOpen(true)}
        aria-label="Delete post"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Deletion"
      >
        <p className={styles.confirmText}>
          Are you sure you want to delete this post? <br />
          This action cannot be undone.
        </p>
        <div className={styles.actions}>
          <button
            className={styles.btnCancel}
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            className={styles.btnConfirm}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
}
