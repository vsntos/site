import { useEffect, useRef } from 'react';
import { Delaunay } from 'd3';

const NODE_COUNT = 28;

function seededRng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generate(seed) {
  const rng = seededRng(seed * 9301 + 49297);
  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    x: 0.08 + rng() * 0.84,
    y: 0.08 + rng() * 0.84,
    r: i < 4 ? 6 + rng() * 3 : 2.5 + rng() * 2,
    isHub: i < 4,
    vx: (rng() - 0.5) * 0.0003,
    vy: (rng() - 0.5) * 0.0003,
    phase: rng() * Math.PI * 2,
  }));
  return nodes;
}

export default function SectionNetwork({ seed = 7 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const nodes = generate(seed);
    let t = 0;
    let rafId;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      t += 0.012;
      ctx.clearRect(0, 0, w, h);

      const points = nodes.map(n => [n.x * w, n.y * h]);
      const delaunay = Delaunay.from(points);
      const tris = delaunay.triangles;

      // Delaunay triangulation — subtle fill
      for (let i = 0; i < tris.length; i += 3) {
        const ai = tris[i], bi = tris[i+1], ci = tris[i+2];
        const ax = points[ai][0], ay = points[ai][1];
        const bx = points[bi][0], by = points[bi][1];
        const cx = points[ci][0], cy = points[ci][1];

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.lineTo(cx, cy);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(99,179,237,0.18)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.fillStyle = 'rgba(59,130,246,0.03)';
        ctx.fill();
      }

      // Nodes
      nodes.forEach((node, i) => {
        const x = node.x * w;
        const y = node.y * h;
        const pulse = node.isHub ? Math.sin(t + node.phase) * 0.35 + 1 : 1;
        const r = node.r * pulse;

        if (node.isHub) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
          glow.addColorStop(0, 'rgba(96,165,250,0.35)');
          glow.addColorStop(1, 'rgba(96,165,250,0)');
          ctx.beginPath();
          ctx.arc(x, y, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.isHub ? '#60a5fa' : '#93c5fd';
        ctx.fill();

        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0.05 || node.x > 0.95) node.vx *= -1;
        if (node.y < 0.05 || node.y > 0.95) node.vy *= -1;
      });

      rafId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [seed]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
