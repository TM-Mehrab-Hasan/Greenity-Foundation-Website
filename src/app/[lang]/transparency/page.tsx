import { getDictionary } from "@/dictionaries/get-dictionary";
import { ShieldCheck, ArrowUpRight, Zap, Target } from "lucide-react";

export default async function TransparencyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');

  // Mock Ledger Data
  const ledgerEntries = [
    { id: 'GRN-772', type: 'Beach Cleanup', input: '15,000 BDT', output: '75kg Plastic', hash: '0x772...e9a' },
    { id: 'GRN-771', type: 'Urban Forest', input: '25,000 BDT', output: '120 Saplings', hash: '0x771...b2c' },
    { id: 'GRN-770', type: 'River Filter', input: '45,000 BDT', output: '210kg Plastic', hash: '0x770...f4d' },
    { id: 'GRN-769', type: 'Eco-Education', input: '12,000 BDT', output: '450 Students', hash: '0x769...a1b' },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 sm:px-20 bg-background text-foreground eco-texture">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <section className="flex flex-col gap-8 text-center sm:text-left">
          <div className="inline-flex self-center sm:self-start px-3 py-1 rounded-full bg-surface text-primary-green text-xs font-bold uppercase tracking-widest border border-border">
            {dictionary.common.impact} / {dictionary.about.values.transparency}
          </div>
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.9]">
            {dictionary.transparency.title}
          </h1>
          <p className="text-xl opacity-70 max-w-2xl leading-relaxed text-justify">
            {dictionary.transparency.subtitle}
          </p>
        </section>

        {/* Live Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            label={dictionary.transparency.stats.total_donated} 
            value="1.2M+" 
            unit="BDT" 
            icon={<Zap className="w-5 h-5 text-yellow-500" />}
          />
          <StatCard 
            label={dictionary.transparency.stats.verified_impact} 
            value="12,500" 
            unit="KG" 
            icon={<Target className="w-5 h-5 text-green-500" />}
          />
          <StatCard 
            label={dictionary.transparency.stats.efficiency} 
            value="94.2" 
            unit="%" 
            icon={<ShieldCheck className="w-5 h-5 text-blue-500" />}
          />
        </section>

        {/* Ledger Table */}
        <section className="bg-surface rounded-[3rem] border border-border overflow-hidden shadow-2xl shadow-foreground/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="p-8 sm:p-12 flex flex-col gap-8">
            <div className="flex justify-between items-center border-b border-border pb-8">
              <h2 className="text-3xl font-black tracking-tight uppercase italic opacity-20">Verified Ledger Log</h2>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 border-b border-border">
                    <th className="pb-6 px-4">{dictionary.transparency.ledger_id}</th>
                    <th className="pb-6 px-4">{dictionary.transparency.impact_type}</th>
                    <th className="pb-6 px-4">{dictionary.transparency.resource_input}</th>
                    <th className="pb-6 px-4">{dictionary.transparency.physical_output}</th>
                    <th className="pb-6 px-4 text-right">{dictionary.transparency.verification}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {ledgerEntries.map((entry) => (
                    <tr key={entry.id} className="group hover:bg-foreground/[0.02] transition-colors">
                      <td className="py-6 px-4 font-mono text-sm font-bold">{entry.id}</td>
                      <td className="py-6 px-4 font-bold">{entry.type}</td>
                      <td className="py-6 px-4 font-mono text-sm">{entry.input}</td>
                      <td className="py-6 px-4 font-black text-primary-green">{entry.output}</td>
                      <td className="py-6 px-4 text-right">
                        <span className="inline-flex items-center gap-2 bg-background border border-border px-3 py-1 rounded-full font-mono text-[10px] opacity-60">
                          {entry.hash}
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

function StatCard({ label, value, unit, icon }: { label: string, value: string, unit: string, icon: React.ReactNode }) {
  return (
    <div className="p-10 bg-surface border border-border rounded-[2.5rem] flex flex-col gap-6 group hover:border-foreground/20 transition-all">
      <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black tracking-tighter tabular-nums">{value}</span>
          <span className="text-sm font-bold opacity-40 uppercase tracking-widest">{unit}</span>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] opacity-40">{label}</p>
      </div>
    </div>
  );
}
