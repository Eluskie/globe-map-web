export type ViewMode = "map" | "globe";

export type MapTag = {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  icon?: string;
};

export type CameraPreset = {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
  duration: number;
};
