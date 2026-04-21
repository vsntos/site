import { useState } from 'react';
import MiniNetwork from './MiniNetwork.jsx';

export default function CaseCard({ seed, tag, title, summary, metrics, href }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      class={`group block rounded-2xl border overflow-hidden transition-all duration-300 ${
        hovered
          ? 'border-accent shadow-xl shadow-accent/10 -translate-y-1'
          : 'border-gray-200 shadow-sm'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Network preview */}
      <div class={`relative h-36 transition-colors duration-300 ${hovered ? 'bg-navy-900' : 'bg-gray-100'}`}>
        <MiniNetwork seed={seed} hovered={hovered} />
        <div class={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-60'}`}>
          <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" strokeWidth="1.5"/>
            <circle cx="5" cy="7" r="1.5" strokeWidth="1.5"/>
            <circle cx="19" cy="7" r="1.5" strokeWidth="1.5"/>
            <circle cx="5" cy="17" r="1.5" strokeWidth="1.5"/>
            <circle cx="19" cy="17" r="1.5" strokeWidth="1.5"/>
            <line x1="5" y1="7" x2="12" y2="12" strokeWidth="1"/>
            <line x1="19" y1="7" x2="12" y2="12" strokeWidth="1"/>
            <line x1="5" y1="17" x2="12" y2="12" strokeWidth="1"/>
            <line x1="19" y1="17" x2="12" y2="12" strokeWidth="1"/>
          </svg>
        </div>
        <span class={`absolute top-3 left-3 px-2 py-0.5 text-xs font-medium rounded transition-colors duration-300 ${hovered ? 'bg-accent text-white' : 'bg-white text-accent border border-accent/20'}`}>
          {tag}
        </span>
      </div>

      {/* Content */}
      <div class="p-6 bg-white">
        <h3 class={`font-bold text-lg mb-2 transition-colors duration-200 ${hovered ? 'text-accent' : 'text-navy-900'}`}>
          {title}
        </h3>
        <p class="text-gray-600 text-sm leading-relaxed mb-4">{summary}</p>
        <div class="flex flex-wrap gap-1.5">
          {metrics.map(m => (
            <span key={m} class="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
              {m}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
