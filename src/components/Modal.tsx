"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

export default function Modal({ isOpen, onClose, title, children }: any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            &times;
          </button>
        </div>
        {/* Content */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
