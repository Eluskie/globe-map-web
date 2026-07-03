import { memo, type CSSProperties } from "react";
import type { FeedPin } from "../types/content";
import "./EventMarker.css";

type EventMarkerProps = {
  pin: FeedPin;
};

export const EventMarker = memo(function EventMarker({ pin }: EventMarkerProps) {
  return (
    <div className="event-marker" style={{ "--accent": pin.accent } as CSSProperties}>
      <div className="event-marker__bubble">
        <strong>{pin.title}</strong>
        {pin.subtitle ? <span>{pin.subtitle}</span> : null}
      </div>
      <div className="event-marker__pin" />
      <div className="event-marker__tail" />
    </div>
  );
});
