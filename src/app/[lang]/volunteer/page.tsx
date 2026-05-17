import { getDictionary } from "@/dictionaries/get-dictionary";
import VolunteerForm from "@/components/Volunteer/VolunteerForm";

export default async function VolunteerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');

  return (
    <div className="flex flex-col items-center min-h-screen font-sans selection:bg-green-100 selection:text-green-900">
      {/* Decorative Grid Background */}
      <div className="fixed inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <main className="relative z-10 w-full max-w-4xl px-8 py-24 sm:py-32 flex flex-col gap-16">
        <header className="flex flex-col gap-6 text-center sm:text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground">
            {dictionary.volunteer.title}
          </h1>
          <p className="text-xl sm:text-2xl text-foreground/60 max-w-2xl leading-relaxed text-justify">
            {dictionary.volunteer.subtitle}
          </p>
        </header>

        <section className="bg-background border border-border rounded-[3rem] p-8 sm:p-16 shadow-2xl shadow-foreground/5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <VolunteerForm dictionary={dictionary.volunteer.form} lang={lang} />
        </section>
      </main>
    </div>
  );
}
