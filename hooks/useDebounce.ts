import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Create timer
    const timer = setTimeout(
      () => {
        setDebouncedValue(value);
      },
      delay || 500 // default
    );

    // Cleanup timer to avoid overflow on unmount
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
