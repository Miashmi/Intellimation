import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine); // Ensures particles load properly
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 100 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.7 },
          size: { value: { min: 2, max: 5 } },
          move: { enable: true, speed: 2, direction: "none", random: true },
        },
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
};

export default ParticleBackground;
