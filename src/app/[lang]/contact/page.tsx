import { getDictionary } from "@/dictionaries/get-dictionary";
import Image from "next/image";
import Link from "next/link";

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground eco-texture">
      <main className="flex flex-col gap-16 py-20 px-8 sm:px-20 max-w-6xl w-full">
        {/* Header */}
        <section className="flex flex-col gap-6 text-center sm:text-left">
          <div className="inline-flex self-center sm:self-start px-3 py-1 rounded-full bg-surface text-primary-green text-xs font-bold uppercase tracking-widest border border-border">
            {dictionary.common.contact}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
            {dictionary.contact.title}
          </h1>
          <p className="text-xl opacity-70 max-w-2xl leading-relaxed">
            {dictionary.contact.subtitle}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Cards */}
          <div className="flex flex-col gap-8">
            <div className="p-10 bg-surface rounded-[2.5rem] border border-border flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h2 className="text-3xl font-black tracking-tight">{dictionary.contact.office_title}</h2>
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-border shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Greenity Foundation Bangladesh</p>
                    <p className="opacity-70 text-justify">{dictionary.common.location}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-border shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{dictionary.contact.email_title}</p>
                    <p className="opacity-70 text-primary-green font-mono">info@greenityfoundation.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-background rounded-[2.5rem] border border-border flex flex-col gap-6 shadow-xl shadow-foreground/5 overflow-hidden relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>      
              <h2 className="text-3xl font-black tracking-tight">{dictionary.contact.involved_title}</h2>
              <p className="opacity-70 leading-relaxed text-justify">
                {dictionary.contact.involved_text}
              </p>
              <Link
                href={`/${lang}/volunteer`}
                className="mt-4 h-16 bg-foreground text-background rounded-full flex items-center justify-center font-bold text-lg hover:opacity-90 transition-opacity"
              >
                {dictionary.contact.volunteer_button}
              </Link>
            </div>
          </div>

          {/* Map/Image with Callouts */}
          <div className="relative h-full min-h-[400px] w-full rounded-[3rem] overflow-hidden border border-border group animate-in fade-in zoom-in-95 duration-1000 delay-300">
            <Image
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1000"
              alt="Our Impact"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

            {/* Biological Callout Points */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-white rounded-full border-2 border-green-500 animate-pulse shadow-sm group/callout">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-foreground text-background px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Operations Command
               </div>
            </div>
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white rounded-full border-2 border-green-500 animate-pulse shadow-sm delay-500 group/callout">
               <div className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-foreground text-background px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Volunteer Intake
               </div>
            </div>

            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-foreground text-sm font-black uppercase tracking-widest opacity-40 mb-2">Our Mission</p>
              <p className="text-foreground text-2xl font-black tracking-tight leading-tight text-justify">
                {dictionary.common.mission}
              </p>
            </div>
          </div>
        </div>      </main>

      <footer className="w-full py-12 px-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6 text-sm opacity-50">
        <div className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="Logo" width={24} height={24} className="grayscale" />
          <p>{dictionary.footer.rights} {dictionary.common.mission}.</p>
        </div>
      </footer>
    </div>
  );
}
