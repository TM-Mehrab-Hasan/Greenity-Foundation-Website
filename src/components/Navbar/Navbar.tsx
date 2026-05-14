'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar({ 
  lang, 
  dictionary
}: {
  lang: string;
  dictionary: any
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const navLinks = [
    { href: `/${lang}/about`, label: dictionary.common.about },
    { href: `/${lang}/programs`, label: dictionary.common.programs },
    { href: `/${lang}/stories`, label: dictionary.common.stories },
    { href: `/${lang}/contact`, label: dictionary.common.contact },
  ];

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
              <span className="font-bold text-green-700 dark:text-green-500 hidden sm:block tracking-tighter">
                {dictionary.common.title}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href={`/${lang}/donate`}
              className="px-4 py-2 bg-foreground text-background rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Heart className="w-3 h-3 fill-current" />
              {dictionary.common.donate}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 border-l border-green-700/10 dark:border-green-400/10 pl-4 ml-2">
              <ThemeToggle dictionary={dictionary} />
              <Link
                href={redirectedPathname(lang === 'en' ? 'bn' : 'en')}
                className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400 hover:opacity-80 transition-opacity"
              >
                {lang === 'en' ? 'BN' : 'EN'}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 top-16 bg-background z-40 md:hidden transition-all duration-500 ease-in-out eco-texture
        ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}
      `}>
        <div className="flex flex-col p-8 gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="text-4xl font-black tracking-tighter text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href={`/${lang}/donate`}
            className="text-4xl font-black tracking-tighter text-green-600 dark:text-green-400 flex items-center gap-4"
          >
            {dictionary.common.donate}
            <Heart className="w-8 h-8 fill-current" />
          </Link>
          
          <div className="mt-auto pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-8">
             <ThemeToggle dictionary={dictionary} />
             <Link
                href={redirectedPathname(lang === 'en' ? 'bn' : 'en')}
                className="text-lg font-bold uppercase tracking-widest"
              >
                {lang === 'en' ? 'Bengali (বাংলা)' : 'English (EN)'}
              </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
