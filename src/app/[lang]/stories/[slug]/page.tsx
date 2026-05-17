import fs from 'fs';
import path from 'path';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getStoryBySlug, getStories } from "@/lib/mdx";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), 'src/content/stories');
  const langs = ['en', 'bn'];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of langs) {
    const dirPath = path.join(contentDirectory, lang);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach((file) => {
        params.push({
          lang,
          slug: file.replace(/\.mdx$/, ''),
        });
      });
    }
  }

  return params;
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');
  const story = await getStoryBySlug(slug, lang as 'en' | 'bn');
  const allStories = await getStories(lang as 'en' | 'bn');

  if (!story) {
    notFound();
  }

  // Related stories (excluding current)
  const relatedStories = allStories
    .filter(s => s.slug !== slug)
    .slice(0, 2);

  const callouts = (story.frontmatter as any).callouts || [];

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 sm:px-20 bg-background text-foreground eco-texture">
      <article className="max-w-4xl mx-auto flex flex-col gap-12">

        {/* Navigation */}
        <Link
          href={`/${lang}/stories`}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"      
        >
          <ArrowLeft className="w-4 h-4" />
          {dictionary.stories.back}
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-8">
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.9]">
            {story.frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest opacity-40 border-y border-border py-6">      
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {dictionary.stories.author} {story.frontmatter.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(story.frontmatter.date).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </header>

        {/* Hero Image with Interactive Callouts */}
        <div className="relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-foreground/5 group">
          <Image
            src={story.frontmatter.image}
            alt={story.frontmatter.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>

          {/* Callouts */}
          {callouts.map((callout: any, i: number) => (
            <div 
              key={i}
              className="absolute group/callout"
              style={{ top: `${callout.y}%`, left: `${callout.x}%` }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full border-2 border-green-500 animate-pulse shadow-lg"></div>
                <div className="absolute left-6 whitespace-nowrap bg-foreground text-background px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/callout:opacity-100 -translate-x-2 group-hover/callout:translate-x-0 transition-all duration-300 pointer-events-none border border-background/20">
                  {callout.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-xl dark:prose-invert prose-green max-w-none
          prose-h1:text-4xl prose-h1:font-black prose-h1:tracking-tighter
          prose-h2:text-3xl prose-h2:font-black prose-h2:tracking-tight prose-h2:mt-12
          prose-h3:text-2xl prose-h3:font-black prose-h3:tracking-tight prose-h3:mt-8
          prose-p:text-xl prose-p:leading-relaxed prose-p:opacity-80 prose-p:text-justify
          prose-strong:text-foreground prose-strong:font-black
          prose-blockquote:border-l-4 prose-blockquote:border-primary-green prose-blockquote:bg-surface prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:text-2xl prose-blockquote:font-medium prose-blockquote:text-justify
          prose-li:text-lg prose-li:opacity-80 prose-li:text-justify
        ">
          <MDXRemote source={story.content} />
        </div>

        {/* Related Stories Section */}
        {relatedStories.length > 0 && (
          <section className="mt-24 pt-16 border-t border-border flex flex-col gap-12">
            <h2 className="text-4xl font-black tracking-tighter">More Stories of Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedStories.map((s) => (
                <Link 
                  key={s.slug}
                  href={`/${lang}/stories/${s.slug}`}
                  className="group flex flex-col gap-6"
                >
                  <div className="relative h-48 w-full rounded-[2rem] overflow-hidden border border-border group-hover:border-foreground/30 transition-all">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 448px"
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold group-hover:text-primary-green transition-colors">{s.title}</h3>
                    <p className="text-sm opacity-60 line-clamp-2">{s.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </article>
    </main>
  );
}
