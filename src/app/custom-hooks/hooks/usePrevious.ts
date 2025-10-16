import { useRef, useEffect } from 'react';

// Previous value hook - returns the previous value of a variable
export function usePrevious(value: any): any {
  // useRef to store the previous value
  const ref = useRef(value);

  // Update ref.current to the current value in useEffect
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return previous value (happens before update in useEffect)
  return ref.current;
}