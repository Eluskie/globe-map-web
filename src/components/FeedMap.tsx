import { memo, useMemo } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { BERLIN_EVENTS } from "../data/berlinEvents";
import { GLOBE_GAMES } from "../data/globeGames";
import { DEFAULT_CENTER, MAP_STYLE, requireMapboxToken } from "../lib/mapbox";
import type { ViewMode } from "../types/map";
import { EventMarker } from "./EventMarker";
import type { useMapCamera } from "../hooks/useMapCamera";

type FeedMapProps = {
  mode: ViewMode;
  isAnimating: boolean;
  mapRef: ReturnType<typeof useMapCamera>["mapRef"];
  onMoveEnd: () => void;
};

const INITIAL_VIEW = {
  longitude: DEFAULT_CENTER[0],
  latitude: DEFAULT_CENTER[1],
  zoom: 15.1,
  pitch: 0,
  bearing: 0,
} as const;

const GLOBE_FOG = {
  range: [0.5, 10] as [number, number],
  color: "#f0f4f8",
  "high-color": "#cce0f5",
  "horizon-blend": 0.08,
};

export const FeedMap = memo(function FeedMap({
  mode,
  isAnimating,
  mapRef,
  onMoveEnd,
}: FeedMapProps) {
  const token = requireMapboxToken();
  const isGlobe = mode === "globe";
  const pins = useMemo(
    () => (isGlobe ? GLOBE_GAMES : BERLIN_EVENTS),
    [isGlobe]
  );
  const showMarkers = !isAnimating;
  const canInteract = !isAnimating;

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={token}
      initialViewState={INITIAL_VIEW}
      style={{ width: "100%", height: "100%" }}
      mapStyle={MAP_STYLE}
      projection="globe"
      reuseMaps
      renderWorldCopies={false}
      fog={isGlobe ? GLOBE_FOG : undefined}
      onMoveEnd={onMoveEnd}
      scrollZoom={false}
      dragPan={canInteract}
      dragRotate={canInteract && isGlobe}
      pitchWithRotate={false}
      touchPitch={false}
      doubleClickZoom={false}
      touchZoomRotate={false}
    >
      {showMarkers
        ? pins.map((pin) => (
            <Marker
              key={pin.id}
              longitude={pin.coordinates[0]}
              latitude={pin.coordinates[1]}
              anchor="bottom"
            >
              <EventMarker pin={pin} />
            </Marker>
          ))
        : null}
    </Map>
  );
});
