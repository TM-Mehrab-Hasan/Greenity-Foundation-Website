import { getDictionary } from "@/dictionaries/get-dictionary";
import { getStories } from "@/lib/mdx";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Target, Settings, BookOpen, ChevronRight } from "lucide-react";
import OptimizedPattern from "@/components/Common/OptimizedPattern";

export async function generateStaticParams() {
  return [
    { slug: 'beach-cleanup' },
    { slug: 'reforestation' },
    { slug: 'education' },
    { slug: 'policy' }
  ];
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');
  
  const program = (dictionary.program_details as any)[slug];
  if (!program) notFound();

  const allStories = await getStories(lang as 'en' | 'bn');
  
  // Filter stories related to this program (simple keyword match for now)
  const relatedStories = allStories
    .filter(s => s.title.toLowerCase().includes(slug.split('-')[0]) || s.excerpt.toLowerCase().includes(slug.split('-')[0]))
    .slice(0, 2);

  const icons = [<Target key="1" />, <Settings key="2" />, <BookOpen key="3" />];

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 sm:px-20 bg-background text-foreground eco-texture">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        
        {/* Navigation */}
        <Link
          href={`/${lang}/programs`}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity w-fit"      
        >
          <ArrowLeft className="w-4 h-4" />
          {dictionary.common.programs}
        </Link>

        {/* Hero Section */}
        <header className="flex flex-col gap-8 text-center sm:text-left max-w-4xl">
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.9]">
            {program.title}
          </h1>
          <p className="text-2xl opacity-70 leading-relaxed text-justify">
            {program.subtitle}
          </p>
        </header>

        {/* Live Impact Metrics (Biological Callout Style) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {program.metrics.map((metric: any, i: number) => (
            <div key={i} className="group relative bg-surface border border-border rounded-[3rem] p-12 overflow-hidden shadow-2xl shadow-foreground/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="relative z-10 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-xs font-black uppercase tracking-[0.2em] opacity-40">{metric.label}</span>
                  </div>
                  <div className="text-6xl font-mono font-black tabular-nums tracking-tighter">
                     {metric.value}
                  </div>
               </div>
               {/* Biological Decorator */}
               <div className="absolute top-0 right-0 h-full w-24 bg-foreground/[0.02] border-l border-border hidden sm:flex items-center justify-center">
                  <div className="rotate-90 text-[10px] font-mono opacity-10 whitespace-nowrap tracking-widest uppercase">
                     Verified Data Stream
                  </div>
               </div>
            </div>
          ))}
        </section>

        {/* Strategic Methodology */}
        <section className="flex flex-col gap-12">
          <h2 className="text-4xl font-black tracking-tighter text-center sm:text-left italic opacity-20 uppercase">
             {dictionary.program_details.methodology}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {program.methods.map((method: any, i: number) => (
              <div key={i} className="p-10 bg-background border border-border rounded-[2.5rem] flex flex-col gap-6 hover:border-foreground/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary-green group-hover:scale-110 transition-transform">
                  {icons[i % icons.length]}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">{method.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed text-justify">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Field Reports */}
        {relatedStories.length > 0 && (
          <section className="flex flex-col gap-12 pt-12 border-t border-border">
             <h2 className="text-4xl font-black tracking-tighter">{dictionary.program_details.related_stories}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedStories.map((story) => (
                  <Link 
                    key={story.slug}
                    href={`/${lang}/stories/${story.slug}`}
                    className="group bg-surface rounded-[2.5rem] overflow-hidden border border-border hover:border-foreground/30 transition-all flex flex-col sm:flex-row h-full"
                  >
                    <div className="relative h-48 sm:h-auto sm:w-1/3 overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center flex-1 gap-3">
                       <h3 className="text-xl font-bold leading-tight group-hover:text-primary-green transition-colors">{story.title}</h3>
                       <p className="text-xs opacity-60 line-clamp-2">{story.excerpt}</p>
                       <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground mt-2">
                          View Report <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                  </Link>
                ))}
             </div>
          </section>
        )}

        {/* Call to Action Overlay */}
        <section className="relative h-[300px] w-full rounded-[3rem] overflow-hidden bg-foreground flex items-center justify-center text-center p-12">
          <OptimizedPattern type="grid" color="white" opacity={0.1} />
          <div className="relative z-10 flex flex-col gap-6 items-center">
             <h2 className="text-4xl font-black tracking-tighter text-background leading-none">Power this mission.</h2>
             <div className="flex gap-4">
                <Link href={`/${lang}/volunteer`} className="px-8 h-12 bg-background text-foreground rounded-full flex items-center justify-center font-bold text-sm hover:opacity-90 transition-all">
                  Join as Volunteer
                </Link>
                <Link href={`/${lang}/donate`} className="px-8 h-12 border-2 border-background/20 text-background rounded-full flex items-center justify-center font-bold text-sm hover:bg-background/10 transition-all">
                  Support Financially
                </Link>
             </div>
          </div>
        </section>

      </div>
    </main>
  );
}
