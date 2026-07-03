import type { ViewMode } from "../types/map";

type ViewToggleButtonProps = {
  mode: ViewMode;
  disabled?: boolean;
  onClick: () => void;
};

export function ViewToggleButton({ mode, disabled, onClick }: ViewToggleButtonProps) {
  const label = mode === "map" ? "Zoom to globe" : "Back to map";

  return (
    <button
      type="button"
      className="view-toggle"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {label}
    </button>
  );
}
