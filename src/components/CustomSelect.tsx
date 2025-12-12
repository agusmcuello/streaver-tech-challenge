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
  placeholder = "All",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const selectedLabel = options.find(
    (opt) => String(opt.value) === String(value)
  )?.label;

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel || placeholder}</span>
        {/* Arrow SVG  */}
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
        <ul className={styles.optionsList}>
          {/* Reset */}
          <li
            className={`${styles.option} ${
              value === "all" || value === null ? styles.selected : ""
            }`}
            onClick={() => handleSelect("all")}
          >
            {placeholder}
          </li>

          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                String(value) === String(option.value) ? styles.selected : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label} ({option.username})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
