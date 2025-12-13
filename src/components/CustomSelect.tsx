"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./custom-select.module.css";

interface Option {
  value: number | string;
  label: string;
  username: string;
}

interface CustomSelectProps {
  options: Option[];
  value: number | string | null;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "All Authors",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    onChange(String(optionValue));
    setIsOpen(false);
  };

  // Find selected option label
  const selectedLabel = options.find(
    (opt) => String(opt.value) === String(value)
  )?.label;

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-label="Filter by author"
      >
        <span>{selectedLabel || placeholder}</span>
        {/* Arrow Icon */}
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.optionsList} role="listbox">
          {/* Default Option */}
          <li
            className={`${styles.option} ${
              value === "all" || value === null ? styles.selected : ""
            }`}
            onClick={() => handleSelect("all")}
            role="option"
            aria-selected={value === "all" || value === null}
          >
            {placeholder}
          </li>

          {/* User Options */}
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                String(value) === String(option.value) ? styles.selected : ""
              }`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={String(value) === String(option.value)}
            >
              {option.label} ({option.username})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
