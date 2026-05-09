import React, { useState } from 'react';
import {
  Phone, MapPin, CheckCircle, ChevronRight, Star, Menu, X,
  Clock, Shield, Zap, Car, Calendar, ChevronDown, ChevronUp,
  ArrowRight, Sparkles
} from 'lucide-react';

const PHONE = '647-222-6285';
const PHONE_HREF = 'tel:6472226285';

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

const faqs = [
  {
    q: 'How long does the restoration take?',
    a: 'Most jobs take 45–90 minutes per vehicle, depending on the severity of oxidation and the number of headlights being restored.',
  },
  {
    q: 'Do you come to my location?',
    a: 'Yes — we are a fully mobile service covering the entire Ottawa area. We come to your home, office, or wherever is most convenient for you.',
  },
  {
    q: 'How long will the results last?',
    a: 'Our professional-grade UV-protective coating keeps lenses clear for 2–3 years under normal conditions. We use the same multi-step process used by dealerships.',
  },
  {
    q: 'Is headlight restoration worth it vs. replacement?',
    a: 'Absolutely. New OEM headlights can cost $300–$1,000+ per side. Our restoration service delivers like-new clarity at a fraction of the cost.',
  },
  {
    q: 'Will restoration work on severely yellowed headlights?',
    a: 'In most cases, yes. We can restore headlights that are heavily yellowed, foggy, or hazed. If the damage is internal or the lens is cracked, we will let you know upfront.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve all of Ottawa and surrounding areas including Kanata, Barrhaven, Orleans, Gloucester, Nepean, and beyond.',
  },
];

type BookingStep = 1 | 2 | 3 | 4;

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  make: string;
  model: string;
  year: string;
  headlights: string;
  date: string;
  time: string;
  notes: string;
}

const emptyForm: FormData = {
  name: '', phone: '', email: '', address: '',
  make: '', model: '', year: '', headlights: '2',
  date: '', time: '', notes: '',
};

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

const validators: Partial<Record<keyof FormData, (v: string) => string>> = {
  name: v => v.trim().length < 2 ? 'Please enter your full name.' : '',
  phone: v => /^[\d\s\-().+]{7,15}$/.test(v.trim()) ? '' : 'Enter a valid phone number (e.g. 613-555-1234).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.',
  address: v => v.trim().length < 5 ? 'Enter your full service address.' : '',
  make: v => v.trim().length < 2 ? 'Enter the vehicle make (e.g. Toyota).' : '',
  model: v => v.trim().length < 1 ? 'Enter the vehicle model (e.g. Camry).' : '',
  year: v => /^\d{4}$/.test(v) && +v >= 1980 && +v <= new Date().getFullYear() + 1
    ? '' : `Enter a valid year between 1980 and ${new Date().getFullYear() + 1}.`,
  date: v => v && v >= getMinDate() ? '' : 'Please select a date starting from tomorrow.',
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState<BookingStep>(1);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const touch = (field: keyof FormData) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const errorFor = (field: keyof FormData) => {
    if (!touched[field]) return '';
    return validators[field]?.(form[field]) ?? '';
  };

  const fieldClass = (field: keyof FormData) => {
    const err = errorFor(field);
    const ok = touched[field] && !err && form[field];
    return `w-full bg-zinc-700 border rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none transition-colors ${
      err ? 'border-red-500 focus:border-red-400' :
      ok  ? 'border-green-500 focus:border-green-400' :
            'border-zinc-600 focus:border-amber-400'
    }`;
  };

  const isFieldValid = (field: keyof FormData) =>
    !validators[field] || validators[field]!(form[field]) === '';

  const step1Valid = isFieldValid('name') && isFieldValid('phone') && isFieldValid('email') && isFieldValid('address');
  const step2Valid = isFieldValid('make') && isFieldValid('model') && isFieldValid('year');
  const step3Valid = isFieldValid('date') && !!form.time;

  function touchStep(fields: (keyof FormData)[]) {
    setTouched(prev => Object.fromEntries([...Object.entries(prev), ...fields.map(f => [f, true])]));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'booking',
        name: form.name, phone: form.phone, email: form.email, address: form.address,
        make: form.make, model: form.model, year: form.year, headlights: form.headlights,
        date: form.date, time: form.time, notes: form.notes,
      }).toString(),
    }).finally(() => setSubmitted(true));
  }

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Book Now', href: '#booking' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased">

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-amber-400" />
              <span className="text-xl font-bold tracking-tight">
                Shine My <span className="text-amber-400">Lights</span> Headlight Restoration
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, -1).map(l => (
                <a key={l.href} href={l.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a href={PHONE_HREF}
                className="flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                <Phone className="h-4 w-4" />{PHONE}
              </a>
              <a href="#booking"
                className="bg-amber-400 text-zinc-950 text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-amber-300 transition-all duration-200 hover:scale-105">
                Book Now
              </a>
            </div>

            <button onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 text-zinc-400 hover:text-white">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4 space-y-3">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="block text-zinc-300 hover:text-white py-1">
                {l.label}
              </a>
            ))}
            <a href={PHONE_HREF}
              className="flex items-center gap-2 text-amber-400 font-semibold py-1">
              <Phone className="h-4 w-4" />{PHONE}
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-400/5 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <MapPin className="h-3.5 w-3.5" /> Mobile Service · All of Ottawa
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              See Clearly.<br />
              <span className="text-amber-400">Drive Safely.</span>
            </h1>
            <p className="text-zinc-400 text-xl leading-relaxed mb-8 max-w-lg">
              Professional headlight restoration that brings foggy, yellowed lenses back to showroom clarity — at your door, anywhere in Ottawa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#booking"
                className="bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl text-lg hover:bg-amber-300 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20">
                Book Your Appointment <ArrowRight className="h-5 w-5" />
              </a>
              <a href={PHONE_HREF}
                className="border border-zinc-700 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:border-amber-400/50 hover:bg-zinc-800 transition-all duration-200 flex items-center justify-center gap-2">
                <Phone className="h-5 w-5 text-amber-400" /> Call Now
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Shield, label: 'UV Coating Included' },
                { icon: Car, label: 'We Come to You' },
                { icon: Clock, label: '45–90 Min Service' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Icon className="h-4 w-4 text-amber-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-2 divide-x divide-zinc-800">
                <div className="p-6 text-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">Before</div>
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-yellow-900/60 via-yellow-800/40 to-zinc-800 flex items-center justify-center mb-4">
                    <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-yellow-700/80 to-yellow-900/80 flex items-center justify-center shadow-inner">
                      <div className="w-14 h-10 rounded bg-yellow-800/60 blur-sm" />
                    </div>
                  </div>
                  <p className="text-zinc-500 text-sm">Yellowed · Foggy · Hazed</p>
                </div>
                <div className="p-6 text-center bg-zinc-900/50">
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">After</div>
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-300/10 to-zinc-800 flex items-center justify-center mb-4">
                    <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-amber-300/60 to-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-400/30">
                      <div className="w-14 h-10 rounded bg-amber-200/30" />
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm">Crystal Clear · Protected</p>
                </div>
              </div>
              <div className="border-t border-zinc-800 p-4 flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-amber-400" />
                <span className="text-zinc-400">Results guaranteed or we redo it free</span>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 bg-zinc-900 border border-zinc-700 rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white font-bold text-sm">5.0 Rating</p>
              <p className="text-zinc-500 text-xs">200+ happy clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-4xl font-extrabold mb-4">Restoration Packages</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Every package includes multi-stage sanding, polishing, and a UV-protective clear coat.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Single',
                price: '$59',
                desc: 'One headlight restored to like-new condition.',
                features: ['Multi-stage wet sanding', 'Machine polish', 'UV sealant coat', '1-year protection'],
                highlight: false,
              },
              {
                name: 'Full Set',
                price: '$99',
                desc: 'Both headlights — our most popular package.',
                features: ['Multi-stage wet sanding', 'Machine polish', 'UV sealant coat', '2-year protection', 'Free touch-up within 30 days'],
                highlight: true,
              },
              {
                name: 'Full Set + Fog Lights',
                price: '$139',
                desc: 'Headlights and fog lights for maximum visibility.',
                features: ['Everything in Full Set', 'Fog light restoration', 'UV sealant coat', '2-year protection', 'Free touch-up within 30 days'],
                highlight: false,
              },
            ].map(pkg => (
              <div key={pkg.name}
                className={`relative rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                  
