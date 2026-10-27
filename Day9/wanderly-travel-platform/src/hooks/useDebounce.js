import { useEffect, useState } from "react";

// Value tab update hoti hai jab user kuch der typing rok de.
export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nayi typing par purana timeout cancel ho jata hai.
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}