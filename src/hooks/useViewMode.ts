import { useCallback, useState } from "react";
import type { ViewMode } from "../types/map";

export function useViewMode(initial: ViewMode = "map") {
  const [mode, setMode] = useState<ViewMode>(initial);

  const toggleMode = useCallback(() => {
    setMode((current) => (current === "map" ? "globe" : "map"));
  }, []);

  return { mode, setMode, toggleMode };
}
