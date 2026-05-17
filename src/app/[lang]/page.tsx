import Image from "next/image";
import { getDictionary } from "@/dictionaries/get-dictionary";
import PlasticCounter from "@/components/Hero/PlasticCounter";
import ImpactMap from "@/components/Impact/ImpactMap";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');

  return (
    <div className="flex flex-col items-center min-h-screen font-sans bg-background text-foreground eco-texture">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center py-20 px-8 sm:px-20 overflow-hidden bg-background transition-colors duration-500">
        {/* Background stylized element - Zero Waste Aesthetic */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <main className="relative flex flex-col gap-16 items-center sm:items-start max-w-6xl w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8 text-center sm:text-left">
              <div className="inline-flex self-center sm:self-start px-3 py-1 rounded-full bg-surface text-primary-green text-xs font-bold uppercase tracking-widest border border-border">
                {dictionary.common.mission}
              </div>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
                {dictionary.hero.welcome.split(' ').map((word: string, i: number) => (
                  <span key={i} className={word.toLowerCase().includes('green') || word.includes('গ্রিন') ? 'opacity-80' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-lg sm:text-xl opacity-80 max-w-xl leading-relaxed">
                {dictionary.hero.subtitle}
              </p>
              
              <div className="flex gap-4 items-center flex-col sm:flex-row mt-4 justify-center sm:justify-start">
                <a
                  className="group rounded-full bg-foreground text-background flex items-center justify-center gap-2 hover:opacity-90 text-base sm:text-lg h-14 px-10 font-bold transition-all shadow-xl shadow-foreground/10"
                  href={`/${lang}/donate`}
                >
                  {dictionary.common.donate}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </a>
                <a
                  className="group rounded-full bg-surface border-2 border-foreground/10 text-foreground flex items-center justify-center gap-2 hover:bg-foreground/5 text-base sm:text-lg h-14 px-10 font-bold transition-all"
                  href={`/${lang}/about`}
                >
                  {dictionary.hero.learnMore}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>


              <div className="mt-8 flex gap-12 justify-center sm:justify-start">
                <PlasticCounter label={dictionary.hero.plasticCounter} target={142580} />
              </div>
            </div>

            <div className="relative aspect-square sm:aspect-video lg:aspect-square w-full group">
              <div className="absolute inset-0 bg-foreground/5 rounded-3xl -rotate-3 transition-transform hover:rotate-0 duration-500"></div>
              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl border border-foreground/10">
                <Image
                  src="/banner.png"
                  alt="Greenity Foundation Banner"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>

                {/* Biological Callout Style Points */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full border-2 border-green-500 animate-pulse shadow-sm"></div>
                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white rounded-full border-2 border-green-500 animate-pulse shadow-sm delay-700"></div>
              </div>
            </div>
            </div>
            </main>
            </section>

            {/* Impact Section */}
            <section className="w-full py-24 px-8 sm:px-20 bg-surface transition-colors duration-500 border-y border-border relative overflow-hidden">      
            <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col gap-4 mb-16 items-center sm:items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">{dictionary.impact.title}</h2>
            <div className="h-1.5 w-20 bg-foreground rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <ImpactCard
              value="500kg+"
              label={dictionary.impact.plasticRemoved}
              icon={<path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />}
            />
            <ImpactCard
              value="12,000"
              label={dictionary.impact.treesPlanted}
              icon={<path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />}
            />
            <ImpactCard
              value="850"
              label={dictionary.impact.volunteers}
              icon={<path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}       
            />
            </div>
            </div>
            </section>

            {/* Geographic Impact Section */}
            <section className="w-full py-24 px-8 sm:px-20 bg-background border-b border-border transition-colors duration-500">
            <div className="max-w-6xl mx-auto flex flex-col gap-16">
            <div className="flex flex-col gap-4 text-center sm:text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter">Local Action, Global Impact.</h2>
            <p className="text-xl opacity-70 max-w-2xl">Explore our major cleanup sites and community hubs across Bangladesh.</p>
            </div>
            <ImpactMap />
            </div>
            </section>

            {/* Crisis vs Solution Section */}
            <section className="w-full py-24 px-8 sm:px-20 bg-background transition-colors duration-500">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="absolute -inset-4 bg-foreground/5 rounded-[2rem] scale-95 group-hover:scale-100 transition-transform duration-500"></div> 
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-foreground/10">
              <Image
                src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=1000"
                alt="Plastic Pollution Crisis"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/80 to-transparent">
                <p className="text-foreground text-sm font-bold uppercase tracking-widest opacity-80 mb-1">{dictionary.crisis.reality}</p>
                <p className="text-foreground text-xl font-bold">{dictionary.crisis.stat}</p>
              </div>
            </div>
            </div>

            <div className="order-1 lg:order-2 flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-1000">            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight">
              {dictionary.crisis.title.split(' ').map((word: string, i: number) => (
                <span key={i} className={i > 3 ? 'opacity-70' : ''}>{word} </span>
              ))}
            </h2>
            <p className="text-xl opacity-70 leading-relaxed">
              {dictionary.crisis.subtitle}
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center flex-shrink-0 mt-1 border border-border">
                  <div className="w-2 h-2 rounded-full bg-foreground"></div>
                </div>
                <p className="font-medium">{dictionary.crisis.points.cleanups}</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center flex-shrink-0 mt-1 border border-border">
                  <div className="w-2 h-2 rounded-full bg-foreground"></div>
                </div>
                <p className="font-medium">{dictionary.crisis.points.education}</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center flex-shrink-0 mt-1 border border-border">
                  <div className="w-2 h-2 rounded-full bg-foreground"></div>
                </div>
                <p className="font-medium">{dictionary.crisis.points.policy}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-8 sm:px-20">
        <div className="max-w-6xl mx-auto rounded-[3rem] bg-foreground p-12 sm:p-24 text-center text-background relative overflow-hidden shadow-2xl shadow-foreground/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-background/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter max-w-3xl">{dictionary.cta.title}</h2>
            <p className="text-xl opacity-80 max-w-2xl">{dictionary.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <a href={`/${lang}/volunteer`} className="h-16 px-10 rounded-full bg-background text-foreground font-bold text-lg flex items-center justify-center hover:opacity-90 transition-colors">
                {dictionary.cta.volunteer}
              </a>
              <a href={`/${lang}/donate`} className="h-16 px-10 rounded-full bg-transparent border-2 border-background/30 text-background font-bold text-lg flex items-center justify-center hover:bg-background/10 transition-colors">
                {dictionary.cta.support}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-12 px-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6 text-sm opacity-50">
        <div className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="Logo" width={24} height={24} className="grayscale" />
          <p>{dictionary.footer.rights} {dictionary.common.mission}.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:opacity-100 transition-opacity">{dictionary.footer.privacy}</a>
          <a href="#" className="hover:opacity-100 transition-opacity">{dictionary.footer.terms}</a>
        </div>
      </footer>
    </div>
  );
}

function ImpactCard({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) {
  return (
    <div className="group p-8 bg-background rounded-3xl border border-border hover:border-foreground/30 transition-all hover:shadow-xl hover:shadow-foreground/5 relative overflow-hidden">
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-foreground mb-6 group-hover:scale-110 transition-transform border border-border">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
        <div className="text-4xl font-mono font-black text-foreground mb-1 tabular-nums">
          {value}
        </div>
        <div className="text-sm font-bold uppercase tracking-widest opacity-40">
          {label}
        </div>
      </div>
    </div>
  );
}
