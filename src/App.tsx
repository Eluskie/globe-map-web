import { useCallback, useRef } from "react";
import { FeedMap } from "./components/FeedMap";
import { MobileShell } from "./components/MobileShell";
import { useMapCamera } from "./hooks/useMapCamera";
import { useViewMode } from "./hooks/useViewMode";
import { DEFAULT_CENTER, MAPBOX_TOKEN } from "./lib/mapbox";
import type { ViewMode } from "./types/map";
import "./App.css";

function MissingTokenScreen() {
  return (
    <main className="setup-screen">
      <h1>Mapbox token required</h1>
      <p>
        Copy <code>.env.example</code> to <code>.env</code> and set{" "}
        <code>VITE_MAPBOX_TOKEN</code>.
      </p>
    </main>
  );
}

function App() {
  const { mode, setMode } = useViewMode("map");
  const { mapRef, isAnimating, flyToGlobe, flyToMap, onMoveEnd } = useMapCamera();
  const pendingMode = useRef<ViewMode | null>(null);

  const handleMoveEnd = useCallback(() => {
    onMoveEnd();
    if (pendingMode.current === null) return;
    setMode(pendingMode.current);
    pendingMode.current = null;
  }, [onMoveEnd, setMode]);

  const handleFeedDoubleTap = useCallback(() => {
    if (isAnimating) return;

    if (mode === "map") {
      pendingMode.current = "globe";
      flyToGlobe();
      return;
    }

    pendingMode.current = "map";
    flyToMap(DEFAULT_CENTER);
  }, [flyToGlobe, flyToMap, isAnimating, mode]);

  if (!MAPBOX_TOKEN) {
    return <MissingTokenScreen />;
  }

  return (
    <div className="app">
      <MobileShell
        mode={mode}
        feedDisabled={isAnimating}
        onFeedDoubleTap={handleFeedDoubleTap}
      >
        <FeedMap
          mode={mode}
          isAnimating={isAnimating}
          mapRef={mapRef}
          onMoveEnd={handleMoveEnd}
        />
      </MobileShell>
    </div>
  );
}

export default App;
