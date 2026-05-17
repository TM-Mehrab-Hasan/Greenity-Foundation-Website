'use client';

import { useState } from 'react';
import { z } from 'zod';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';

const volunteerSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  location: z.string().min(2, "Please enter your location"),
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Please tell us a bit more (min 10 characters)"),
});

export default function VolunteerForm({ 
  dictionary, 
  lang 
}: { 
  dictionary: any, 
  lang: string 
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      interest: formData.get('interest') as string,
      message: formData.get('message') as string,
    };

    const result = volunteerSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center gap-8 py-12 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-black tracking-tighter">{dictionary.success_title}</h2>
          <p className="text-xl text-foreground/60 max-w-md mx-auto leading-relaxed">
            {dictionary.success_message}
          </p>
        </div>
        <a 
          href={`/${lang}`}
          className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-opacity"
        >
          <Home className="w-5 h-5" />
          {dictionary.back_home}
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {/* Simple Progress Indicator */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-1 bg-foreground/5 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-1/2 transition-all duration-1000"></div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">Portal Intake / Phase 01</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        {/* Personal Info Section */}
        <div className="flex flex-col gap-8 relative">
          <div className="flex flex-col gap-2 relative group/section">
            {/* Biological Callout Point */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
            
            <h3 className="text-2xl font-black tracking-tight">{dictionary.personal_info}</h3>
            <div className="h-1 w-12 bg-green-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-40">{dictionary.full_name}</label>
              <input 
                name="fullName"
                placeholder="John Doe"
                className={`h-14 px-6 rounded-2xl bg-surface border ${errors.fullName ? 'border-red-500' : 'border-border'} focus:border-green-500/50 focus:ring-4 focus:ring-green-500/5 outline-none transition-all font-medium`}
              />
              {errors.fullName && <span className="text-xs font-bold text-red-500 mt-1">{errors.fullName}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-40">{dictionary.email}</label>
              <input 
                name="email"
                type="email"
                placeholder="john@example.com"
                className={`h-14 px-6 rounded-2xl bg-surface border ${errors.email ? 'border-red-500' : 'border-border'} focus:border-green-500/50 focus:ring-4 focus:ring-green-500/5 outline-none transition-all font-medium`}
              />
              {errors.email && <span className="text-xs font-bold text-red-500 mt-1">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-40">{dictionary.phone}</label>
              <input 
                name="phone"
                placeholder="+880 1XXX XXXXXX"
                className={`h-14 px-6 rounded-2xl bg-surface border ${errors.phone ? 'border-red-500' : 'border-border'} focus:border-green-500/50 focus:ring-4 focus:ring-green-500/5 outline-none transition-all font-medium`}
              />
              {errors.phone && <span className="text-xs font-bold text-red-500 mt-1">{errors.phone}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-40">{dictionary.location}</label>
              <input 
                name="location"
                placeholder="Dhaka, Bangladesh"
                className={`h-14 px-6 rounded-2xl bg-surface border ${errors.location ? 'border-red-500' : 'border-border'} focus:border-green-500/50 focus:ring-4 focus:ring-green-500/5 outline-none transition-all font-medium`}
              />
              {errors.location && <span className="text-xs font-bold text-red-500 mt-1">{errors.location}</span>}
            </div>
          </div>
        </div>

        {/* Skills & Interests Section */}
        <div className="flex flex-col gap-8 relative">
          <div className="flex flex-col gap-2 relative group/section">
            {/* Biological Callout Point */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm delay-500"></div>

            <h3 className="text-2xl font-black tracking-tight">{dictionary.skills_interest}</h3>
            <div className="h-1 w-12 bg-green-500 rounded-full"></div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold uppercase tracking-widest opacity-40">{dictionary.interests}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'cleanup', label: dictionary.interest_cleanup },
                  { id: 'trees', label: dictionary.interest_trees },
                  { id: 'edu', label: dictionary.interest_edu },
                  { id: 'policy', label: dictionary.interest_policy }
                ].map((interest) => (
                  <label key={interest.id} className="relative flex items-center p-4 rounded-2xl bg-surface border border-border hover:border-foreground/20 cursor-pointer transition-all has-[:checked]:border-foreground has-[:checked]:bg-foreground/5 group">
                    <input type="radio" name="interest" value={interest.id} className="sr-only" />
                    <div className="w-5 h-5 rounded-full border-2 border-border mr-4 flex items-center justify-center group-has-[:checked]:border-foreground transition-all">
                      <div className="w-2.5 h-2.5 rounded-full bg-foreground scale-0 group-has-[:checked]:scale-100 transition-transform"></div>
                    </div>
                    <span className="font-bold">{interest.label}</span>
                  </label>
                ))}
              </div>
              {errors.interest && <span className="text-xs font-bold text-red-500 mt-1">{errors.interest}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-widest opacity-40">{dictionary.message}</label>
              <textarea 
                name="message"
                rows={4}
                placeholder="..."
                className={`p-6 rounded-2xl bg-surface border ${errors.message ? 'border-red-500' : 'border-border'} focus:border-green-500/50 focus:ring-4 focus:ring-green-500/5 outline-none transition-all font-medium resize-none`}
              />
              {errors.message && <span className="text-xs font-bold text-red-500 mt-1">{errors.message}</span>}
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="h-16 px-10 rounded-full bg-foreground text-background font-black text-xl flex items-center justify-center gap-3 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl shadow-foreground/10"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-4 border-background/30 border-t-background rounded-full animate-spin"></div>
          ) : (
            <>
              {dictionary.submit}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
