import { useEffect, useState } from "react";

const useDebounce = (initialValue: number | string | null, delay = 3000) => {
  const [value, setValue] = useState<number | string | null>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return { debouncedValue, setValue };
};

export default useDebounce;
