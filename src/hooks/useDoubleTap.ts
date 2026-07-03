import { useCallback, useRef } from "react";

export function useDoubleTap(onDoubleTap: () => void, delayMs = 320) {
  const lastTapRef = useRef(0);

  return useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current <= delayMs) {
      lastTapRef.current = 0;
      onDoubleTap();
      return;
    }

    lastTapRef.current = now;
  }, [delayMs, onDoubleTap]);
}
