export default function VolunteerLoading() {
  return (
    <div className="flex flex-col items-center min-h-screen font-sans">
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
        <div className="flex flex-col gap-6">
          <div className="h-16 sm:h-20 w-3/4 bg-foreground/10 rounded-2xl animate-pulse"></div>
          <div className="h-6 sm:h-8 w-1/2 bg-foreground/10 rounded-xl animate-pulse"></div>
        </div>

        <div className="bg-foreground/5 border border-border rounded-[3rem] h-[600px] w-full animate-pulse"></div>
      </main>
    </div>
  );
}
