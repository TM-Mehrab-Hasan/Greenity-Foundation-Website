import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { getStories } from "@/lib/mdx";
import { ArrowRight, Calendar, User } from "lucide-react";

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');
  const stories = await getStories(lang as 'en' | 'bn');

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 sm:px-20 bg-background text-foreground eco-texture">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <section className="flex flex-col gap-8 text-center sm:text-left">
          <div className="inline-flex self-center sm:self-start px-3 py-1 rounded-full bg-surface text-primary-green text-xs font-bold uppercase tracking-widest border border-border">
            {dictionary.common.stories}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
            {dictionary.stories.title}
          </h1>
          <p className="text-xl opacity-70 max-w-2xl leading-relaxed">
            {dictionary.stories.subtitle}
          </p>
        </section>

        {/* Stories Grid */}
        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <Link 
                key={story.slug}
                href={`/${lang}/stories/${story.slug}`}
                className="group flex flex-col bg-surface rounded-[2.5rem] overflow-hidden border border-border hover:border-foreground/30 transition-all shadow-xl shadow-foreground/5"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
                </div>
                
                <div className="p-8 flex flex-col flex-1 gap-4">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-40">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(story.date).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-black tracking-tight leading-tight group-hover:text-primary-green transition-colors">
                    {story.title}
                  </h2>
                  
                  <p className="text-sm opacity-70 leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground group-hover:translate-x-2 transition-transform">
                    {dictionary.stories.read_more}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-border rounded-[3rem]">
            <p className="text-xl font-bold opacity-30 uppercase tracking-widest">
              {dictionary.stories.no_stories}
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
