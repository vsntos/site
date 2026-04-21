import { useEffect, useRef } from 'react';

function generateMini(seed) {
  const rng = (n) => ((Math.sin(seed * 127.1 + n * 311.7) * 43758.5453) % 1 + 1) % 1;
  const count = 12;
  const nodes = Array.from({ length: count }, (_, i) => ({
    x: 0.1 + rng(i * 2) * 0.8,
    y: 0.1 + rng(i * 2 + 1) * 0.8,
    r: i < 3 ? 5 : 2.5,
    isHub: i < 3,
  }));
  const edges = [];
  const used = new Set();
  [0, 1, 2].forEach(hub => {
    for (let i = 0; i < 4; i++) {
      const b = Math.floor(rng(hub * 13 + i) * count);
      const key = `${Math.min(hub, b)}-${Math.max(hub, b)}`;
      if (hub !== b && !used.has(key)) { used.add(key); edges.push({ a: hub, b }); }
    }
  });
  return { nodes, edges };
}

export default function MiniNetwork({ seed = 1, hovered = false }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { nodes, edges } = generateMini(seed);
    let t = 0;

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      t += 0.015;
      ctx.clearRect(0, 0, w, h);

      edges.forEach(({ a, b }) => {
        const na = nodes[a], nb = nodes[b];
        ctx.beginPath();
        ctx.moveTo(na.x * w, na.y * h);
        ctx.lineTo(nb.x * w, nb.y * h);
        ctx.strokeStyle = hovered ? 'rgba(59,130,246,0.7)' : 'rgba(59,130,246,0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      nodes.forEach((node, i) => {
        const x = node.x * w;
        const y = node.y * h;
        const pulse = node.isHub ? Math.sin(t + i) * 0.3 + 1 : 1;
        const r = node.r * pulse;

        if (node.isHub && hovered) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
          glow.addColorStop(0, 'rgba(96,165,250,0.4)');
          glow.addColorStop(1, 'rgba(96,165,250,0)');
          ctx.beginPath();
          ctx.arc(x, y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.isHub
          ? (hovered ? '#60a5fa' : '#3b82f6')
          : (hovered ? '#93c5fd' : '#bfdbfe');
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [hovered, seed]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={140}
      className="w-full h-full"
    />
  );
}
