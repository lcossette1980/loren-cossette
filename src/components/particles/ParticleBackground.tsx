"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: false,
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: ["#00ffff", "#00d4ff", "#7b61ff", "#ffffff"] },
    links: {
      color: "#00ffff",
      distance: 150,
      enable: true,
      opacity: 0.12,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
    },
    number: {
      value: 80,
      density: { enable: true },
    },
    opacity: {
      value: { min: 0.2, max: 0.5 },
      animation: { enable: true, speed: 0.5, sync: false },
    },
    shape: { type: "circle" },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      grab: {
        distance: 180,
        links: { opacity: 0.3, color: "#00ffff" },
      },
      push: { quantity: 3 },
    },
  },
  detectRetina: true,
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: {
          number: { value: 40 },
          links: { distance: 120 },
        },
      },
    },
  ],
};

export function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="hero-particles"
      options={options}
      className="absolute inset-0 z-0"
    />
  );
}
