import { useState } from "react";
import {
  getStorageItem,
  setStorageItem,
} from "../utils/storage";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =>
    getStorageItem(key, initialValue)
  );

  function updateValue(nextValue) {
    setValue((currentValue) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? nextValue(currentValue)
          : nextValue;

      setStorageItem(key, resolvedValue);

      return resolvedValue;
    });
  }

  return [value, updateValue];
}