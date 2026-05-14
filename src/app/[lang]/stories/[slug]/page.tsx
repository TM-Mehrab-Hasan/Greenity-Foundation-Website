import fs from 'fs';
import path from 'path';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getStoryBySlug } from "@/lib/mdx";
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

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-8 sm:px-20 bg-background text-foreground eco-texture">
      <article className="max-w-3xl mx-auto flex flex-col gap-12">
        
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
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
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

        {/* Hero Image */}
        <div className="relative h-[400px] w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-foreground/5">
          <Image
            src={story.frontmatter.image}
            alt={story.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-xl dark:prose-invert prose-green max-w-none 
          prose-h1:text-4xl prose-h1:font-black prose-h1:tracking-tighter
          prose-h2:text-3xl prose-h2:font-black prose-h2:tracking-tight prose-h2:mt-12
          prose-p:text-xl prose-p:leading-relaxed prose-p:opacity-80
          prose-strong:text-foreground prose-strong:font-black
          prose-blockquote:border-l-4 prose-blockquote:border-primary-green prose-blockquote:bg-surface prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:text-2xl prose-blockquote:font-medium
          prose-li:text-lg prose-li:opacity-80
        ">
          <MDXRemote source={story.content} />
        </div>

      </article>
    </main>
  );
}
