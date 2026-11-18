import { useEffect } from "react";

const SEQUENCE = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

export function useKonami(onUnlock: () => void) {
  useEffect(() => {
    let index = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      index = key === SEQUENCE[index] ? index + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (index === SEQUENCE.length) {
        index = 0;
        onUnlock();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);
}
