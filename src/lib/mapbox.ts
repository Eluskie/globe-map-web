export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

/** Single light style for both local and globe views — avoids costly style reloads on transition. */
export const MAP_STYLE = "mapbox://styles/mapbox/light-v11";

/** @deprecated Use MAP_STYLE — kept for any external references */
export const STREET_MAP_STYLE = MAP_STYLE;
export const GLOBE_MAP_STYLE = MAP_STYLE;

/** Uhlandstraße / Spichernstraße, Berlin-Schöneberg */
export const DEFAULT_CENTER: [number, number] = [13.3278, 52.4992];

export function requireMapboxToken(): string {
  if (!MAPBOX_TOKEN) {
    throw new Error(
      "Missing VITE_MAPBOX_TOKEN. Copy .env.example to .env and add your Mapbox public token."
    );
  }
  return MAPBOX_TOKEN;
}
