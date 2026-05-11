'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ 
  lang, 
  dictionary
}: {
  lang: string;
  dictionary: any
}) {
  const pathname = usePathname();

  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-green-700/10 dark:border-green-400/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-sm brightness-110"
              />
              <span className="font-bold text-green-700 dark:text-green-500 hidden sm:block">
                {dictionary.common.title}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link href={`/${lang}/about`} className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
                {dictionary.common.about}
              </Link>
              <Link href={`/${lang}/programs`} className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
                {dictionary.common.programs}
              </Link>
              <Link href={`/${lang}/contact`} className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
                {dictionary.common.contact}
              </Link>
            </div>

            <div className="flex items-center gap-4 border-l border-green-700/10 dark:border-green-400/10 pl-6 ml-2">
              <a
                href="https://www.facebook.com/Greenity.Foundation.Bangladesh/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Greenity Foundation Bangladesh on Facebook"
                className="text-green-700 dark:text-green-400 hover:opacity-70 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <ThemeToggle dictionary={dictionary} />
              <Link
                href={redirectedPathname(lang === 'en' ? 'bn' : 'en')}
                className="text-sm font-semibold text-green-700 dark:text-green-400 hover:opacity-80 transition-opacity"
              >
                {lang === 'en' ? 'বাংলা' : 'English'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
