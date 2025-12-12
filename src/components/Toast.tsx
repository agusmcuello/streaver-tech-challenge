"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./toast.module.css";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Closing function
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`
        ${styles.container} 
        ${type === "success" ? styles.success : styles.error}
        ${isClosing ? styles.closing : ""} 
      `}
    >
      <span>{type === "success" ? "✅" : "❌"}</span>
      <span>{message}</span>

      <button
        onClick={handleClose}
        className={styles.closeBtn}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>,
    document.body
  );
}
