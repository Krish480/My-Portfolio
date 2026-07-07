import React, { useState, useEffect, useRef } from "react";
import useUniverse from "../hooks/useUniverse";
import { getRandomTrajectory } from "./ShootingStarManager";
import Comet from "./Comet";

export default function ShootingStars() {
  const { quality } = useUniverse();
  const [activeComets, setActiveComets] = useState([]);
  const timerRef = useRef();

  useEffect(() => {
    if (quality === "low") return;

    function triggerNext() {
      const trajectory = getRandomTrajectory();
      const id = Math.random().toString(36).substring(2, 9);

      setActiveComets((prev) => [...prev, { id, trajectory }]);

      // Queue next shooting star: random delay between 15 and 40 seconds
      const delay = (Math.random() * 25 + 15) * 1000;
      timerRef.current = setTimeout(triggerNext, delay);
    }

    // Set initial delayed spawn of first shooting star
    timerRef.current = setTimeout(triggerNext, 12000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [quality]);

  const handleComplete = (id) => {
    setActiveComets((prev) => prev.filter((comet) => comet.id !== id));
  };

  if (quality === "low") {
    return null;
  }

  return (
    <>
      {activeComets.map((comet) => (
        <Comet
          key={comet.id}
          trajectory={comet.trajectory}
          onComplete={() => handleComplete(comet.id)}
        />
      ))}
    </>
  );
}
