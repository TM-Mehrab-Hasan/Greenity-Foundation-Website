import { getDictionary } from "@/dictionaries/get-dictionary";
import Image from "next/image";

export default async function About({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground eco-texture">
      <main className="flex flex-col gap-24 py-20 px-8 sm:px-20 max-w-6xl w-full">
        {/* Header */}
        <section className="flex flex-col gap-8 text-center sm:text-left">
          <div className="inline-flex self-center sm:self-start px-3 py-1 rounded-full bg-surface text-primary-green text-xs font-bold uppercase tracking-widest border border-border">
            {dictionary.common.about}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
            {dictionary.about.title}
          </h1>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-10 bg-surface rounded-[2.5rem] border border-border flex flex-col gap-6">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm">1</span>
              {dictionary.about.mission_title}
            </h2>
            <p className="text-xl opacity-80 leading-relaxed">
              {dictionary.about.mission_text}
            </p>
          </div>
          <div className="p-10 bg-background rounded-[2.5rem] border border-border flex flex-col gap-6 shadow-xl shadow-foreground/5">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary-green text-background flex items-center justify-center text-sm">2</span>
              {dictionary.about.vision_title}
            </h2>
            <p className="text-xl opacity-80 leading-relaxed">
              {dictionary.about.vision_text}
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="flex flex-col gap-12">
          <h2 className="text-4xl font-black tracking-tighter text-center">{dictionary.about.values_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              title={dictionary.about.values.transparency} 
              description={dictionary.about.values.transparency_desc}
              icon={<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
            />
            <ValueCard 
              title={dictionary.about.values.community} 
              description={dictionary.about.values.community_desc}
              icon={<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
            />
            <ValueCard 
              title={dictionary.about.values.innovation} 
              description={dictionary.about.values.innovation_desc}
              icon={<path d="M9.663 17h4.674a1 1 0 00.922-.617l2.108-4.742A1 1 0 0016.446 10h-2.144l.332-1.99a1 1 0 00-.996-1.164H9.337a1 1 0 00-.996 1.164l.332 1.99H6.554a1 1 0 00-.922 1.641l2.108 4.742a1 1 0 00.922.617z" />}
            />
          </div>
        </section>

        {/* Image/Texture Section */}
        <section className="relative h-[400px] w-full rounded-[3rem] overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1500" 
            alt="Nature in Bangladesh" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-green/60 to-transparent flex items-end p-12">
            <p className="text-background text-2xl font-bold max-w-lg">
              {dictionary.common.mission}
            </p>
          </div>
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

function ValueCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="p-8 bg-background rounded-3xl border border-border hover:border-foreground/30 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-foreground mb-6 group-hover:scale-110 transition-transform border border-border">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="opacity-70 leading-relaxed">{description}</p>
    </div>
  );
}
