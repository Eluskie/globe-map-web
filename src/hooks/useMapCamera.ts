import { useCallback, useRef, useState } from "react";
import type { MapRef } from "react-map-gl/mapbox";
import type { CameraPreset } from "../types/map";
import { DEFAULT_CENTER } from "../lib/mapbox";

const GLOBE_PRESET: CameraPreset = {
  center: [0, 20],
  zoom: 1.4,
  pitch: 55,
  bearing: 0,
  duration: 2500,
};

function mapPreset(center: [number, number]): CameraPreset {
  return {
    center,
    zoom: 15.1,
    pitch: 0,
    bearing: 0,
    duration: 2400,
  };
}

export function useMapCamera() {
  const mapRef = useRef<MapRef>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const flyTo = useCallback((preset: CameraPreset) => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    setIsAnimating(true);
    map.flyTo({
      center: preset.center,
      zoom: preset.zoom,
      pitch: preset.pitch,
      bearing: preset.bearing,
      duration: preset.duration,
      essential: true,
    });
  }, []);

  const flyToGlobe = useCallback(() => flyTo(GLOBE_PRESET), [flyTo]);

  const flyToMap = useCallback(
    (center: [number, number] = DEFAULT_CENTER) => flyTo(mapPreset(center)),
    [flyTo]
  );

  const onMoveEnd = useCallback(() => setIsAnimating(false), []);

  return {
    mapRef,
    isAnimating,
    flyToGlobe,
    flyToMap,
    onMoveEnd,
  };
}
