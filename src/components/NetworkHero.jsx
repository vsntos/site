import { useEffect, useRef, useState } from 'react';

const NODE_COUNT = 55;
const EDGE_COUNT = 80;

const NODE_LABELS = [
  'Senado Federal', 'INPI', 'Universidade', 'Startup', 'Governo Estadual',
  'Empresa âncora', 'Centro P&D', 'Fundo de Inovação', 'Agência Reguladora', 'Hub Tecnológico',
];

function generateNetwork() {
  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    id: i,
    x: 0.1 + Math.random() * 0.8,
    y: 0.1 + Math.random() * 0.8,
    r: Math.random() * 2.5 + 2,
    vx: (Math.random() - 0.5) * 0.00025,
    vy: (Math.random() - 0.5) * 0.00025,
    pulse: Math.random() * Math.PI * 2,
    label: null,
    connections: [],
  }));

  // Hub nodes with labels
  const hubs = [0, 7, 15, 28, 42];
  hubs.forEach((idx, i) => {
    nodes[idx].r = 7;
    nodes[idx].label = NODE_LABELS[i];
    nodes[idx].isHub = true;
  });

  const edges = [];
  const used = new Set();

  // Connect hubs first
  hubs.forEach(hub => {
    for (let i = 0; i < 10; i++) {
      const b = Math.floor(Math.random() * NODE_COUNT);
      const key = `${Math.min(hub, b)}-${Math.max(hub, b)}`;
      if (hub !== b && !used.has(key)) {
        used.add(key);
        edges.push({ a: hub, b, alpha: 0.35 });
        nodes[hub].connections.push(b);
        nodes[b].connections.push(hub);
      }
    }
  });

  // Random edges
  while (edges.length < EDGE_COUNT) {
    const a = Math.floor(Math.random() * NODE_COUNT);
    const b = Math.floor(Math.random() * NODE_COUNT);
    const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
    if (a !== b && !used.has(key)) {
      used.add(key);
      edges.push({ a, b, alpha: 0.12 });
      nodes[a].connections.push(b);
      nodes[b].connections.push(a);
    }
  }

  return { nodes, edges };
}

export default function NetworkHero() {
  const canvasRef = useRef(null);
  const networkRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    networkRef.current = generateNetwork();
    let t = 0;

    function getScale() {
      return window.devicePixelRatio || 1;
    }

    function resize() {
      const dpr = getScale();
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function getHoveredNode(mx, my) {
      const { nodes } = networkRef.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (const node of nodes) {
        const nx = node.x * w;
        const ny = node.y * h;
        const dist = Math.sqrt((mx - nx) ** 2 + (my - ny) ** 2);
        const hitRadius = node.isHub ? 18 : 10;
        if (dist < hitRadius) return node;
      }
      return null;
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current = { x: mx, y: my };

      const hovered = getHoveredNode(mx, my);
      if (hovered && hovered.label) {
        const degree = hovered.connections.length;
        setTooltip({
          x: e.clientX,
          y: e.clientY,
          label: hovered.label,
          degree,
        });
        canvas.style.cursor = 'pointer';
      } else {
        setTooltip(null);
        canvas.style.cursor = 'default';
      }
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', () => {
      mouseRef.current = { x: -999, y: -999 };
      setTooltip(null);
    });

    function draw() {
      const { nodes, edges } = networkRef.current;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const { x: mx, y: my } = mouseRef.current;
      t += 0.007;

      ctx.clearRect(0, 0, w, h);

      const hoveredNode = getHoveredNode(mx, my);
      const highlightedIds = hoveredNode
        ? new Set([hoveredNode.id, ...hoveredNode.connections])
        : null;

      // Edges
      edges.forEach(({ a, b, alpha }) => {
        const na = nodes[a];
        const nb = nodes[b];
        const x1 = na.x * w, y1 = na.y * h;
        const x2 = nb.x * w, y2 = nb.y * h;

        const isHighlighted = highlightedIds &&
          (highlightedIds.has(a) && highlightedIds.has(b));
        const effectiveAlpha = highlightedIds
          ? (isHighlighted ? 0.8 : 0.04)
          : alpha;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `rgba(59,130,246,${effectiveAlpha})`);
        grad.addColorStop(1, `rgba(6,182,212,${effectiveAlpha * 0.6})`);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isHighlighted ? 1.5 : 0.8;
        ctx.stroke();
      });

      // Nodes
      nodes.forEach(node => {
        const x = node.x * w;
        const y = node.y * h;
        const isHighlighted = !highlightedIds || highlightedIds.has(node.id);
        const isHovered = hoveredNode?.id === node.id;
        const pulse = Math.sin(t + node.pulse) * 0.4 + 1;
        const r = (isHovered ? node.r * 1.6 : node.r) * pulse;

        ctx.globalAlpha = isHighlighted ? 1 : 0.15;

        // Glow
        if (node.isHub || isHovered) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
          glow.addColorStop(0, isHovered ? 'rgba(96,165,250,0.5)' : 'rgba(96,165,250,0.25)');
          glow.addColorStop(1, 'rgba(96,165,250,0)');
          ctx.beginPath();
          ctx.arc(x, y, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.isHub ? '#60a5fa' : (isHovered ? '#93c5fd' : '#bfdbfe');
        ctx.fill();

        ctx.globalAlpha = 1;

        // Move
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0.03 || node.x > 0.97) node.vx *= -1;
        if (node.y < 0.03 || node.y > 0.97) node.vy *= -1;
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
        aria-hidden="true"
      />
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-2 bg-navy-800 border border-accent/40 rounded-lg text-sm text-white shadow-xl"
          style={{ left: tooltip.x + 14, top: tooltip.y - 36 }}
        >
          <p className="font-medium">{tooltip.label}</p>
          <p className="text-xs text-accent-cyan">{tooltip.degree} conexões</p>
        </div>
      )}
    </>
  );
}
