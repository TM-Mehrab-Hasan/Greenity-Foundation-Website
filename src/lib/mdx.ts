import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/stories');

export interface Story {
  slug: string;
  lang: 'en' | 'bn';
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
}

export async function getStories(lang: 'en' | 'bn'): Promise<Story[]> {
  const dirPath = path.join(contentDirectory, lang);
  
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath);

  const stories = files.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(dirPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      lang,
      ...(data as Omit<Story, 'slug' | 'lang'>),
    };
  });

  return stories.sort((a: Story, b: Story) => (a.date < b.date ? 1 : -1));
}

export async function getStoryBySlug(slug: string, lang: 'en' | 'bn') {
  const fullPath = path.join(contentDirectory, lang, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    lang,
    frontmatter: data as Omit<Story, 'slug' | 'lang'>,
    content,
  };
}
