import { useState } from "react";

// Generic localStorage hook with SSR safety
export function useLocalStorage(key: string, initialValue: any) {
  // Get stored value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    // 1. apakah dia punya window
    if (typeof window === "undefined") {
      return initialValue;
    }
    // 2. kita akses localstorage melalui si window
    try {
      const item = window.localStorage.getItem(key);
      // semua data masuk ke localstorage harus dalam bentuk JSON
      // makanya kalau datanya adalah object biasa, harus dibuat menjadi json
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function to update stored value
  const setValue = (value: any | ((val: any) => any)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      // Save to localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
