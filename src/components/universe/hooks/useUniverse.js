import { useContext } from "react";
import { UniverseContext } from "../UniverseProvider";

export default function useUniverse() {
  const context = useContext(UniverseContext);
  if (!context) {
    throw new Error("useUniverse must be used within a UniverseProvider");
  }
  return context;
}
