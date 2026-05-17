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
    <div className="w-full flex flex-col lg:flex-row gap-12 items-center lg:items-stretch">
      {/* Map Container */}
      <div className="relative w-full max-w-2xl aspect-[3/4] bg-surface rounded-[3rem] border border-border overflow-hidden p-8 shadow-inner shadow-foreground/5 shrink-0">
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full text-foreground/5 fill-current"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Bangladesh SVG Outline */}
          <path
            d="M50 5 L70 20 L85 40 L90 60 L85 80 L95 100 L90 115 L60 110 L40 115 L10 100 L5 80 L15 60 L10 40 L20 20 L50 5 Z"
            className="stroke-foreground/10 stroke-2"
          />
          
          {/* Grid lines */}
          <path d="M0 20 L100 20 M0 40 L100 40 M0 60 L100 60 M0 80 L100 80 M0 100 L100 100" stroke="currentColor" strokeWidth="0.1" opacity="0.1" />
          <path d="M20 0 L20 120 M40 0 L40 120 M60 0 L60 120 M80 0 L80 120" stroke="currentColor" strokeWidth="0.1" opacity="0.1" />

          {/* Leader Line (Biological Identification Style) */}
          {activeSpot && (
            <g className="animate-in fade-in duration-500">
              <path
                d={`M ${activeSpot.x} ${activeSpot.y} L 110 ${activeSpot.y}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-foreground/20 stroke-dasharray-[2,2]"
                style={{ strokeDasharray: '2,2' }}
              />
              <circle
                cx={activeSpot.x}
                cy={activeSpot.y}
                r="1"
                className="fill-foreground"
              />
            </g>
          )}

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
                r={activeSpot?.id === spot.id ? 4 : 2}
                className={`transition-all duration-500 ${
                  activeSpot?.id === spot.id ? 'fill-foreground' : 'fill-foreground/20 group-hover:fill-foreground/40'
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
          Operational Impact Map / BD-Unit
        </div>
      </div>

      {/* Info Card (Right Side / Identification Panel) */}
      <div className="flex-1 w-full flex flex-col justify-center min-h-[400px]">
        {activeSpot ? (
          <div className="bg-foreground text-background p-10 rounded-[3rem] shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700 flex flex-col gap-8 relative overflow-hidden">
            {/* Biological Label Style Header */}
            <div className="flex flex-col gap-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Location Identifier</div>
              <div className="flex justify-between items-center">
                <h3 className="text-4xl font-black tracking-tighter">{activeSpot.name}</h3>
                <MapPin className="w-8 h-8 opacity-30" />
              </div>
              <div className="h-0.5 w-12 bg-background/20 rounded-full mt-2"></div>
            </div>
            
            <p className="text-xl opacity-80 leading-relaxed font-medium">
              {activeSpot.description}
            </p>

            <div className="grid grid-cols-1 gap-6 pt-8 border-t border-background/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-50">
                  <Recycle className="w-4 h-4" />
                  Plastic Recovered
                </div>
                <div className="text-3xl font-mono font-bold tabular-nums">
                  {activeSpot.plastic}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-50">
                  <Users className="w-4 h-4" />
                  Active Volunteers
                </div>
                <div className="text-3xl font-mono font-bold tabular-nums">
                  {activeSpot.volunteers}
                </div>
              </div>
            </div>

            {/* Decorative ID tag */}
            <div className="absolute top-0 right-12 h-16 w-8 bg-background/5 border-x border-b border-background/10 flex items-center justify-center">
               <div className="rotate-90 text-[8px] font-mono opacity-20 whitespace-nowrap tracking-widest uppercase">
                  Ref-ID: {activeSpot.id.toUpperCase()}
               </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-[3rem] text-foreground/20 font-bold uppercase tracking-[0.2em] text-center gap-4 group hover:border-foreground/20 transition-colors">
            <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center animate-pulse">
               <MapPin className="w-6 h-6" />
            </div>
            <p className="max-w-[200px] text-xs">Scan Map to Initialize Location Data</p>
          </div>
        )}
      </div>
    </div>
  );
}
