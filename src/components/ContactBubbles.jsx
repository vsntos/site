import { useEffect, useRef } from 'react';

const BUBBLE_DATA = [
  { label: 'Centralidade', r: 52 },
  { label: 'Broker', r: 44 },
  { label: 'NLP', r: 40 },
  { label: 'Redes', r: 56 },
  { label: 'Inovação', r: 50 },
  { label: 'Cluster', r: 46 },
  { label: 'Big Data', r: 48 },
  { label: 'Patentes', r: 44 },
  { label: 'Grafo', r: 38 },
  { label: 'Senado', r: 50 },
  { label: 'Evidência', r: 46 },
  { label: 'Network', r: 52 },
  { label: 'Python', r: 40 },
  { label: 'PageRank', r: 48 },
  { label: 'Betweenness', r: 56 },
  { label: 'Modularidade', r: 52 },
  { label: 'Difusão', r: 42 },
  { label: 'Coalizão', r: 48 },
  { label: 'Ecossistema', r: 54 },
  { label: 'Hub', r: 36 },
  { label: 'Influência', r: 46 },
  { label: 'Lattes', r: 38 },
  { label: 'INPI', r: 36 },
  { label: 'Parlamento', r: 52 },
  { label: 'Grau', r: 34 },
];

const COLORS = ['#1d4ed8', '#2563eb', '#3b82f6', '#0284c7', '#0891b2', '#06b6d4', '#0e7490'];

export default function ContactBubbles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const mouse = { x: -999, y: -999 };
    let rafId;
    const GRAVITY = 0.35;
    const DAMPING = 0.6;
    const FRICTION = 0.98;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); init(); });

    let bubbles = [];

    function init() {
      const w = canvas.width;
      bubbles = BUBBLE_DATA.map((d, i) => ({
        ...d,
        x: d.r + Math.random() * (w - d.r * 2),
        y: -d.r - Math.random() * canvas.height * 1.5,
        vx: (Math.random() - 0.5) * 2,
        vy: 0,
        color: COLORS[i % COLORS.length],
        label: d.label,
        settled: false,
      }));
    }

    init();

    function resolveCollisions() {
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const a = bubbles[i], b = bubbles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.r + b.r + 2;
          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) / 2;
            const nx = dx / dist;
            const ny = dy / dist;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
            const dvx = b.vx - a.vx;
            const dvy = b.vy - a.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot < 0) {
              a.vx += dot * nx * DAMPING;
              a.vy += dot * ny * DAMPING;
              b.vx -= dot * nx * DAMPING;
              b.vy -= dot * ny * DAMPING;
            }
          }
        }
      }
    }

    function update() {
      const w = canvas.width;
      const h = canvas.height;

      bubbles.forEach(b => {
        // Mouse repulsion
        const mdx = b.x - mouse.x;
        const mdy = b.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const repulseRadius = 100;
        if (mDist < repulseRadius && mDist > 0) {
          const force = (repulseRadius - mDist) / repulseRadius;
          b.vx += (mdx / mDist) * force * 6;
          b.vy += (mdy / mDist) * force * 6;
        }

        b.vy += GRAVITY;
        b.vx *= FRICTION;
        b.vy *= FRICTION;
        b.x += b.vx;
        b.y += b.vy;

        // Floor
        if (b.y + b.r > h) {
          b.y = h - b.r;
          b.vy *= -DAMPING;
          b.vx *= 0.85;
        }

        // Walls
        if (b.x - b.r < 0) { b.x = b.r; b.vx *= -DAMPING; }
        if (b.x + b.r > w) { b.x = w - b.r; b.vx *= -DAMPING; }
      });

      resolveCollisions();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach(b => {
        // Circle
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        // Inner ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r - 3, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        const fontSize = Math.max(10, Math.min(14, b.r * 0.32));
        ctx.font = `600 ${fontSize}px Inter, sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.label, b.x, b.y);
      });
    }

    function loop() {
      update();
      draw();
      rafId = requestAnimationFrame(loop);
    }

    loop();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -999; mouse.y = -999; };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
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
