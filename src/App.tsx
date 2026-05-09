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
  { q: 'How long does the restoration take?', a: 'Most jobs take 45–90 minutes per vehicle, depending on the severity of oxidation and the number of headlights being restored.' },
  { q: 'Do you come to my location?', a: 'Yes — we are a fully mobile service covering the entire Ottawa area. We come to your home, office, or wherever is most convenient for you.' },
  { q: 'How long will the results last?', a: 'Our professional-grade UV-protective coating keeps lenses clear for 2–3 years under normal conditions. We use the same multi-step process used by dealerships.' },
  { q: 'Is headlight restoration worth it vs. replacement?', a: 'Absolutely. New OEM headlights can cost $300–$1,000+ per side. Our restoration service delivers like-new clarity at a fraction of the cost.' },
  { q: 'Will restoration work on severely yellowed headlights?', a: 'In most cases, yes. We can restore headlights that are heavily yellowed, foggy, or hazed. If the damage is internal or the lens is cracked, we will let you know upfront.' },
  { q: 'What areas do you serve?', a: 'We serve all of Ottawa and surrounding areas including Kanata, Barrhaven, Orleans, Gloucester, Nepean, and beyond.' },
];

type BookingStep = 1 | 2 | 3 | 4;
interface FormData { name:string; phone:string; email:string; address:string; make:string; model:string; year:string; headlights:string; date:string; time:string; notes:string; }
const emptyForm: FormData = { name:'', phone:'', email:'', address:'', make:'', model:'', year:'', headlights:'2', date:'', time:'', notes:'' };
function getMinDate() { const d=new Date(); d.setDate(d.getDate()+1); return d.toISOString().split('T')[0]; }

const validators: Partial<Record<keyof FormData,(v:string)=>string>> = {
  name: v => v.trim().length < 2 ? 'Please enter your full name.' : '',
  phone: v => /^[\d\s\-().+]{7,15}$/.test(v.trim()) ? '' : 'Enter a valid phone number (e.g. 613-555-1234).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.',
  address: v => v.trim().length < 5 ? 'Enter your full service address.' : '',
  make: v => v.trim().length < 2 ? 'Enter the vehicle make (e.g. Toyota).' : '',
  model: v => v.trim().length < 1 ? 'Enter the vehicle model (e.g. Camry).' : '',
  year: v => /^\d{4}$/.test(v) && +v >= 1980 && +v <= new Date().getFullYear()+1 ? '' : `Enter a valid year between 1980 and ${new Date().getFullYear()+1}.`,
  date: v => v && v >= getMinDate() ? '' : 'Please select a date starting from tomorrow.',
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState<BookingStep>(1);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData,boolean>>>({});
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [submitted, setSubmitted] = useState(false);

  const update = (f:keyof FormData, v:string) => setForm(p=>({...p,[f]:v}));
  const touch = (f:keyof FormData) => setTouched(p=>({...p,[f]:true}));
  const errorFor = (f:keyof FormData) => !touched[f] ? '' : validators[f]?.(form[f]) ?? '';
  const fieldClass = (f:keyof FormData) => {
    const err=errorFor(f); const ok=touched[f]&&!err&&form[f];
    return `w-full bg-zinc-700 border rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none transition-colors ${err?'border-red-500 focus:border-red-400':ok?'border-green-500 focus:border-green-400':'border-zinc-600 focus:border-amber-400'}`;
  };
  const isValid = (f:keyof FormData) => !validators[f] || validators[f]!(form[f])==='';
  const step1Valid = isValid('name')&&isValid('phone')&&isValid('email')&&isValid('address');
  const step2Valid = isValid('make')&&isValid('model')&&isValid('year');
  const step3Valid = isValid('date')&&!!form.time;
  function touchStep(fields:(keyof FormData)[]) { setTouched(p=>Object.fromEntries([...Object.entries(p),...fields.map(f=>[f,true])])); }
  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({'form-name':'booking',name:form.name,phone:form.phone,email:form.email,address:form.address,make:form.make,model:form.model,year:form.year,headlights:form.headlights,date:form.date,time:form.time,notes:form.notes}).toString()}).finally(()=>setSubmitted(true));
  }

  const navLinks = [
    {label:'Services',href:'#services'},{label:'How It Works',href:'#how-it-works'},
    {label:'Reviews',href:'#reviews'},{label:'FAQ',href:'#faq'},{label:'Book Now',href:'#booking'},
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased">
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 mb-4"><Sparkles className="h-5 w-5 text-amber-400"/><span className="text-lg font-bold">Shine My <span className="text-amber-400">Lights</span> Headlight Restoration</span></div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(0,-1).map(l=>(
                <a key={l.href} href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors">{l.label}</a>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-4">
              <a href={PHONE_HREF} className="flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors"><Phone className="h-4 w-4"/>{PHONE}</a>
              <a href="#booking" className="bg-amber-400 text-zinc-950 text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-amber-300 transition-all duration-200 hover:scale-105">Book Now</a>
            </div>
            <button onClick={()=>setMenuOpen(v=>!v)} className="md:hidden p-2 text-zinc-400 hover:text-white">
              {menuOpen?<X className="h-6 w-6"/>:<Menu className="h-6 w-6"/>}
            </button>
          </div>
        </div>
        {menuOpen&&(
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4 space-y-3">
            {navLinks.map(l=>(<a key={l.href} href={l.href} onClick={()=>setMenuOpen(false)} className="block text-zinc-300 hover:text-white py-1">{l.label}</a>))}
            <a href={PHONE_HREF} className="flex items-center gap-2 text-amber-400 font-semibold py-1"><Phone className="h-4 w-4"/>{PHONE}</a>
          </div>
        )}
      </header>

      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none"/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <MapPin className="h-3.5 w-3.5"/> Mobile Service · All of Ottawa
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">See Clearly.<br/><span className="text-amber-400">Drive Safely.</span></h1>
            <p className="text-zinc-400 text-xl leading-relaxed mb-8 max-w-lg">Professional headlight restoration that brings foggy, yellowed lenses back to showroom clarity at your door, anywhere in Ottawa.</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#booking" className="bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl text-lg hover:bg-amber-300 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20">Book Your Appointment <ArrowRight className="h-5 w-5"/></a>
              <a href={PHONE_HREF} className="border border-zinc-700 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:border-amber-400/50 hover:bg-zinc-800 transition-all duration-200 flex items-center justify-center gap-2"><Phone className="h-5 w-5 text-amber-400"/> Call Now</a>
            </div>
            <div className="flex flex-wrap gap-6">
              {[{icon:Shield,label:'UV Coating Included'},{icon:Car,label:'We Come to You'},{icon:Clock,label:'45–90 Min Service'}].map(({icon:Icon,label})=>(
                <div key={label} className="flex items-center gap-2 text-zinc-400 text-sm"><Icon className="h-4 w-4 text-amber-400"/>{label}</div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-2 divide-x divide-zinc-800">
                <div className="p-6 text-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">Before</div>
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-yellow-900/60 via-yellow-800/40 to-zinc-800 flex items-center justify-center mb-4">
                    <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-yellow-700/80 to-yellow-900/80 flex items-center justify-center shadow-inner"><div className="w-14 h-10 rounded bg-yellow-800/60 blur-sm"/></div>
                  </div>
                  <p className="text-zinc-500 text-sm">Yellowed · Foggy · Hazed</p>
                </div>
                <div className="p-6 text-center bg-zinc-900/50">
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">After</div>
                  <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-300/10 to-zinc-800 flex items-center justify-center mb-4">
                    <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-amber-300/60 to-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-400/30"><div className="w-14 h-10 rounded bg-amber-200/30"/></div>
                  </div>
                  <p className="text-zinc-300 text-sm">Crystal Clear · Protected</p>
                </div>
              </div>
              <div className="border-t border-zinc-800 p-4 flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-amber-400"/><span className="text-zinc-400">Results guaranteed or we redo it free</span>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 bg-zinc-900 border border-zinc-700 rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-1 mb-1">{[...Array(5)].map((_,i)=>(<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400"/>))}</div>
              <p className="text-white font-bold text-sm">5.0 Rating</p>
              <p className="text-zinc-500 text-xs">200+ happy clients</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-4xl font-extrabold mb-4">Restoration Packages</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Every package includes multi-stage sanding, polishing, and a UV-protective clear coat.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {name:'Single',price:'$59',desc:'One headlight restored to like-new condition.',features:['Multi-stage wet sanding','Machine polish','UV sealant coat','1-year protection'],highlight:false},
              {name:'Full Set',price:'$99',desc:'Both headlights — our most popular package.',features:['Multi-stage wet sanding','Machine polish','UV sealant coat','2-year protection','Free touch-up within 30 days'],highlight:true},
              {name:'Full Set + Fog Lights',price:'$139',desc:'Headlights and fog lights for maximum visibility.',features:['Everything in Full Set','Fog light restoration','UV sealant coat','2-year protection','Free touch-up within 30 days'],highlight:false},
            ].map(pkg=>(
              <div key={pkg.name} className={`relative rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${pkg.highlight?'bg-amber-400 border-amber-300 text-zinc-950 shadow-2xl shadow-amber-400/30':'bg-zinc-800 border-zinc-700 hover:border-amber-400/40'}`}>
                {pkg.highlight&&(<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-950 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-amber-400/40">Most Popular</div>)}
                <h3 className={`text-xl font-bold mb-1 ${pkg.highlight?'text-zinc-950':'text-white'}`}>{pkg.name}</h3>
                <p className={`text-sm mb-4 ${pkg.highlight?'text-zinc-800':'text-zinc-400'}`}>{pkg.desc}</p>
                <div className={`text-4xl font-extrabold mb-6 ${pkg.highlight?'text-zinc-950':'text-amber-400'}`}>{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map(f=>(<li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle className={`h-4 w-4 flex-shrink-0 ${pkg.highlight?'text-zinc-900':'text-amber-400'}`}/><span className={pkg.highlight?'text-zinc-900':'text-zinc-300'}>{f}</span></li>))}
                </ul>
                <a href="#booking" className={`block text-center font-bold py-3 rounded-xl transition-all duration-200 ${pkg.highlight?'bg-zinc-950 text-amber-400 hover:bg-zinc-900':'bg-amber-400 text-zinc-950 hover:bg-amber-300'}`}>Book This Package</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-4xl font-extrabold mb-4">How It Works</h2>
            <p className="text-zinc-400 text-lg">Three easy steps to crystal-clear headlights.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {step:'01',icon:Calendar,title:'Book Online',desc:"Pick a date and time that works for you. We'll confirm within the hour."},
              {step:'02',icon:Car,title:'We Come to You',desc:'Our technician arrives at your home or office anywhere in Ottawa — no drop-off needed.'},
              {step:'03',icon:Sparkles,title:'Drive Clear',desc:'In under 90 minutes, your headlights are restored and protected. Safer driving starts today.'},
            ].map(({step,icon:Icon,title,desc})=>(
              <div key={step} className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center hover:border-amber-400/30 transition-colors">
                <div className="text-5xl font-extrabold text-zinc-800 mb-4 leading-none">{step}</div>
                <div className="w-14 h-14 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-5"><Icon className="h-6 w-6 text-amber-400"/></div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Why Shine My Lights Headlight Restoration</p>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">The Professional Standard.<br/>At Your Front Door.</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">Foggy headlights reduce light output by up to 80%, making night driving significantly more dangerous. We use a 5-step professional restoration system — the same process used by auto dealerships — and come directly to you.</p>
            <div className="space-y-4">
              {[
                {title:'Fully Mobile Service',desc:'We serve your driveway, parking lot, or office — anywhere in Ottawa.'},
                {title:'Professional-Grade Results',desc:'5-step system: sanding, polishing, and UV-protective coating for long-lasting clarity.'},
                {title:'Transparent Pricing',desc:'No hidden fees. What you see is what you pay — always.'},
                {title:'Satisfaction Guaranteed',desc:"Not satisfied? We'll redo it free. Your clarity is our reputation."},
              ].map(({title,desc})=>(
                <div key={title} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle className="h-3.5 w-3.5 text-amber-400"/></div>
                  <div><p className="font-semibold text-white">{title}</p><p className="text-zinc-400 text-sm mt-0.5">{desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{value:'200+',label:'Vehicles Restored'},{value:'5★',label:'Average Rating'},{value:'2–3yr',label:'Coating Lifespan'},{value:'$0',label:'Travel Fee'}].map(({value,label})=>(
              <div key={label} className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 text-center hover:border-amber-400/30 transition-colors">
                <div className="text-4xl font-extrabold text-amber-400 mb-2">{value}</div>
                <div className="text-zinc-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl font-extrabold mb-4">What Ottawa Drivers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {name:'Michael T.',location:'Kanata, ON',text:"Couldn't believe the difference. My 2015 Civic's headlights look brand new. The tech was on time, professional, and done in under an hour. Highly recommend."},
              {name:'Sarah L.',location:'Barrhaven, ON',text:'Was about to spend $600 on replacement headlights. This cost me $99 and the results are identical. Will be telling everyone I know about this service.'},
              {name:'David M.',location:'Orleans, ON',text:"Super convenient having them come to the house. My 2018 RAV4 lenses were severely yellowed and now they're crystal clear. Great value and great service."},
            ].map(({name,location,text})=>(
              <div key={name} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 hover:border-amber-400/20 transition-colors">
                <div className="flex items-center gap-1 mb-4">{[...Array(5)].map((_,i)=>(<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400"/>))}</div>
                <p className="text-zinc-300 leading-relaxed mb-6">"{text}"</p>
                <div><p className="font-semibold text-white">{name}</p><p className="text-zinc-500 text-sm flex items-center gap-1"><MapPin className="h-3 w-3"/> {location}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-24 bg-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Schedule Your Visit</p>
            <h2 className="text-4xl font-extrabold mb-4">Book an Appointment</h2>
            <p className="text-zinc-400 text-lg">We'll come to you. Takes less than 2 minutes to book.</p>
          </div>
          {submitted ? (
            <div className="bg-zinc-800 border border-amber-400/30 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto mb-6"><CheckCircle className="h-8 w-8 text-amber-400"/></div>
              <h3 className="text-2xl font-bold mb-3">Booking Request Received!</h3>
              <p className="text-zinc-400 mb-2">Thanks, <span className="text-white font-semibold">{form.name}</span>! We'll confirm your appointment via phone or email within the hour.</p>
              <p className="text-zinc-500 text-sm mb-8">{form.date} at {form.time} · {form.address}</p>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors"><Phone className="h-4 w-4"/> Questions? Call {PHONE}</a>
            </div>
          ) : (
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden">
              <div className="flex border-b border-zinc-700">
                {(['Contact','Vehicle','Schedule','Review'] as const).map((label,i)=>{
                  const s=(i+1) as BookingStep; const active=step===s; const done=step>s;
                  return (<div key={label} className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest transition-colors ${active?'text-amber-400 border-b-2 border-amber-400':done?'text-zinc-400':'text-zinc-600'}`}>{done?<CheckCircle className="h-4 w-4 mx-auto"/>:label}</div>);
                })}
              </div>
              <form onSubmit={handleSubmit} className="p-8">
                {step===1&&(
                  <div className="space-y-5">
                    <h3 className="text-xl font-bold mb-6">Your Contact Info</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div><label className="block text-sm font-medium text-zinc-400 mb-2">Full Name *</label><input value={form.name} onChange={e=>update('name',e.target.value)} onBlur={()=>touch('name')} className={fieldClass('name')} placeholder="Jane Smith"/>{errorFor('name')&&<p className="text-red-400 text-xs mt-1">{errorFor('name')}</p>}</div>
                      <div><label className="block text-sm font-medium text-zinc-400 mb-2">Phone Number *</label><input value={form.phone} onChange={e=>update('phone',e.target.value)} onBlur={()=>touch('phone')} type="tel" className={fieldClass('phone')} placeholder="613-555-1234"/>{errorFor('phone')&&<p className="text-red-400 text-xs mt-1">{errorFor('phone')}</p>}</div>
                    </div>
                    <div><label className="block text-sm font-medium text-zinc-400 mb-2">Email Address *</label><input value={form.email} onChange={e=>update('email',e.target.value)} onBlur={()=>touch('email')} type="email" className={fieldClass('email')} placeholder="jane@example.com"/>{errorFor('email')&&<p className="text-red-400 text-xs mt-1">{errorFor('email')}</p>}</div>
                    <div><label className="block text-sm font-medium text-zinc-400 mb-2">Service Address (Ottawa area) *</label><input value={form.address} onChange={e=>update('address',e.target.value)} onBlur={()=>touch('address')} className={fieldClass('address')} placeholder="123 Main St, Ottawa, ON"/>{errorFor('address')&&<p className="text-red-400 text-xs mt-1">{errorFor('address')}</p>}</div>
                  </div>
                )}
                {step===2&&(
                  <div className="space-y-5">
                    <h3 className="text-xl font-bold mb-6">Vehicle Details</h3>
                    <div className="grid sm:grid-cols-3 gap-5">
                      <div><label className="block text-sm font-medium text-zinc-400 mb-2">Make *</label><input value={form.make} onChange={e=>update('make',e.target.value)} onBlur={()=>touch('make')} className={fieldClass('make')} placeholder="Toyota"/>{errorFor('make')&&<p className="text-red-400 text-xs mt-1">{errorFor('make')}</p>}</div>
                      <div><label className="block text-sm font-medium text-zinc-400 mb-2">Model *</label><input value={form.model} onChange={e=>update('model',e.target.value)} onBlur={()=>touch('model')} className={fieldClass('model')} placeholder="Camry"/>{errorFor('model')&&<p className="text-red-400 text-xs mt-1">{errorFor('model')}</p>}</div>
                      <div><label className="block text-sm font-medium text-zinc-400 mb-2">Year *</label><input value={form.year} onChange={e=>update('year',e.target.value)} onBlur={()=>touch('year')} className={fieldClass('year')} placeholder="2018" maxLength={4}/>{errorFor('year')&&<p className="text-red-400 text-xs mt-1">{errorFor('year')}</p>}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-3">What needs restoring?</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[{value:'1',label:'1 Headlight',price:'$59'},{value:'2',label:'2 Headlights',price:'$99'},{value:'3',label:'Headlights + Fog',price:'$139'}].map(opt=>(
                          <label key={opt.value} className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${form.headlights===opt.value?'border-amber-400 bg-amber-400/10':'border-zinc-600 hover:border-zinc-500'}`}>
                            <input type="radio" name="headlights" value={opt.value} checked={form.headlights===opt.value} onChange={()=>update('headlights',opt.value)} className="sr-only"/>
                            <div className="font-semibold text-sm text-white mb-1">{opt.label}</div>
                            <div className={`text-lg font-bold ${form.headlights===opt.value?'text-amber-400':'text-zinc-400'}`}>{opt.price}</div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div><label className="block text-sm font-medium text-zinc-400 mb-2">Additional Notes</label><textarea value={form.notes} onChange={e=>update('notes',e.target.value)} rows={3} className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors resize-none" placeholder="Anything we should know about your vehicle or the headlights?"/></div>
                  </div>
                )}
                {step===3&&(
                  <div className="space-y-5">
                    <h3 className="text-xl font-bold mb-6">Pick a Date & Time</h3>
                    <div><label className="block text-sm font-medium text-zinc-400 mb-2">Preferred Date *</label><input value={form.date} onChange={e=>update('date',e.target.value)} onBlur={()=>touch('date')} type="date" min={getMinDate()} className={fieldClass('date')}/>{errorFor('date')&&<p className="text-red-400 text-xs mt-1">{errorFor('date')}</p>}</div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-3">Preferred Time *</label>
                      <div className="grid grid-cols-5 gap-2">
                        {timeSlots.map(t=>(<button key={t} type="button" onClick={()=>update('time',t)} className={`py-2.5 rounded-lg text-sm font-medium transition-all ${form.time===t?'bg-amber-400 text-zinc-950':'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}>{t}</button>))}
                      </div>
                    </div>
                    <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4 text-sm text-zinc-400"><Zap className="h-4 w-4 text-amber-400 inline mr-2"/>We'll confirm your exact appointment within 1 hour of booking.</div>
                  </div>
                )}
                {step===4&&(
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-6">Review & Confirm</h3>
                    <div className="bg-zinc-700/50 rounded-xl p-6 space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[{label:'Name',value:form.name},{label:'Phone',value:form.phone},{label:'Email',value:form.email},{label:'Address',value:form.address},{label:'Vehicle',value:`${form.year} ${form.make} ${form.model}`},{label:'Service',value:form.headlights==='1'?'1 Headlight — $59':form.headlights==='2'?'2 Headlights — $99':'Headlights + Fog — $139'},{label:'Date',value:form.date},{label:'Time',value:form.time}].map(({label,value})=>(
                          <div key={label}><p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">{label}</p><p className="text-white font-medium">{value}</p></div>
                        ))}
                      </div>
                      {form.notes&&(<div><p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Notes</p><p className="text-zinc-300 text-sm">{form.notes}</p></div>)}
                    </div>
                    <p className="text-zinc-500 text-sm text-center">By confirming you agree to be contacted at the phone number and email provided above.</p>
                  </div>
                )}
                <div className="flex justify-between mt-8 pt-6 border-t border-zinc-700">
                  {step>1?(<button type="button" onClick={()=>setStep(s=>(s-1) as BookingStep)} className="text-zinc-400 hover:text-white font-medium transition-colors">← Back</button>):<div/>}
                  {step<4?(
                    <button type="button" onClick={()=>{ const sf:Record<number,(keyof FormData)[]>={1:['name','phone','email','address'],2:['make','model','year'],3:['date']}; touchStep(sf[step]??[]); const v=step===1?step1Valid:step===2?step2Valid:step3Valid; if(v)setStep(s=>(s+1) as BookingStep); }} className="bg-amber-400 text-zinc-950 font-bold px-8 py-3 rounded-xl hover:bg-amber-300 transition-all duration-200 flex items-center gap-2">Continue <ChevronRight className="h-4 w-4"/></button>
                  ):(
                    <button type="submit" className="bg-amber-400 text-zinc-950 font-bold px-8 py-3 rounded-xl hover:bg-amber-300 transition-all duration-200 flex items-center gap-2">Confirm Booking <CheckCircle className="h-4 w-4"/></button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      <section id="faq" className="py-24 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">FAQ</p><h2 className="text-4xl font-extrabold mb-4">Common Questions</h2></div>
          <div className="space-y-3">
            {faqs.map((faq,i)=>(
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  {openFaq===i?<ChevronUp className="h-5 w-5 text-amber-400 flex-shrink-0"/>:<ChevronDown className="h-5 w-5 text-zinc-500 flex-shrink-0"/>}
                </button>
                {openFaq===i&&(<div className="px-6 pb-5 text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">{faq.a}</div>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"/>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-zinc-950 mb-4">Ready for Crystal-Clear Headlights?</h2>
          <p className="text-zinc-800 text-lg mb-8">Book online or call us we'll be at your door, anywhere in Ottawa.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking" className="bg-zinc-950 text-white font-bold px-8 py-4 rounded-xl hover:bg-zinc-800 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"><Calendar className="h-5 w-5"/> Book Online</a>
            <a href={PHONE_HREF} className="border-2 border-zinc-950 text-zinc-950 font-bold px-8 py-4 rounded-xl hover:bg-zinc-950/10 transition-all duration-200 flex items-center justify-center gap-2"><Phone className="h-5 w-5"/> {PHONE}</a>
          </div>
        </div>
      </section>

      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4"><Sparkles className="h-5 w-5 text-amber-400"/><span className="text-lg font-bold">Shine My <span className="text-amber-400">Lights</span> Headlight Restoration</span></div>
              <p className="text-zinc-500 text-sm leading-relaxed">Professional mobile headlight restoration serving Ottawa and surrounding areas. We come to you.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-zinc-500 text-sm">{navLinks.map(l=>(<li key={l.href}><a href={l.href} className="hover:text-amber-400 transition-colors">{l.label}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <div className="space-y-3 text-sm">
                <a href={PHONE_HREF} className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors"><Phone className="h-4 w-4 text-amber-400"/> {PHONE}</a>
                <div className="flex items-start gap-2 text-zinc-400"><MapPin className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0"/><span>Ottawa, ON & surrounding area<br/>Kanata · Barrhaven · Orleans · Nepean · Gloucester</span></div>
                <div className="flex items-center gap-2 text-zinc-400"><Clock className="h-4 w-4 text-amber-400"/>Mon–Sat · 8:00 AM – 6:00 PM</div>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 text-center text-zinc-600 text-sm">© {new Date().getFullYear()} Shine My Lights Headlight Restoration. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
