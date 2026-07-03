import type { MapTag } from "../types/map";

type TagDetailCardProps = {
  tag: MapTag;
  onClose: () => void;
};

export function TagDetailCard({ tag, onClose }: TagDetailCardProps) {
  return (
    <div className="tag-card" role="dialog" aria-label={tag.name}>
      <button type="button" className="tag-card__close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <p className="tag-card__eyebrow">{tag.icon ?? "📍"} Tag</p>
      <h2 className="tag-card__title">{tag.name}</h2>
      <p className="tag-card__description">{tag.description}</p>
    </div>
  );
}
