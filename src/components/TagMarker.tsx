import type { MapTag } from "../types/map";

type TagMarkerProps = {
  tag: MapTag;
  onClick: (tag: MapTag) => void;
};

export function TagMarker({ tag, onClick }: TagMarkerProps) {
  return (
    <button
      type="button"
      className="tag-marker"
      title={tag.name}
      aria-label={`Zoom to ${tag.name}`}
      onClick={(event) => {
        event.stopPropagation();
        onClick(tag);
      }}
    >
      <span className="tag-marker__icon">{tag.icon ?? "📍"}</span>
      <span className="tag-marker__label">{tag.name}</span>
    </button>
  );
}
