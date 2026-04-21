import { useEffect, useRef } from 'react';

const NODE_COUNT = 60;
const EDGE_COUNT = 90;

function generateNetwork() {
  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 3 + 2,
    vx: (Math.random() - 0.5) * 0.0003,
    vy: (Math.random() - 0.5) * 0.0003,
    pulse: Math.random() * Math.PI * 2,
  }));

  const edges = [];
  const used = new Set();
  while (edges.length < EDGE_COUNT) {
    const a = Math.floor(Math.random() * NODE_COUNT);
    const b = Math.floor(Math.random() * NODE_COUNT);
    const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
    if (a !== b && !used.has(key)) {
      used.add(key);
      edges.push({ a, b, alpha: Math.random() * 0.4 + 0.1 });
    }
  }

  // Create a few high-degree hub nodes for realism
  [0, 5, 12, 23, 41].forEach(hub => {
    for (let i = 0; i < 8; i++) {
      const b = Math.floor(Math.random() * NODE_COUNT);
      const key = `${Math.min(hub, b)}-${Math.max(hub, b)}`;
      if (hub !== b && !used.has(key)) {
        used.add(key);
        edges.push({ a: hub, b, alpha: 0.3 });
      }
    }
    nodes[hub].r = 7;
  });

  return { nodes, edges };
}

export default function NetworkHero() {
  const canvasRef = useRef(null);
  const networkRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    networkRef.current = generateNetwork();
    let t = 0;

    function resize() {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const { nodes, edges } = networkRef.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      t += 0.008;

      ctx.clearRect(0, 0, w, h);

      // Draw edges
      edges.forEach(({ a, b, alpha }) => {
        const na = nodes[a];
        const nb = nodes[b];
        const x1 = na.x * w;
        const y1 = na.y * h;
        const x2 = nb.x * w;
        const y2 = nb.y * h;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `rgba(59,130,246,${alpha})`);
        grad.addColorStop(1, `rgba(6,182,212,${alpha * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        const x = node.x * w;
        const y = node.y * h;
        const pulse = Math.sin(t + node.pulse) * 0.5 + 1;
        const r = node.r * pulse;

        // Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        glow.addColorStop(0, `rgba(96,165,250,0.3)`);
        glow.addColorStop(1, `rgba(96,165,250,0)`);
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.r > 5 ? '#60a5fa' : '#93c5fd';
        ctx.fill();

        // Move nodes
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0.02 || node.x > 0.98) node.vx *= -1;
        if (node.y < 0.02 || node.y > 0.98) node.vy *= -1;
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    />
  );
}
