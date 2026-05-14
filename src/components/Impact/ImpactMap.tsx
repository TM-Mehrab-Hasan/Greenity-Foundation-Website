'use client';

import { useState } from 'react';
import { MapPin, Users, Recycle } from 'lucide-react';

const HOTSPOTS = [
  {
    id: 'coxs-bazar',
    name: "Cox's Bazar",
    x: 85,
    y: 85,
    plastic: '12,500kg',
    volunteers: '450',
    description: 'Ongoing coastal cleanup and microplastic monitoring.'
  },
  {
    id: 'dhaka',
    name: 'Dhaka (Buriganga)',
    x: 55,
    y: 50,
    plastic: '25,000kg',
    volunteers: '1,200',
    description: 'River restoration and urban waste management awareness.'
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    x: 75,
    y: 25,
    plastic: '5,200kg',
    volunteers: '180',
    description: 'Forest preservation and plastic-free tourism initiatives.'
  },
  {
    id: 'st-martins',
    name: "St. Martin's Island",
    x: 92,
    y: 95,
    plastic: '3,800kg',
    volunteers: '120',
    description: 'Coral reef protection and tourism waste reduction.'
  }
];

export default function ImpactMap() {
  const [activeSpot, setActiveSpot] = useState<typeof HOTSPOTS[0] | null>(null);

  return (
    <div className="w-full flex flex-col gap-12 items-center">
      <div className="relative w-full max-w-2xl aspect-[3/4] bg-surface rounded-[3rem] border border-border overflow-hidden p-8 shadow-inner shadow-foreground/5">
        {/* Simplified Bangladesh SVG Outline */}
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full text-foreground/5 fill-current"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M50 5 L70 20 L85 40 L90 60 L85 80 L95 100 L90 115 L60 110 L40 115 L10 100 L5 80 L15 60 L10 40 L20 20 L50 5 Z"
            className="stroke-foreground/10 stroke-2"
          />
          
          {/* Grid lines for data feel */}
          <path d="M0 20 L100 20 M0 40 L100 40 M0 60 L100 60 M0 80 L100 80 M0 100 L100 100" stroke="currentColor" strokeWidth="0.1" opacity="0.1" />
          <path d="M20 0 L20 120 M40 0 L40 120 M60 0 L60 120 M80 0 L80 120" stroke="currentColor" strokeWidth="0.1" opacity="0.1" />

          {/* Hotspots */}
          {HOTSPOTS.map((spot) => (
            <g
              key={spot.id}
              className="cursor-pointer group"
              onMouseEnter={() => setActiveSpot(spot)}
              onClick={() => setActiveSpot(spot)}
            >
              <circle
                cx={spot.x}
                cy={spot.y}
                r="3"
                className={`transition-all duration-500 ${
                  activeSpot?.id === spot.id ? 'fill-foreground scale-150' : 'fill-foreground/20 group-hover:fill-foreground/40'
                }`}
              />
              <circle
                cx={spot.x}
                cy={spot.y}
                r="6"
                className={`animate-ping transition-all ${
                  activeSpot?.id === spot.id ? 'stroke-foreground opacity-20' : 'stroke-transparent'
                }`}
                style={{ animationDuration: '3s' }}
              />
            </g>
          ))}
        </svg>

        {/* Legend/Hint */}
        <div className="absolute bottom-8 left-8 text-[10px] font-bold uppercase tracking-widest opacity-30">
          Interactive Operational Map / Bangladesh
        </div>
      </div>

      {/* Info Card */}
      <div className="w-full max-w-2xl min-h-[200px]">
        {activeSpot ? (
          <div className="bg-foreground text-background p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <h3 className="text-3xl font-black tracking-tighter">{activeSpot.name}</h3>
              <MapPin className="w-6 h-6 opacity-50" />
            </div>
            
            <p className="text-lg opacity-80 leading-relaxed max-w-lg">
              {activeSpot.description}
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-background/10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50">
                  <Recycle className="w-3 h-3" />
                  Plastic Removed
                </div>
                <div className="text-3xl font-mono font-bold tabular-nums">
                  {activeSpot.plastic}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50">
                  <Users className="w-3 h-3" />
                  Volunteers
                </div>
                <div className="text-3xl font-mono font-bold tabular-nums">
                  {activeSpot.volunteers}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-12 border-2 border-dashed border-border rounded-[2.5rem] text-foreground/30 font-bold uppercase tracking-widest text-center">
            Hover over a location to see our impact
          </div>
        )}
      </div>
    </div>
  );
}
