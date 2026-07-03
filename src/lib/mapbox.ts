export const MAPBOX_TOKEN = getMapboxToken();

/** Single light style for both local and globe views — avoids costly style reloads on transition. */
export const MAP_STYLE = "mapbox://styles/mapbox/light-v11";

/** @deprecated Use MAP_STYLE — kept for any external references */
export const STREET_MAP_STYLE = MAP_STYLE;
export const GLOBE_MAP_STYLE = MAP_STYLE;

/** Uhlandstraße / Spichernstraße, Berlin-Schöneberg */
export const DEFAULT_CENTER: [number, number] = [13.3278, 52.4992];

function getMapboxToken(): string | undefined {
  const runtimeToken = window.__ENV__?.VITE_MAPBOX_TOKEN?.trim();
  if (runtimeToken) return runtimeToken;

  const buildToken = import.meta.env.VITE_MAPBOX_TOKEN?.trim();
  return buildToken || undefined;
}

export function requireMapboxToken(): string {
  if (!MAPBOX_TOKEN) {
    throw new Error(
      "Missing VITE_MAPBOX_TOKEN. Set it in Dokploy environment variables (runtime) or .env for local dev."
    );
  }
  return MAPBOX_TOKEN;
}
