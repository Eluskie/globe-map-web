/// <reference types="vite/client" />

interface Window {
  __ENV__?: {
    VITE_MAPBOX_TOKEN?: string;
  };
}
