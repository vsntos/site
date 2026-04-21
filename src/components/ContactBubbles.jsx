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

const SUBSTEPS = 8;
const GRAVITY = 0.025;
const DAMPING = 0.997;
const RESTITUTION = 0.05;
const MOUSE_RADIUS = 140;
const MOUSE_STRENGTH = 22;
const IDLE_STRENGTH = 0.008;
const COLLISION_ITERS = 5;

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

    function packBubbles(w, h) {
      // Place bubbles in rows from the bottom up to avoid chaotic falling
      const sorted = [...BUBBLE_DATA].sort((a, b) => b.r - a.r);
      const placed = [];

      for (let attempt = 0; attempt < sorted.length; attempt++) {
        const d = sorted[attempt];
        let found = false;
        for (let tries = 0; tries < 400 && !found; tries++) {
          const x = d.r + Math.random() * (w - d.r * 2);
          const y = h - d.r - Math.random() * (h * 0.85);
          let ok = true;
          for (const p of placed) {
            const dx = p.x - x, dy = p.y - y;
            if (dx * dx + dy * dy < (p.r + d.r + 2) * (p.r + d.r + 2)) {
              ok = false;
              break;
            }
          }
          if (ok) {
            placed.push({ x, y, r: d.r, label: d.label, origIdx: BUBBLE_DATA.indexOf(d) });
            found = true;
          }
        }
        if (!found) {
          // Fallback: just place below canvas
          placed.push({ x: d.r + Math.random() * (w - d.r * 2), y: h + d.r + Math.random() * 60, r: d.r, label: d.label, origIdx: BUBBLE_DATA.indexOf(d) });
        }
      }
      return placed;
    }

    function initBubbles() {
      const w = canvas.width;
      const h = canvas.height;
      const packed = packBubbles(w, h);

      bubbles = packed.map((p, i) => {
        const origIdx = p.origIdx;
        const color = COLORS[origIdx % COLORS.length];
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        return {
          x: p.x,
          y: p.y,
          px: p.x - vx,
          py: p.y - vy,
          r: p.r,
          label: p.label,
          color,
          seed: Math.random() * 1000,
        };
      });
    }

    resize();
    window.addEventListener('resize', resize);

    function solveConstraints() {
      const w = canvas.width;
      const h = canvas.height;

      for (let iter = 0; iter < COLLISION_ITERS; iter++) {
        for (let i = 0; i < bubbles.length; i++) {
          for (let j = i + 1; j < bubbles.length; j++) {
            const a = bubbles[i], b = bubbles[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distSq = dx * dx + dy * dy;
            const minDist = a.r + b.r + 1;
            if (distSq < minDist * minDist && distSq > 0.0001) {
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

      bubbles.forEach(b => {
        if (b.y + b.r > h) b.y = h - b.r;
        if (b.x - b.r < 0) b.x = b.r;
        if (b.x + b.r > w) b.x = w - b.r;
        if (b.y - b.r < 0) b.y = b.r;
      });
    }

    function update(t) {
      const dt = 1 / SUBSTEPS;

      for (let s = 0; s < SUBSTEPS; s++) {
        bubbles.forEach(b => {
          let vx = (b.x - b.px) * DAMPING;
          let vy = (b.y - b.py) * DAMPING;

          vy += GRAVITY;

          vx += Math.sin(t * 0.0006 + b.seed) * IDLE_STRENGTH;
          vy += Math.cos(t * 0.0005 + b.seed * 1.4) * IDLE_STRENGTH * 0.6;

          const mdx = b.x - mouse.x;
          const mdy = b.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < MOUSE_RADIUS * MOUSE_RADIUS && mDistSq > 0.01) {
            const mDist = Math.sqrt(mDistSq);
            const t2 = 1 - mDist / MOUSE_RADIUS;
            const force = t2 * t2 * MOUSE_STRENGTH;
            vx += (mdx / mDist) * force * dt;
            vy += (mdy / mDist) * force * dt;
          }

          b.px = b.x;
          b.py = b.y;
          b.x += vx;
          b.y += vy;
        });

        solveConstraints();

        bubbles.forEach(b => {
          const floorY = canvas.height;
          if (b.y + b.r >= floorY - 0.5) {
            const vy = b.y - b.py;
            if (vy > 0) b.py = b.y + vy * RESTITUTION;
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

      const shine = ctx.createRadialGradient(
        b.x - b.r * 0.32, b.y - b.r * 0.35, b.r * 0.04,
        b.x, b.y, b.r
      );
      shine.addColorStop(0, 'rgba(255,255,255,0.25)');
      shine.addColorStop(0.45, 'rgba(255,255,255,0.05)');
      shine.addColorStop(1, 'rgba(0,0,0,0.18)');
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = shine;
      ctx.fill();

      const fontSize = Math.max(10, Math.min(13, b.r * 0.28));
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
      bubbles.forEach(drawBubble);

      const fadeH = canvas.height * 0.3;
      const fade = ctx.createLinearGradient(0, 0, 0, fadeH);
      fade.addColorStop(0, 'rgba(10,15,30,1)');
      fade.addColorStop(1, 'rgba(10,15,30,0)');
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, canvas.width, fadeH);

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
