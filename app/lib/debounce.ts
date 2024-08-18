type Procedure = (...args: any[]) => void;

export function debounce<T extends Procedure>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
