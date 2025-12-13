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
  // Prevent SSR hydration errors
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Closing function
  const handleManualClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  // Auto-dismiss timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => onClose(), 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

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
        onClick={handleManualClose}
        className={styles.closeBtn}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>,
    document.body
  );
}
