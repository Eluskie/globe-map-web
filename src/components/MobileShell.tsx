import { useState, type ReactNode } from "react";
import type { ViewMode } from "../types/map";
import { useDoubleTap } from "../hooks/useDoubleTap";
import "./MobileShell.css";

type MobileShellProps = {
  mode: ViewMode;
  feedDisabled?: boolean;
  onFeedDoubleTap: () => void;
  children: ReactNode;
};

function StatusBar() {
  return (
    <div className="mobile-shell__status-bar" aria-hidden="true">
      <span className="mobile-shell__time">9:41</span>
      <div className="mobile-shell__status-icons">
        <svg viewBox="0 0 18 12" className="mobile-shell__signal">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
          <rect x="10" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 16 12" className="mobile-shell__wifi">
          <path
            d="M8 11.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM3.2 7.4a6.4 6.4 0 0 1 9.6 0l-1.2 1.2a4.8 4.8 0 0 0-7.2 0L3.2 7.4Zm-2.4-2.4a10 10 0 0 1 14.4 0l-1.2 1.2a8.4 8.4 0 0 0-12 0L.8 5Z"
            fill="currentColor"
          />
        </svg>
        <svg viewBox="0 0 27 13" className="mobile-shell__battery">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="currentColor" fill="none" />
          <rect x="2.5" y="2.5" width="17" height="8" rx="1.5" fill="currentColor" />
          <rect x="24" y="4" width="2.5" height="5" rx="1" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function MapOverlays({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="mobile-shell__overlays" aria-hidden="true">
      <div className="mobile-shell__brand-mark">S</div>
      <div className="mobile-shell__avatar" />
    </div>
  );
}

function BottomNav({
  feedDisabled,
  onFeedDoubleTap,
}: {
  feedDisabled?: boolean;
  onFeedDoubleTap: () => void;
}) {
  const [showFeedHint, setShowFeedHint] = useState(true);

  const handleFeedDoubleTap = () => {
    setShowFeedHint(false);
    onFeedDoubleTap();
  };

  const handleFeedTap = useDoubleTap(handleFeedDoubleTap);

  return (
    <nav className="mobile-shell__nav" aria-label="Main navigation">
      <div className="mobile-shell__feed-wrap">
        {showFeedHint ? (
          <p id="feed-hint" className="mobile-shell__feed-hint" role="tooltip">
            Double tap Feed to toggle between plans with friends and games or mini apps
          </p>
        ) : null}
        <button
          type="button"
          className="mobile-shell__nav-item mobile-shell__nav-item--active"
          onClick={handleFeedTap}
          disabled={feedDisabled}
          aria-label="Feed. Double tap to toggle between plans with friends and games or mini apps."
          aria-describedby={showFeedHint ? "feed-hint" : undefined}
        >
          <span className="mobile-shell__nav-icon mobile-shell__nav-icon--feed">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 19v-8.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 20.5V13h5v7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span>Feed</span>
        </button>
      </div>

      <button type="button" className="mobile-shell__nav-item" aria-label="Explore" tabIndex={-1}>
        <span className="mobile-shell__nav-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 7.5 12 4l7 3.5v9L12 20l-7-3.5v-9Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M12 4v16M5 7.5 12 11l7-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
        <span>Explore</span>
      </button>

      <button type="button" className="mobile-shell__nav-item" aria-label="Plan" tabIndex={-1}>
        <span className="mobile-shell__nav-icon mobile-shell__nav-icon--plan">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span>Plan</span>
      </button>

      <button type="button" className="mobile-shell__nav-item" aria-label="Network" tabIndex={-1}>
        <span className="mobile-shell__nav-icon mobile-shell__nav-icon--network">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="9" cy="10" r="1" fill="currentColor" />
            <circle cx="15" cy="10" r="1" fill="currentColor" />
            <path
              d="M9 15c.8 1 1.7 1.5 3 1.5s2.2-.5 3-1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <span className="mobile-shell__badge">1</span>
        </span>
        <span>Network</span>
      </button>

      <div className="mobile-shell__home-indicator" />
    </nav>
  );
}

export function MobileShell({
  mode,
  feedDisabled,
  onFeedDoubleTap,
  children,
}: MobileShellProps) {
  return (
    <div className="mobile-shell-stage">
      <div className="mobile-shell">
        <StatusBar />
        <div className="mobile-shell__map">{children}</div>
        <MapOverlays visible={mode === "map"} />
        <BottomNav feedDisabled={feedDisabled} onFeedDoubleTap={onFeedDoubleTap} />
      </div>
    </div>
  );
}
