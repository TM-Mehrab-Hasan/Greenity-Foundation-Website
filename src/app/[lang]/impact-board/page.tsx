import { getDictionary } from "@/dictionaries/get-dictionary";
import { Award, Trophy, Star, Shield, ExternalLink } from "lucide-react";
import Image from "next/image";

export default async function ImpactBoardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');

  // Mock Leaderboard Data
  const leaders = [
    { rank: 1, name: "Ariful I.", hours: 450, impact: "2.4 Tons", badge: "coastal" },
    { rank: 2, name: "Sumaiya K.", hours: 380, impact: "1.8 Tons", badge: "forest" },
    { rank: 3, name: "Tanvir H.", hours: 310, impact: "1.2 Tons", badge: "urban" },
    { rank: 4, name: "Nabila A.", hours: 290, impact: "0.9 Tons", badge: "advocate" },
  ];

  const badges = [
    { id: 'coastal', icon: <Shield className="w-8 h-8" />, label: dictionary.gamification.badges.coastal, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'forest', icon: <Star className="w-8 h-8" />, label: dictionary.gamification.badges.forest, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'urban', icon: <Award className="w-8 h-8" />, label: dictionary.gamification.badges.urban, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'advocate', icon: <Trophy className="w-8 h-8" />, label: dictionary.gamification.badges.advocate, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 sm:px-20 bg-background text-foreground eco-texture">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <section className="flex flex-col gap-8 text-center sm:text-left">
          <div className="inline-flex self-center sm:self-start px-3 py-1 rounded-full bg-surface text-primary-green text-xs font-bold uppercase tracking-widest border border-border">
            {dictionary.common.impact} / {dictionary.gamification.title}
          </div>
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.9]">
            {dictionary.gamification.title}
          </h1>
          <p className="text-xl opacity-70 max-w-2xl leading-relaxed text-justify">
            {dictionary.gamification.subtitle}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Badge Showcase */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <h2 className="text-2xl font-black tracking-tight uppercase italic opacity-20">Verified Achievement Badges</h2>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div key={badge.id} className="p-6 bg-surface border border-border rounded-[2.5rem] flex flex-col items-center gap-4 text-center group hover:border-foreground/20 transition-all">
                  <div className={`w-16 h-16 rounded-full ${badge.bg} flex items-center justify-center ${badge.color} group-hover:scale-110 transition-transform`}>
                    {badge.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest leading-tight">{badge.label}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-foreground text-background rounded-[2.5rem] flex flex-col gap-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Award className="w-24 h-24 rotate-12" />
               </div>
               <h3 className="text-xl font-bold">Want to earn your first badge?</h3>
               <p className="text-sm opacity-70">Join our next cleanup at Sadarghat or start a neighborhood composting hub.</p>
               <a href={`/${lang}/volunteer`} className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest border-b border-current pb-1 w-fit hover:gap-3 transition-all">
                  Browse Operations <ExternalLink className="w-3 h-3" />
               </a>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-black tracking-tight uppercase italic opacity-20">{dictionary.gamification.leaderboard}</h2>
               <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Monthly Cycle: MAY-2026</div>
            </div>
            
            <div className="flex flex-col gap-4">
              {leaders.map((leader) => (
                <div 
                  key={leader.rank} 
                  className="group relative bg-surface border border-border rounded-[2.5rem] p-6 sm:px-10 flex items-center gap-6 hover:border-foreground/30 transition-all shadow-xl shadow-foreground/[0.02]"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center font-mono font-black text-xl">
                    {leader.rank < 10 ? `0${leader.rank}` : leader.rank}
                  </div>
                  
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-black tracking-tight">{leader.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{dictionary.gamification.volunteer}</span>
                        <div className="w-1 h-1 rounded-full bg-green-500"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-green">{leader.badge.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="flex gap-8">
                      <div className="flex flex-col">
                        <span className="text-2xl font-mono font-black tabular-nums">{leader.hours}h</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{dictionary.gamification.hours}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-mono font-black tabular-nums text-primary-green">{leader.impact}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Plastic Diverted</span>
                      </div>
                    </div>
                  </div>

                  {/* Biological Leader Line style decorator */}
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-px bg-border group-hover:bg-foreground/20 transition-colors hidden lg:block"></div>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 text-center mt-4">
              Data synchronized via Environmental Restoration Ledger / BD-INT-09
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
