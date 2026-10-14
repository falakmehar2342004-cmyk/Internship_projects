import { useState, useEffect } from 'react'

// Yaha custom hook ha, ye value tab return karta ha jab user delay ms tak typing rok de
// Is se har key press par filter nahi chalta
export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Yaha timer start kiya ha, khatam hone par value update hogi
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    // Yaha cleanup ha, value dobara badle to purana timer cancel ho jata ha
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
