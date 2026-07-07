import React from "react";
import SectionContainer from "../components/ui/SectionContainer";
import ProjectsShowcase from "../components/Projects/ProjectsShowcase";

export default function Projects() {
  return (
    <SectionContainer id="projects" showGlow={true}>
      <ProjectsShowcase />
    </SectionContainer>
  );
}
