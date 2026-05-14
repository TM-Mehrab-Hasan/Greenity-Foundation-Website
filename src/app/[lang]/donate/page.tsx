'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Heart, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { useEffect } from 'react';

const donationSchema = z.object({
  amount: z.string().min(1, 'Please select or enter an amount'),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  anonymous: z.boolean(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const PREDEFINED_AMOUNTS = ['500', '1000', '2500', '5000'];

export default function DonatePage() {
  const params = useParams();
  const lang = params.lang as 'en' | 'bn';
  const [dictionary, setDictionary] = useState<any>(null);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<string>('1000');
  const [isCustom, setIsCustom] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    getDictionary(lang).then(setDictionary);
  }, [lang]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: '1000',
      anonymous: false,
    },
  });

  const onSubmit = async (data: DonationFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Donation Data:', { ...data, frequency });
    setIsSubmitted(true);
  };

  if (!dictionary) return null;

  const d = dictionary.donate;

  if (isSubmitted) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center eco-texture">
        <div className="max-w-md w-full text-center p-12 bg-surface rounded-[3rem] border border-border shadow-2xl shadow-foreground/5 animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-10 h-10 fill-current" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-4 text-foreground">
            Thank You!
          </h2>
          <p className="text-xl opacity-70 leading-relaxed mb-8">
            Your support brings us closer to a plastic-free Bangladesh. A confirmation email has been sent to your inbox.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full py-4 bg-foreground text-background rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 eco-texture bg-background transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Left Column: Context & Vision */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-32">
          <div className="inline-flex self-start px-4 py-2 rounded-full bg-surface border border-border text-xs font-bold uppercase tracking-widest text-foreground">
            {d.title}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-foreground">
            {d.title}
          </h1>
          <p className="text-xl opacity-70 leading-relaxed max-w-lg">
            {d.subtitle}
          </p>
          
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div className="flex gap-4 items-start p-6 bg-surface/50 rounded-3xl border border-border/50">
              <Leaf className="w-6 h-6 text-foreground shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">{d.impact_notice}</h3>
                <p className="text-sm opacity-60">Transparency is our core value. Every contribution is tracked.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 bg-surface/50 rounded-3xl border border-border/50">
              <ShieldCheck className="w-6 h-6 text-foreground shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">{d.secure_notice}</h3>
                <p className="text-sm opacity-60">We use industry-standard encryption to protect your data.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="bg-surface p-8 sm:p-12 rounded-[3rem] border border-border shadow-2xl shadow-foreground/5 relative overflow-hidden">
          
          {/* Step Indicator */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((step) => (
              <div 
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-500 ${
                  (step === 1) || (step === 2 && watch('amount')) || (step === 3 && watch('name') && watch('email'))
                    ? 'bg-foreground text-background scale-110 shadow-lg' 
                    : 'bg-background text-foreground/30 border border-border'
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 relative z-10">
            
            {/* Frequency Toggle */}
            <div className="flex p-1 bg-background/50 rounded-2xl border border-border self-start">
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  frequency === 'one-time' ? 'bg-foreground text-background shadow-lg' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {d.frequency_one_time}
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  frequency === 'monthly' ? 'bg-foreground text-background shadow-lg' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {d.frequency_monthly}
              </button>
            </div>

            {/* Amount Selection */}
            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold uppercase tracking-widest opacity-40">
                {d.select_amount} ({d.currency})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PREDEFINED_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setValue('amount', amt);
                      setIsCustom(false);
                    }}
                    className={`py-4 rounded-2xl border-2 font-mono font-bold text-lg transition-all ${
                      selectedAmount === amt && !isCustom
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-background border-border hover:border-foreground/30'
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`w-full py-4 px-6 rounded-2xl border-2 font-bold text-left transition-all flex justify-between items-center ${
                    isCustom ? 'border-foreground bg-background' : 'border-border bg-background/50 hover:border-foreground/30'
                  }`}
                >
                  <span className={isCustom ? 'opacity-100' : 'opacity-40'}>
                    {d.custom_amount}
                  </span>
                  {isCustom && (
                    <input
                      {...register('amount')}
                      type="number"
                      autoFocus
                      placeholder="0.00"
                      className="bg-transparent border-none outline-none text-right font-mono font-bold text-xl w-32"
                      onChange={(e) => setSelectedAmount(e.target.value)}
                    />
                  )}
                </button>
              </div>
              {errors.amount && (
                <span className="text-red-500 text-xs font-bold">{errors.amount.message}</span>
              )}
            </div>

            <hr className="border-border" />

            {/* Personal Info */}
            <div className="flex flex-col gap-6">
              <label className="text-sm font-bold uppercase tracking-widest opacity-40">
                {d.personal_info}
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <input
                    {...register('name')}
                    placeholder={d.name}
                    className="w-full p-4 bg-background border border-border rounded-2xl focus:border-foreground outline-none transition-all"
                  />
                  {errors.name && <span className="text-red-500 text-xs font-bold">{errors.name.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder={d.email}
                    className="w-full p-4 bg-background border border-border rounded-2xl focus:border-foreground outline-none transition-all"
                  />
                  {errors.email && <span className="text-red-500 text-xs font-bold">{errors.email.message}</span>}
                </div>
              </div>

              <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setValue('anonymous', !watch('anonymous'))}>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${watch('anonymous') ? 'bg-foreground border-foreground' : 'border-border'}`}>
                  {watch('anonymous') && <ShieldCheck className="w-4 h-4 text-background" />}
                </div>
                <span className="text-sm font-bold opacity-60">{d.anonymous}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="group w-full py-6 bg-foreground text-background rounded-2xl font-black uppercase tracking-widest text-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-background/30 border-t-background rounded-full animate-spin" />
              ) : (
                <>
                  {d.submit}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-xs opacity-40 font-bold uppercase tracking-tighter">
              {d.secure_notice}
            </p>

          </form>
        </div>

      </div>
    </main>
  );
}
