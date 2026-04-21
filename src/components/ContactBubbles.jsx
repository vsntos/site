import { useEffect, useRef } from 'react';

const BUBBLE_DATA = [
  { label: 'Centralidade', r: 54 },
  { label: 'Broker', r: 46 },
  { label: 'NLP', r: 42 },
  { label: 'Redes', r: 58 },
  { label: 'Inovação', r: 52 },
  { label: 'Cluster', r: 48 },
  { label: 'Big Data', r: 50 },
  { label: 'Patentes', r: 46 },
  { label: 'Grafo', r: 40 },
  { label: 'Senado', r: 52 },
  { label: 'Evidência', r: 48 },
  { label: 'Network', r: 54 },
  { label: 'Python', r: 42 },
  { label: 'PageRank', r: 50 },
  { label: 'Betweenness', r: 58 },
  { label: 'Modularidade', r: 54 },
  { label: 'Difusão', r: 44 },
  { label: 'Coalizão', r: 50 },
  { label: 'Ecossistema', r: 56 },
  { label: 'Hub', r: 38 },
  { label: 'Influência', r: 48 },
  { label: 'INPI', r: 38 },
  { label: 'Parlamento', r: 54 },
  { label: 'Grau', r: 36 },
  { label: 'Dados', r: 44 },
];

const COLORS = [
  '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6',
  '#0369a1', '#0284c7', '#0891b2', '#06b6d4', '#0e7490',
];

const SUBSTEPS = 5;
const GRAVITY = 0.08;
const DAMPING = 0.992;
const RESTITUTION = 0.08;
const MOUSE_RADIUS = 120;
const MOUSE_STRENGTH = 18;
const IDLE_STRENGTH = 0.012;

export default function ContactBubbles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const mouse = { x: -9999, y: -9999 };
    let rafId;
    let bubbles = [];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initBubbles();
    }

    function initBubbles() {
      const w = canvas.width;
      const h = canvas.height;
      // Pre-pack from bottom using simple stacking
      bubbles = BUBBLE_DATA.map((d, i) => {
        const color = COLORS[i % COLORS.length];
        return {
          x: d.r * 1.2 + Math.random() * (w - d.r * 2.4),
          y: h + d.r + Math.random() * h * 0.8, // start below canvas
          px: 0, py: 0, // previous pos (PBD)
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 2,
          r: d.r,
          label: d.label,
          color,
          seed: Math.random() * 1000,
        };
      });
      bubbles.forEach(b => { b.px = b.x - b.vx; b.py = b.y - b.vy; });
    }

    resize();
    window.addEventListener('resize', resize);

    function solveConstraints() {
      const w = canvas.width;
      const h = canvas.height;

      // Circle-circle
      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < bubbles.length; i++) {
          for (let j = i + 1; j < bubbles.length; j++) {
            const a = bubbles[i], b = bubbles[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distSq = dx * dx + dy * dy;
            const minDist = a.r + b.r + 1.5;
            if (distSq < minDist * minDist && distSq > 0.001) {
              const dist = Math.sqrt(distSq);
              const overlap = (minDist - dist) * 0.5;
              const nx = dx / dist;
              const ny = dy / dist;
              a.x -= nx * overlap;
              a.y -= ny * overlap;
              b.x += nx * overlap;
              b.y += ny * overlap;
            }
          }
        }
      }

      // Floor & walls
      bubbles.forEach(b => {
        if (b.y + b.r > h) { b.y = h - b.r; }
        if (b.x - b.r < 0) { b.x = b.r; }
        if (b.x + b.r > w) { b.x = w - b.r; }
        if (b.y - b.r < 0) { b.y = b.r; }
      });
    }

    function update(t) {
      const dt = 1 / SUBSTEPS;

      for (let s = 0; s < SUBSTEPS; s++) {
        bubbles.forEach(b => {
          // Derive velocity from positions (PBD)
          let vx = (b.x - b.px) * DAMPING;
          let vy = (b.y - b.py) * DAMPING;

          // Gravity
          vy += GRAVITY;

          // Idle subtle oscillation
          vx += Math.sin(t * 0.0008 + b.seed) * IDLE_STRENGTH;
          vy += Math.cos(t * 0.0006 + b.seed * 1.3) * IDLE_STRENGTH * 0.5;

          // Mouse repulsion (smooth falloff)
          const mdx = b.x - mouse.x;
          const mdy = b.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < MOUSE_RADIUS && mDist > 0.1) {
            const force = Math.pow(1 - mDist / MOUSE_RADIUS, 2) * MOUSE_STRENGTH;
            vx += (mdx / mDist) * force * dt;
            vy += (mdy / mDist) * force * dt;
          }

          // Store prev, integrate
          b.px = b.x;
          b.py = b.y;
          b.x += vx;
          b.y += vy;
        });

        solveConstraints();

        // Restitution on floor bounce
        bubbles.forEach(b => {
          const h = canvas.height;
          if (b.y + b.r >= h - 0.5) {
            const vy = b.y - b.py;
            if (vy > 0) {
              b.py = b.y + vy * RESTITUTION;
            }
          }
        });
      }
    }

    function drawBubble(b) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();

      // Shine highlight
      const shine = ctx.createRadialGradient(
        b.x - b.r * 0.3, b.y - b.r * 0.35, b.r * 0.05,
        b.x, b.y, b.r
      );
      shine.addColorStop(0, 'rgba(255,255,255,0.22)');
      shine.addColorStop(0.5, 'rgba(255,255,255,0.04)');
      shine.addColorStop(1, 'rgba(0,0,0,0.15)');
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = shine;
      ctx.fill();

      // Label
      const fontSize = Math.max(10, Math.min(13, b.r * 0.3));
      ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.label, b.x, b.y);

      ctx.restore();
    }

    let startTime = performance.now();

    function loop(now) {
      const t = now - startTime;
      update(t);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fade top edge so bubbles emerge naturally
      const fade = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.35);
      fade.addColorStop(0, 'rgba(10,15,30,1)');
      fade.addColorStop(1, 'rgba(10,15,30,0)');

      // Draw bubbles
      bubbles.forEach(drawBubble);

      // Overlay fade at top
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.35);

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ cursor: 'crosshair' }}
    />
  );
}
