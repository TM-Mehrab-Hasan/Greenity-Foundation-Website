import { getDictionary } from "@/dictionaries/get-dictionary";
import { Recycle, ArrowRight, Box, Layers, Zap } from "lucide-react";
import Image from "next/image";

export default async function ImpactGalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');

  const galleryItems = [
    {
      id: 'TTT-01',
      title: "Ghost Nets to Community Benches",
      material: "Abandoned Nylon Fishing Nets",
      product: "Ergonomic Park Benches",
      process: "Cryogenic Grinding & Injection Molding",
      impact: "25kg diverted per bench",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: 'TTT-02',
      title: "River Plastic to Construction Bricks",
      material: "Mixed LDPE/HDPE River Waste",
      product: "Non-Load Bearing Eco-Bricks",
      process: "Thermal Compression & Stabilization",
      impact: "4.2kg diverted per brick",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 sm:px-20 bg-background text-foreground eco-texture">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <section className="flex flex-col gap-8 text-center sm:text-left">
          <div className="inline-flex self-center sm:self-start px-3 py-1 rounded-full bg-surface text-primary-green text-xs font-bold uppercase tracking-widest border border-border">
            {dictionary.common.impact} / {dictionary.gallery.title}
          </div>
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.9]">
            {dictionary.gallery.title}
          </h1>
          <p className="text-xl opacity-70 max-w-2xl leading-relaxed text-justify">
            {dictionary.gallery.subtitle}
          </p>
        </section>

        {/* Gallery Catalog */}
        <div className="flex flex-col gap-24">
          {galleryItems.map((item, index) => (
            <section 
              key={item.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000`}
              style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'both' }}
            >
              {/* Visual Showcase */}
              <div className="relative w-full lg:w-1/2 aspect-video rounded-[3rem] overflow-hidden border border-border shadow-2xl group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                
                {/* Biological Identification Leader Lines */}
                <div className="absolute top-1/4 left-1/4 group/line">
                  <div className="w-2 h-2 bg-white rounded-full border-2 border-green-500 shadow-sm animate-pulse"></div>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 h-px w-16 bg-white/20 hidden lg:block"></div>
                  <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {dictionary.gallery.raw_material}
                  </div>
                </div>

                <div className="absolute bottom-1/3 right-1/4 group/line">
                  <div className="w-2 h-2 bg-white rounded-full border-2 border-green-500 shadow-sm animate-pulse delay-500"></div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 h-px w-16 bg-white/20 hidden lg:block"></div>
                  <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {dictionary.gallery.final_product}
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 text-[10px] font-mono font-black text-background opacity-40">
                  REF-CATALOG: {item.id}
                </div>
              </div>

              {/* Data Content */}
              <div className="w-full lg:w-1/2 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-tight">{item.title}</h2>
                  <div className="h-1.5 w-20 bg-primary-green rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 gap-6 border-y border-border py-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                      <Box className="w-5 h-5 text-primary-green" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{dictionary.gallery.raw_material}</span>
                      <span className="text-lg font-bold">{item.material}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5 text-primary-green" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{dictionary.gallery.process}</span>
                      <span className="text-lg font-bold">{item.process}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                      <Recycle className="w-5 h-5 text-primary-green" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{dictionary.gallery.final_product}</span>
                      <span className="text-lg font-bold">{item.product}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-surface rounded-3xl border border-border">
                   <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-black uppercase tracking-widest">Net Ecological Impact</span>
                   </div>
                   <span className="text-2xl font-mono font-black tabular-nums text-primary-green">{item.impact}</span>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <section className="mt-16 p-12 bg-foreground text-background rounded-[3rem] text-center flex flex-col items-center gap-6 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                   <pattern id="grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                   </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-light)" />
             </svg>
          </div>
          <h3 className="text-3xl font-black tracking-tighter relative z-10">Scale the Circular Economy.</h3>
          <p className="max-w-xl opacity-70 text-lg relative z-10">Our goal is to convert 100% of collected ocean plastic into community-first infrastructure by 2030.</p>
          <a href={`/${lang}/donate`} className="mt-4 px-10 h-14 bg-background text-foreground rounded-full flex items-center justify-center font-bold text-lg hover:opacity-90 transition-all relative z-10">
            Support the Transformation
          </a>
        </section>

      </div>
    </main>
  );
}
