import { getDictionary } from "@/dictionaries/get-dictionary";
import Image from "next/image";

export default async function Programs({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground eco-texture">
      <main className="flex flex-col gap-20 py-20 px-8 sm:px-20 max-w-6xl w-full">
        {/* Header */}
        <section className="flex flex-col gap-6 text-center sm:text-left">
          <div className="inline-flex self-center sm:self-start px-3 py-1 rounded-full bg-surface text-primary-green text-xs font-bold uppercase tracking-widest border border-border">
            {dictionary.common.programs}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
            {dictionary.programs.title}
          </h1>
          <p className="text-xl opacity-70 max-w-2xl leading-relaxed">
            {dictionary.programs.subtitle}
          </p>
        </section>

        {/* Programs Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProgramCard 
            title={dictionary.programs.items.beach_cleanup}
            description={dictionary.programs.items.beach_cleanup_desc}
            image="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800"
            tag="Direct Action"
          />
          <ProgramCard 
            title={dictionary.programs.items.reforestation}
            description={dictionary.programs.items.reforestation_desc}
            image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
            tag="Restoration"
          />
          <ProgramCard 
            title={dictionary.programs.items.education}
            description={dictionary.programs.items.education_desc}
            image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
            tag="Awareness"
          />
          <ProgramCard 
            title={dictionary.programs.items.policy}
            description={dictionary.programs.items.policy_desc}
            image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
            tag="Advocacy"
          />
        </section>
      </main>

      <footer className="w-full py-12 px-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6 text-sm opacity-50">
        <div className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="Logo" width={24} height={24} className="grayscale" />
          <p>{dictionary.footer.rights} {dictionary.common.mission}.</p>
        </div>
      </footer>
    </div>
  );
}

function ProgramCard({ title, description, image, tag }: { title: string, description: string, image: string, tag: string }) {
  return (
    <div className="group relative bg-background rounded-[2rem] overflow-hidden border border-border hover:border-foreground/30 transition-all shadow-xl shadow-foreground/5">
      <div className="relative h-64 w-full">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-foreground border border-foreground/10">
          {tag}
        </div>
      </div>
      <div className="p-10 flex flex-col gap-4">
        <h3 className="text-2xl font-black tracking-tight leading-none">{title}</h3>
        <p className="opacity-70 leading-relaxed text-sm">{description}</p>
        <div className="mt-4 pt-6 border-t border-border flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Learn More</span>
          <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
