"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export interface DitherCursorProps {
  enabled?: boolean;
  particleCount?: number;
  trailLifetime?: number; // In milliseconds
  intensity?: number;
  className?: string;
}

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  baseOpacity: number;
  isAccent: boolean;
  active: boolean;
}

interface GridPixel {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
}

export function DitherCursor({
  enabled = true,
  particleCount = 55,
  trailLifetime = 280,
  intensity = 0.6,
  className = "",
}: DitherCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    // Detect fine pointer (mouse) vs touch
    const pointerQuery = window.matchMedia("(pointer: fine)");
    let isFinePointer = pointerQuery.matches;

    // Detect reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = motionQuery.matches;

    const onPointerQueryChange = (e: MediaQueryListEvent) => {
      isFinePointer = e.matches;
    };
    const onMotionQueryChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };

    pointerQuery.addEventListener("change", onPointerQueryChange);
    motionQuery.addEventListener("change", onMotionQueryChange);

    // Mouse telemetry ref (never in React state to avoid frame re-renders)
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
      lastMoveTime: 0,
    };

    // Pre-allocated Particle Pool (Zero GC allocation in tick)
    const maxParticles = Math.max(40, Math.min(particleCount, 300));
    const particles: TrailParticle[] = new Array(maxParticles);
    for (let i = 0; i < maxParticles; i++) {
      particles[i] = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: 30,
        size: 2,
        baseOpacity: 0.8,
        isAccent: false,
        active: false,
      };
    }
    let poolIndex = 0;

    // Ambient background grid pixels with physical displacement
    let gridPixels: GridPixel[] = [];

    const initGrid = (width: number, height: number) => {
      gridPixels = [];
      const spacing = 44;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const jitterX = Math.sin(i * 12.3 + j * 45.6) * 3;
          const jitterY = Math.cos(i * 45.6 + j * 12.3) * 3;
          const x = i * spacing + jitterX;
          const y = j * spacing + jitterY;

          gridPixels.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            size: 1.5,
          });
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initGrid(width, height);
    };

    // Pointer event listeners
    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (mouse.prevX === -1000) {
        mouse.prevX = currentX;
        mouse.prevY = currentY;
      } else {
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
      }

      mouse.x = currentX;
      mouse.y = currentY;

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const dist = Math.hypot(dx, dy);

      // Instantaneous smoothed velocity
      mouse.vx = dx;
      mouse.vy = dy;
      mouse.speed = mouse.speed * 0.4 + dist * 0.6;
      mouse.active = true;
      mouse.lastMoveTime = now;

      // Spawn trail particles along path (sub-frame interpolation for fast sweeps)
      // Slightly reduce spawn rate during active scrolling for frame consistency
      if (isFinePointer && !isReducedMotion && dist > 1) {
        const effectiveIntensity = intensity * scrollDamping;
        const speedScale = Math.min(mouse.speed / 12, 2.4) * effectiveIntensity;
        const steps = Math.min(Math.max(1, Math.floor(dist / 12)), 4);
        const particlesPerStep = Math.max(1, Math.floor(speedScale * 1.2));

        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          const interpX = mouse.prevX + dx * t;
          const interpY = mouse.prevY + dy * t;

          for (let p = 0; p < particlesPerStep; p++) {
            spawnParticle(interpX, interpY, dx, dy, speedScale);
          }
        }
      }
    };

    const spawnParticle = (
      baseX: number,
      baseY: number,
      moveDx: number,
      moveDy: number,
      speedScale: number
    ) => {
      const particle = particles[poolIndex];
      poolIndex = (poolIndex + 1) % maxParticles;

      // Pixelated offsets: discrete steps for genuine dither look
      const spread = (3 + speedScale * 5);
      const offsetX = (Math.floor(Math.random() * spread * 2) - spread);
      const offsetY = (Math.floor(Math.random() * spread * 2) - spread);

      // Discrete pixel sizes: 2px to 2.5px fine grain
      const sizeRand = Math.random();
      const size = sizeRand > 0.85 ? 2.5 : 2;

      // Particles trail backwards slightly against movement direction + subtle jitter
      const driftBack = -0.10;
      const jitter = 0.35;
      particle.x = Math.round(baseX + offsetX);
      particle.y = Math.round(baseY + offsetY);
      particle.vx = moveDx * driftBack + (Math.random() - 0.5) * jitter;
      particle.vy = moveDy * driftBack + (Math.random() - 0.5) * jitter;

      // Lifespan converted from ms to frames (~60fps)
      const baseFrames = (trailLifetime / 1000) * 60;
      const randomizedFrames = baseFrames * (0.6 + Math.random() * 0.5);
      particle.maxLife = Math.max(10, Math.round(randomizedFrames));
      particle.life = particle.maxLife;

      // Delicate opacity for subtle grain texture, dampened during scroll
      particle.baseOpacity = (0.30 + Math.random() * 0.20) * scrollDamping;

      // ~10% restrained emerald accent, rest neutral monochrome
      particle.isAccent = Math.random() < 0.10;
      particle.size = size;
      particle.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.prevX = -1000;
      mouse.prevY = -1000;
      mouse.speed = 0;
    };

    // Scroll dampening state to prioritize typography and frame consistency
    let scrollDamping = 1;
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      scrollDamping = 0.4;
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrollDamping = 1;
      }, 140);
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    resize();

    // Main Unified Animation Loop
    const render = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Decay velocity when cursor stops moving
      const now = performance.now();
      if (now - mouse.lastMoveTime > 32) {
        mouse.speed *= 0.8;
        if (mouse.speed < 0.1) mouse.speed = 0;
      }

      // Palette definition based on active theme
      const colors = isDark
        ? {
            gridBase: "rgba(163, 163, 163, 0.14)",
            gridActive: "rgba(16, 185, 129, 0.6)",
            trailNeutralA: (a: number) => `rgba(220, 220, 220, ${a})`,
            trailNeutralB: (a: number) => `rgba(160, 160, 160, ${a})`,
            trailAccent: (a: number) => `rgba(16, 185, 129, ${a})`,
            reticle: "rgba(16, 185, 129, 0.35)",
          }
        : {
            gridBase: "rgba(115, 115, 115, 0.16)",
            gridActive: "rgba(5, 150, 105, 0.55)",
            trailNeutralA: (a: number) => `rgba(80, 80, 80, ${a})`,
            trailNeutralB: (a: number) => `rgba(140, 140, 140, ${a})`,
            trailAccent: (a: number) => `rgba(5, 150, 105, ${a})`,
            reticle: "rgba(5, 150, 105, 0.3)",
          };

      // 1. Render Ambient Background Pixel Field with Displacement
      const interactionRadius = 110;
      const radiusSq = interactionRadius * interactionRadius;

      for (let i = 0; i < gridPixels.length; i++) {
        const p = gridPixels[i];

        if (!isReducedMotion && mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0.1) {
            const dist = Math.sqrt(distSq);
            // Elastic displacement away from cursor
            const push = (1 - dist / interactionRadius) * (mouse.speed > 8 ? 8 : 4);
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * push * 0.12;
            p.vy -= Math.sin(angle) * push * 0.12;
          }

          // Hooke's law spring back to origin
          const springDx = p.originX - p.x;
          const springDy = p.originY - p.y;
          p.vx += springDx * 0.055;
          p.vy += springDy * 0.055;

          // Damping friction
          p.vx *= 0.82;
          p.vy *= 0.82;

          p.x += p.vx;
          p.y += p.vy;
        }

        // Snap to whole integer coordinates for crisp pixel grid
        const renderX = Math.round(p.x);
        const renderY = Math.round(p.y);

        // Highlight displaced pixels near cursor
        const offsetDist = Math.hypot(p.x - p.originX, p.y - p.originY);
        if (offsetDist > 0.8 && mouse.active) {
          ctx.fillStyle = colors.gridActive;
          ctx.fillRect(renderX, renderY, p.size + 0.5, p.size + 0.5);
        } else {
          ctx.fillStyle = colors.gridBase;
          ctx.fillRect(renderX, renderY, p.size, p.size);
        }
      }

      // If reduced motion is on, skip all cursor trail animations
      if (!isReducedMotion && isFinePointer) {
        // 2. Render Dither Trail Particles
        for (let i = 0; i < maxParticles; i++) {
          const p = particles[i];
          if (!p.active) continue;

          // Physics update
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.life -= 1;

          if (p.life <= 0) {
            p.active = false;
            continue;
          }

          // Dither fade: non-linear falloff
          const progress = p.life / p.maxLife; // 1 down to 0
          const alpha = Math.max(0, Math.min(1, progress * progress * p.baseOpacity));

          // Snap to whole integer coordinates for square pixel aesthetic
          const px = Math.round(p.x);
          const py = Math.round(p.y);
          const halfSize = Math.floor(p.size / 2);

          if (p.isAccent) {
            ctx.fillStyle = colors.trailAccent(alpha);
          } else {
            // Pseudo-random stipple dithering between darker & lighter neutral
            ctx.fillStyle =
              (px + py) % 2 === 0
                ? colors.trailNeutralA(alpha)
                : colors.trailNeutralB(alpha * 0.85);
          }

          ctx.fillRect(px - halfSize, py - halfSize, p.size, p.size);
        }

        // 3. Subtle Custom Cursor Reticle Indicator Behind Normal Cursor
        if (mouse.active) {
          const cx = Math.round(mouse.x);
          const cy = Math.round(mouse.y);

          ctx.fillStyle = colors.reticle;
          // Core pixel
          ctx.fillRect(cx - 1, cy - 1, 2, 2);
          // 4 satellite dither pips
          ctx.fillRect(cx - 5, cy, 2, 1);
          ctx.fillRect(cx + 4, cy, 2, 1);
          ctx.fillRect(cx, cy - 5, 1, 2);
          ctx.fillRect(cx, cy + 4, 1, 2);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause animation when tab is inactive to save battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      pointerQuery.removeEventListener("change", onPointerQueryChange);
      motionQuery.removeEventListener("change", onMotionQueryChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, particleCount, trailLifetime, intensity, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
