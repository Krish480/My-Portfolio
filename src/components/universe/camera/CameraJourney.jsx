import React from "react";
import ScrollStateManager from "./ScrollStateManager";
import SectionTracker from "./SectionTracker";

export default function CameraJourney({ children }) {
  return (
    <ScrollStateManager>
      <SectionTracker>
        {children}
      </SectionTracker>
    </ScrollStateManager>
  );
}
