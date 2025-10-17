import { useState } from 'react';

// Toggle hook - simple boolean state with toggle function
export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  // Toggle function to flip the boolean value
  const toggle = () => setValue(prev => !prev);

  // Set function to set specific value
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, toggle, setTrue, setFalse] as const;
}