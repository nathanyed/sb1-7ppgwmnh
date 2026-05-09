

      {/* ── WHY US ── */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Why Shine My Lights Headlight Restoration</p>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              The Professional Standard.<br />At Your Front Door.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Foggy headlights reduce light output by up to 80%, making night driving significantly more dangerous. We use a 5-step professional restoration system — the same process used by auto dealerships — and come directly to you.
            </p>
            <div className="space-y-4">
              {[
                { title: 'Fully Mobile Service', desc: 'We serve your driveway, parking lot, or office — anywhere in Ottawa.' },
                { title: 'Professional-Grade Results', desc: '5-step system: sanding, polishing, and UV-protective coating for long-lasting clarity.' },
                { title: 'Transparent Pricing', desc: 'No hidden fees. What you see is what you pay — always.' },
                { title: 'Satisfaction Guaranteed', desc: "Not satisfied? We'll redo it free. Your clarity is our reputation." },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="text-zinc-400 text-sm mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '200+', label: 'Vehicles Restored' },
              { value: '5★', label: 'Average Rating' },
              { value: '2–3yr', label: 'Coating Lifespan' },
              { value: '$0', label: 'Travel Fee' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 text-center hover:border-amber-400/30 transition-colors">
                <div className="text-4xl font-extrabold text-amber-400 mb-2">{value}</div>
                <div className="text-zinc-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl font-extrabold mb-4">What Ottawa Drivers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Michael T.',
                location: 'Kanata, ON',
                text: "Couldn't believe the difference. My 2015 Civic's headlights look brand new. The tech was on time, professional, and done in under an hour. Highly recommend.",
              },
              {
                name: 'Sarah L.',
                location: 'Barrhaven, ON',
                text: 'Was about to spend $600 on replacement headlights. This cost me $99 and the results are identical. Will be telling everyone I know about this service.',
              },
              {
                name: 'David M.',
                location: 'Orleans, ON',
                text: "Super convenient having them come to the house. My 2018 RAV4 lenses were severely yellowed and now they're crystal clear. Great value and great service.",
              },
            ].map(({ name, location, text }) => (
              <div key={name} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 hover:border-amber-400/20 transition-colors">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-300 leading-relaxed mb-6">"{text}"</p>
                <div>
                  <p className="font-semibold text-white">{name}</p>
                  <p className="text-zinc-500 text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section id="booking" className="py-24 bg-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Schedule Your Visit</p>
            <h2 className="text-4xl font-extrabold mb-4">Book an Appointment</h2>
            <p className="text-zinc-400 text-lg">We'll come to you. Takes less than 2 minutes to book.</p>
          </div>

          {submitted ? (
            <div className="bg-zinc-800 border border-amber-400/30 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Booking Request Received!</h3>
              <p className="text-zinc-400 mb-2">
                Thanks, <span className="text-white font-semibold">{form.name}</span>! We'll confirm your appointment via phone or email within the hour.
              </p>
              <p className="text-zinc-500 text-sm mb-8">
                {form.date} at {form.time} · {form.address}
              </p>
              <a href={PHONE_HREF}
                className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                <Phone className="h-4 w-4" /> Questions? Call {PHONE}
              </a>
            </div>
          ) : (
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden">
              {/* Step indicators */}
              <div className="flex border-b border-zinc-700">
                {(['Contact', 'Vehicle', 'Schedule', 'Review'] as const).map((label, i) => {
                  const s = (i + 1) as BookingStep;
                  const active = step === s;
                  const done = step > s;
                  return (
                    <div key={label}
                      className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest transition-colors ${
                        active ? 'text-amber-400 border-b-2 border-amber-400' :
                        done ? 'text-zinc-400' : 'text-zinc-600'
                      }`}>
                      {done ? <CheckCircle className="h-4 w-4 mx-auto" /> : label}
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                {/* Step 1: Contact */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-bold mb-6">Your Contact Info</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name *</label>
                        <input value={form.name}
                          onChange={e => update('name', e.target.value)}
                          onBlur={() => touch('name')}
                          className={fieldClass('name')}
                          placeholder="Jane Smith" />
                        {errorFor('name') && <p className="text-red-400 text-xs mt-1">{errorFor('name')}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Phone Number *</label>
                        <input value={form.phone}
                          onChange={e => update('phone', e.target.value)}
                          onBlur={() => touch('phone')}
                          type="tel"
                          className={fieldClass('phone')}
                          placeholder="613-555-1234" />
                        {errorFor('phone') && <p className="text-red-400 text-xs mt-1">{errorFor('phone')}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address *</label>
                      <input value={form.email}
                        onChange={e => update('email', e.target.value)}
                        onBlur={() => touch('email')}
                        type="email"
                        className={fieldClass('email')}
                        placeholder="jane@example.com" />
                      {errorFor('email') && <p className="text-red-400 text-xs mt-1">{errorFor('email')}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Service Address (Ottawa area) *</label>
                      <input value={form.address}
                        onChange={e => update('address', e.target.value)}
                        onBlur={() => touch('address')}
                        className={fieldClass('address')}
                        placeholder="123 Main St, Ottawa, ON" />
                      {errorFor('address') && <p className="text-red-400 text-xs mt-1">{errorFor('address')}</p>}
                    </div>
                  </div>
                )}

                {/* Step 2: Vehicle */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-bold mb-6">Vehicle Details</h3>
                    <div className="grid sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Make *</label>
                        <input value={form.make}
                          onChange={e => update('make', e.target.value)}
                          onBlur={() => touch('make')}
                          className={fieldClass('make')}
                          placeholder="Toyota" />
                        {errorFor('make') && <p className="text-red-400 text-xs mt-1">{errorFor('make')}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Model *</label>
                        <input value={form.model}
                          onChange={e => update('model', e.target.value)}
                          onBlur={() => touch('model')}
                          className={fieldClass('model')}
                          placeholder="Camry" />
                        {errorFor('model') && <p className="text-red-400 text-xs mt-1">{errorFor('model')}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Year *</label>
                        <input value={form.year}
                          onChange={e => update('year', e.target.value)}
                          onBlur={() => touch('year')}
                          className={fieldClass('year')}
                          placeholder="2018" maxLength={4} />
                        {errorFor('year') && <p className="text-red-400 text-xs mt-1">{errorFor('year')}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-3">What needs restoring?</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: '1', label: '1 Headlight', price: '$59' },
                          { value: '2', label: '2 Headlights', price: '$99' },
                          { value: '3', label: 'Headlights + Fog', price: '$139' },
                        ].map(opt => (
                          <label key={opt.value}
                            className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                              form.headlights === opt.value
                                ? 'border-amber-400 bg-amber-400/10'
                                : 'border-zinc-600 hover:border-zinc-500'
                            }`}>
                            <input type="radio" name="headlights" value={opt.value}
                              checked={form.headlights === opt.value}
                              onChange={() => update('headlights', opt.value)}
                              className="sr-only" />
                            <div className="font-semibold text-sm text-white mb-1">{opt.label}</div>
                            <div className={`text-lg font-bold ${form.headlights === opt.value ? 'text-amber-400' : 'text-zinc-400'}`}>
                              {opt.price}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Additional Notes</label>
                      <textarea value={form.notes} onChange={e => update('notes', e.target.value)}
                        rows={3}
                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                        placeholder="Anything we should know about your vehicle or the headlights?" />
                    </div>
                  </div>
                )}

                {/* Step 3: Schedule */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-bold mb-6">Pick a Date & Time</h3>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Preferred Date *</label>
                      <input value={form.date}
                        onChange={e => update('date', e.target.value)}
                        onBlur={() => touch('date')}
                        type="date" min={getMinDate()}
                        className={fieldClass('date')} />
                      {errorFor('date') && <p className="text-red-400 text-xs mt-1">{errorFor('date')}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-3">Preferred Time *</label>
                      <div className="grid grid-cols-5 gap-2">
                        {timeSlots.map(t => (
                          <button key={t} type="button"
                            onClick={() => update('time', t)}
                            className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                              form.time === t
                                ? 'bg-amber-400 text-zinc-950'
                                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                            }`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4 text-sm text-zinc-400">
                      <Zap className="h-4 w-4 text-amber-400 inline mr-2" />
                      We'll confirm your exact appointment within 1 hour of booking.
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-6">Review & Confirm</h3>
                    <div className="bg-zinc-700/50 rounded-xl p-6 space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { label: 'Name', value: form.name },
                          { label: 'Phone', value: form.phone },
                          { label: 'Email', value: form.email },
                          { label: 'Address', value: form.address },
                          { label: 'Vehicle', value: `${form.year} ${form.make} ${form.model}` },
                          { label: 'Service', value: form.headlights === '1' ? '1 Headlight — $59' : form.headlights === '2' ? '2 Headlights — $99' : 'Headlights + Fog — $139' },
                          { label: 'Date', value: form.date },
                          { label: 'Time', value: form.time },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">{label}</p>
                            <p className="text-white font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                      {form.notes && (
                        <div>
                          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Notes</p>
                          <p className="text-zinc-300 text-sm">{form.notes}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-zinc-500 text-sm text-center">
                      By confirming you agree to be contacted at the phone number and email provided above.
                    </p>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-zinc-700">
                  {step > 1 ? (
                    <button type="button" onClick={() => setStep(s => (s - 1) as BookingStep)}
                      className="text-zinc-400 hover:text-white font-medium transition-colors flex items-center gap-2">
                      ← Back
                    </button>
                  ) : <div />}

                  {step < 4 ? (
                    <button type="button"
                      onClick={() => {
                        const stepFields: Record<number, (keyof FormData)[]> = {
                          1: ['name', 'phone', 'email', 'address'],
                          2: ['make', 'model', 'year'],
                          3: ['date'],
                        };
                        touchStep(stepFields[step] ?? []);
                        const valid = step === 1 ? step1Valid : step === 2 ? step2Valid : step3Valid;
                        if (valid) setStep(s => (s + 1) as BookingStep);
                      }}
                      className="bg-amber-400 text-zinc-950 font-bold px-8 py-3 rounded-xl hover:bg-amber-300 transition-all duration-200 flex items-center gap-2">
                      Continue <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button type="submit"
                      className="bg-amber-400 text-zinc-950 font-bold px-8 py-3 rounded-xl hover:bg-amber-300 transition-all duration-200 flex items-center gap-2">
                      Confirm Booking <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-extrabold mb-4">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="font-semibold text-white pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    : <ChevronDown className="h-5 w-5 text-zinc-500 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-zinc-950 mb-4">
            Ready for Crystal-Clear Headlights?
          </h2>
          <p className="text-zinc-800 text-lg mb-8">
            Book online or call us — we'll be at your door, anywhere in Ottawa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking"
              className="bg-zinc-950 text-white font-bold px-8 py-4 rounded-xl hover:bg-zinc-800 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" /> Book Online
            </a>
            <a href={PHONE_HREF}
              className="border-2 border-zinc-950 text-zinc-950 font-bold px-8 py-4 rounded-xl hover:bg-zinc-950/10 transition-all duration-200 flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-amber-400" />
                <span className="text-lg font-bold">Shine My <span className="text-amber-400">Lights</span> Headlight Restoration</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Professional mobile headlight restoration serving Ottawa and surrounding areas. We come to you.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-zinc-500 text-sm">
                {navLinks.map(l => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-amber-400 transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <div className="space-y-3 text-sm">
                <a href={PHONE_HREF}
                  className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors">
                  <Phone className="h-4 w-4 text-amber-400" /> {PHONE}
                </a>
                <div className="flex items-start gap-2 text-zinc-400">
                  <MapPin className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Ottawa, ON & surrounding area<br />Kanata · Barrhaven · Orleans · Nepean · Gloucester</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="h-4 w-4 text-amber-400" />
                  Mon–Sat · 8:00 AM – 6:00 PM
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 text-center text-zinc-600 text-sm">
            © {new Date().getFullYear()} Shine My Lights Headlight Restoration. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
