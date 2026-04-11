/* =============================================================
   INOVITA – Home Page
   Design: "Dark Forge" – Industrial brutalism meets premium SaaS
   Accent: Electric lime-green #A8FF3E (oklch 0.88 0.22 128)
   Fonts: Syne (headings, bold) + DM Sans (body)
   ============================================================= */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronUp, ArrowRight, Calendar, Bell, RefreshCw, Zap, CheckCircle, Menu, X } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477852781/A3dhk77LgqLMa8zSKVsmA9/inovita-hero-bg-acLDCWZyCtaNri6qmAaiHp.webp";
const DEMO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477852781/A3dhk77LgqLMa8zSKVsmA9/inovita-demo-mockup-R4PTRg8WiLCiJDVxWm64GK.webp";
const STATS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477852781/A3dhk77LgqLMa8zSKVsmA9/inovita-stats-bg-AF3z7rVLpg9bxh2EDbABVT.webp";
const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477852781/A3dhk77LgqLMa8zSKVsmA9/inovita-cta-bg-6LbjVVHTzxqBwZAHjsFNyT.webp";

// ── Animated counter hook ──────────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Intersection observer hook ─────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Navbar ─────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { href: "#problemos", label: "Problemos" },
    { href: "#sprendimas", label: "Sprendimas" },
    { href: "#demo", label: "Demo" },
    { href: "#rezultatai", label: "Rezultatai" },
    { href: "#duk", label: "DUK" },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0A0E]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
      <div className="container flex items-center h-16 px-4 md:px-12">
        <a href="/" className="flex items-center gap-2 mr-auto">
          <div className="w-8 h-8 rounded-sm bg-[#A8FF3E] flex items-center justify-center">
            <Calendar className="w-4 h-4 text-[#0A0A0E]" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif' }} className="text-white font-bold text-lg tracking-tight">INOVITA</span>
        </a>
        <div className="hidden lg:flex items-center gap-10 mr-40">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium">{l.label}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/tapti-klientu" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2 border border-[#A8FF3E]/30 rounded hover:border-[#A8FF3E]/60 bg-[#A8FF3E]/5">
            Tapti klientu
          </Link>
          <a href="https://kosmetologija.perziura.lt/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2 border border-white/10 rounded hover:border-white/20">
            Peržiūrėti demo
          </a>
          <Link href="/analize" className="text-sm font-semibold bg-[#A8FF3E] text-[#0A0A0E] px-4 py-2 rounded hover:bg-[#bfff5e] transition-colors btn-primary-pulse">
            Gauti analizę
          </Link>
        </div>
        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0E]/98 border-t border-white/5 px-4 py-4 flex flex-col gap-3">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white/70 hover:text-white py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
          <Link href="/tapti-klientu" className="mt-2 text-center font-semibold border border-[#A8FF3E]/30 text-white px-4 py-2.5 rounded text-sm" onClick={() => setMobileOpen(false)}>
            Tapti klientu
          </Link>
          <Link href="/analize" className="text-center font-semibold bg-[#A8FF3E] text-[#0A0A0E] px-4 py-2.5 rounded text-sm" onClick={() => setMobileOpen(false)}>
            Gauti analizę →
          </Link>
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0E]/60 via-[#0A0A0E]/40 to-[#0A0A0E]" />
      </div>
      <div className="container relative z-10 pt-24 pb-16 pl-8 md:pl-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#A8FF3E]/30 bg-[#A8FF3E]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF3E] animate-pulse" />
            <span className="text-[#A8FF3E] text-xs font-medium tracking-wide uppercase">Rezervacijų automatizacija</span>
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.2] mb-4 break-words w-full">
            Kiek pinigų{' '}
            <span className="text-[#A8FF3E] lime-glow-text">prarandate</span>{' '}
            dėl neatvykusių klientų?
          </h1>
          <p className="text-base md:text-base text-white/60 max-w-lg mb-6 leading-relaxed">
            Kuriame svetaines su integruota rezervacijų sistema, automatizuojame priminimus ir užpildome tuščius laikus.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a href="https://kosmetologija.perziura.lt/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 text-white rounded font-semibold hover:border-white/40 hover:bg-white/5 transition-all text-sm">
              Peržiūrėti demo <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/analize"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#A8FF3E] text-[#0A0A0E] rounded font-bold hover:bg-[#bfff5e] transition-all text-sm btn-primary-pulse">
              Gauti analizę <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm text-white/40 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#A8FF3E]" />
            Rezultatas: mažiau neatvykimų, daugiau pajamų, mažiau chaoso
          </p>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-white/30" />
      </div>
    </section>
  );
}

// ── Problems ───────────────────────────────────────────────────
function Problems() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { ref, inView } = useInView();
  const problems = [
    {
      icon: "❌",
      title: "Klientai neatvyksta",
      short: "Rezervuoja laiką, bet nepasirodo.",
      expand: "Prarandate pinigus kiekvieną kartą, kai klientas nepasirodo. Kiekvienas tušias laikas – tai tiesiogiai prarastos pajamos, kurių negalite susigrąžinti.",
    },
    {
      icon: "⏱",
      title: "Rankinis darbas",
      short: "Rašote žinutes ir derinate laikus rankomis.",
      expand: "Rašote žinutes, priminimus, derinate laikus rankiniu būdu – tai atima 10–15 valandų per mėnesį, kurių galėtumėte skirti savo darbui ir klientams.",
    },
    {
      icon: "📭",
      title: "Tušti laikai",
      short: "Laisvi laikai lieka neužpildyti.",
      expand: "Laisvi laikai lieka neužpildyti – prarastos pajamos. Sistema gali automatiškai rasti klientą, kuriam tinka šis laikas, ir užpildyti jį be jūsų įsikišimo.",
    },
  ];
  return (
    <section id="problemos" className="py-16 px-6 md:px-12 bg-[#0A0A0E]" ref={ref}>
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-[#A8FF3E] text-xs font-semibold uppercase tracking-widest mb-3">Problema</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Ar jūs susiduriate<br />su šiomis kliūtimis?
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-base">Daugelis paslaugų specialistų praranda pinigus dėl tų pačių priežasčių.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`forge-card rounded-lg p-5 max-w-sm mx-auto cursor-pointer transition-all duration-300 ${inView ? "fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s` }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif' }} className="text-xl font-bold text-white mb-2">{p.title}</h3>
              <p className="text-white/50 text-sm mb-4">{p.short}</p>
              <div className={`overflow-hidden transition-all duration-300 ${expanded === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="text-white/70 text-sm leading-relaxed border-t border-white/10 pt-4">{p.expand}</p>
              </div>
              <button className="flex items-center gap-1 text-[#A8FF3E] text-xs font-semibold mt-3 hover:gap-2 transition-all">
                {expanded === i ? <><ChevronUp className="w-3 h-3" /> Sužinoti mažiau</> : <><ChevronDown className="w-3 h-3" /> Sužinoti daugiau</>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Solution ───────────────────────────────────────────────────
function Solution() {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView();
  const bullets = [
    { icon: <CheckCircle className="w-4 h-4 text-[#A8FF3E]" />, text: "Automatinis booking patvirtinimas" },
    { icon: <Bell className="w-4 h-4 text-[#A8FF3E]" />, text: "SMS / email priminimai" },
    { icon: <RefreshCw className="w-4 h-4 text-[#A8FF3E]" />, text: "Lengvas perkėlimas / atšaukimas" },
    { icon: <Zap className="w-4 h-4 text-[#A8FF3E]" />, text: "Automatinis laisvų vietų užpildymas" },
  ];
  return (
    <section id="sprendimas" className="py-16 px-6 md:px-12 bg-[#0D0D12]" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={inView ? "fade-in-up" : "opacity-0"}>
            <p className="text-[#A8FF3E] text-xs font-semibold uppercase tracking-widest mb-3">Sprendimas</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Sprendimas, kuris<br />
              <span className="text-[#A8FF3E]">dirba už jus</span>
            </h2>
            <div className="space-y-3 mb-8">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                  {b.icon}
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-[#A8FF3E] font-semibold text-sm border border-[#A8FF3E]/30 px-4 py-2.5 rounded hover:bg-[#A8FF3E]/10 transition-all"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              Kaip tai veikia?
            </button>
            <div className={`overflow-hidden transition-all duration-400 ${expanded ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
              <div className="forge-card rounded-lg p-5 text-white/70 text-sm leading-relaxed">
                Sukuriame jums profesionalią svetainę su integruotu booking'u, sujungiame automatizacijas (Cal.com / Make / SMS), ir sistema pradeda veikti be jūsų įsikišimo. Klientai rezervuoja patys, gauna priminimus automatiškai, o jūs tiesiog dirbate.
              </div>
            </div>
          </div>
          <div className={`relative ${inView ? "fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-4 bg-[#A8FF3E]/5 rounded-2xl blur-2xl" />
            <div className="relative rounded-xl overflow-hidden border border-white/10">
              <img src={DEMO_IMG} alt="Rezervacijų sistema demo" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Demo ───────────────────────────────────────────────────────
function Demo() {
  return (
    <section id="demo" className="py-16 px-6 md:px-12 bg-[#0A0A0E]">
      <div className="container text-center">
        <p className="text-[#A8FF3E] text-xs font-semibold uppercase tracking-widest mb-3">Demo</p>
        <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight">
          Pamatykite sistemą<br />veikiančią gyvai
        </h2>
        <p className="text-white/50 max-w-md mx-auto mb-6 text-base">Peržiūrėkite pilnai veikiančią kirpyklos demonstracinę svetainę su integruota rezervacijų sistema.</p>
        <a
          href="https://kosmetologija.perziura.lt/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#A8FF3E] text-[#0A0A0E] font-bold px-8 py-4 rounded text-base hover:bg-[#bfff5e] transition-all btn-primary-pulse"
        >
          Išbandyti demo <ArrowRight className="w-5 h-5" />
        </a>
        <p className="text-white/30 text-xs mt-4">Nemokama demonstracija · Nereikia registracijos</p>
      </div>
    </section>
  );
}

// ── How it works ───────────────────────────────────────────────
function HowItWorks() {
  const { ref, inView } = useInView();
  const steps = [
    { num: "01", icon: <Calendar className="w-6 h-6" />, title: "Klientas rezervuoja laiką", desc: "Per jūsų online kalendorių, bet kuriuo metu – net naktį." },
    { num: "02", icon: <CheckCircle className="w-6 h-6" />, title: "Sistema patvirtina automatiškai", desc: "Patvirtinimas išsiunčiamas iš karto – be jūsų įsikišimo." },
    { num: "03", icon: <Bell className="w-6 h-6" />, title: "Siunčia priminimus", desc: "SMS ir email priminimai sumažina neatvykimus iki 80–90%." },
    { num: "04", icon: <RefreshCw className="w-6 h-6" />, title: "Jei atšaukia – vieta užpildoma", desc: "Sistema automatiškai suranda kitą klientą laisvam laikui." },
  ];
  return (
    <section className="py-16 px-6 md:px-12 bg-[#0D0D12]" ref={ref}>
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-[#A8FF3E] text-xs font-semibold uppercase tracking-widest mb-3">Procesas</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3">Kaip tai veikia?</h2>
          <p className="text-white/50 max-w-md mx-auto text-base">4 žingsniai, kurie keičia jūsų darbo eigą visiems laikams.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`relative forge-card rounded-lg p-5 max-w-sm mx-auto ${inView ? "fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="text-[#A8FF3E]/20 text-5xl font-extrabold absolute top-4 right-4" style={{ fontFamily: 'Syne, sans-serif' }}>{s.num}</div>
              <div className="text-[#A8FF3E] mb-4">{s.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif' }} className="text-white font-bold mb-2 text-lg">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Stats ──────────────────────────────────────────────────────
function Stats() {
  const { ref, inView } = useInView(0.3);
  const n1 = useCountUp(80, 1800, inView);
  const n2 = useCountUp(500, 2200, inView);
  const n3 = useCountUp(15, 1500, inView);
  return (
    <section id="rezultatai" className="relative py-12 px-6 md:px-12 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0">
        <img src={STATS_BG} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[#0A0A0E]/80" />
      </div>
      <div className="container relative z-10" ref={ref}>
        <div className="text-center mb-14">
          <p className="text-[#A8FF3E] text-xs font-semibold uppercase tracking-widest mb-3">Rezultatai</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">Skaičiai kalba patys</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="forge-card rounded-xl p-6 text-center">
            <div className="stat-number text-4xl md:text-5xl mb-2">-{n1}%</div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">Neatvykimų</p>
          </div>
          <div className="forge-card rounded-xl p-6 text-center">
            <div className="stat-number text-4xl md:text-5xl mb-2">+€{n2}</div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">Papildomų pajamų/mėn.</p>
          </div>
          <div className="forge-card rounded-xl p-6 text-center">
            <div className="stat-number text-4xl md:text-5xl mb-2">{n3}h</div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">Sutaupyta per mėnesį</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Full solution ──────────────────────────────────────────────
function FullSolution() {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView();
  const includes = [
    "Svetainės sukūrimas (pritaikyta jūsų veiklai)",
    "Booking sistema su online kalendoriumi",
    "Automatizacijos: priminimai, perkėlimas, atšaukimas",
    "SMS ir email integracijos",
    "Paruošta naudoti sistema nuo pirmos dienos",
  ];
  return (
    <section className="py-16 px-6 md:px-12 bg-[#0A0A0E]" ref={ref}>
      <div className="container">
        <div className={`max-w-2xl mx-auto text-center ${inView ? "fade-in-up" : "opacity-0"}`}>
          <p className="text-[#A8FF3E] text-xs font-semibold uppercase tracking-widest mb-3">Pilnas sprendimas</p>          <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 break-words">
            Ne tik automatizacija –<br />
            <span className="text-[#A8FF3E]">pilnas sprendimas</span>
          </h2><p className="text-white/50 text-base mb-4">Kuriame modernias svetaines + įdiegiame pilną rezervacijų sistemą.</p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 mx-auto text-[#A8FF3E] font-semibold text-sm border border-[#A8FF3E]/30 px-5 py-2.5 rounded hover:bg-[#A8FF3E]/10 transition-all mb-6"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Kas įeina?
          </button>
          <div className={`overflow-hidden transition-all duration-400 ${expanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="forge-card rounded-lg p-5 max-w-sm mx-auto text-left">
              {includes.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
                  <CheckCircle className="w-4 h-4 text-[#A8FF3E] mt-0.5 shrink-0" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Lead Capture ───────────────────────────────────────────────
function LeadCapture() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, source: "landing_lead_capture" }),
      }).catch(() => {});
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-[#0D0D12]">
      <div className="container">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-[#A8FF3E] text-xs font-semibold uppercase tracking-widest mb-3">Nemokama analizė</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Įveskite kontaktus ir<br />gaukite savo analizę
          </h2>
          <p className="text-white/50 mb-8">Parodysime kiek pinigų prarandate ir kaip tai išspręsti.</p>
          {submitted ? (
            <div className="forge-card rounded-xl p-6 max-w-md mx-auto text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif' }} className="text-white text-xl font-bold mb-2">Ačiū!</h3>
              <p className="text-white/60 text-sm">Susisieksime su jumis per 24 valandas.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="forge-card rounded-xl p-6 max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Jūsų vardas"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#A8FF3E]/50 transition-colors"
              />
              <input
                type="text"
                placeholder="El. paštas arba telefono numeris"
                value={contact}
                onChange={e => setContact(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#A8FF3E]/50 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#A8FF3E] text-[#0A0A0E] font-bold py-3.5 rounded hover:bg-[#bfff5e] transition-all text-sm disabled:opacity-60 btn-primary-pulse"
              >
                {loading ? "Siunčiama..." : "Gauti analizę →"}
              </button>
              <p className="text-white/30 text-xs">Susisieksime per 24 valandas.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Target Audience ────────────────────────────────────────────
function TargetAudience() {
  const { ref, inView } = useInView();
  const targets = [
    { emoji: "✂️", label: "Kirpėjai" },
    { emoji: "💅", label: "Kosmetologai" },
    { emoji: "🦷", label: "Odontologai" },
    { emoji: "💆", label: "Masažo terapeutai" },
    { emoji: "🏋️", label: "Treneriai" },
    { emoji: "🩺", label: "Kiti specialistai" },
  ];
  return (
    <section className="py-12 px-6 md:px-12 bg-[#0A0A0E]" ref={ref}>
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-[#A8FF3E] text-xs font-semibold uppercase tracking-widest mb-3">Kam tinka</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl md:text-3xl font-extrabold text-white">Sukurta paslaugų specialistams</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {targets.map((t, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/3 hover:border-[#A8FF3E]/40 hover:bg-[#A8FF3E]/5 transition-all text-white/70 hover:text-white text-sm font-medium ${inView ? "fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span>{t.emoji}</span> {t.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Kiek kainuoja sistema?", a: "Kaina priklauso nuo jūsų poreikių. Susisiekite su mumis ir paruošime individualų pasiūlymą. Dauguma klientų investiciją atgauna per 1–2 mėnesius." },
    { q: "Ar veiks su mano esamomis sistemomis?", a: "Taip. Integruojame su Cal.com, Make.com, WhatsApp, SMS platformomis ir daugeliu kitų įrankių. Sistema sukurta taip, kad lengvai prisitaikytų prie jūsų esamo darbo proceso." },
    { q: "Ar sudėtinga klientams rezervuoti?", a: "Ne. Sistema sukurta taip, kad klientas rezervuotų per 30 sekundžių – be registracijos, be komplikacijų. Tiesiog pasirenka laiką ir patvirtina." },
    { q: "Kada pamatysiu rezultatą?", a: "Dauguma klientų pastebi neatvykimų sumažėjimą jau per pirmą savaitę po paleidimo. Pilnas efektas matomas per 30 dienų." },
    { q: "Ar galiu atsisakyti?", a: "Taip, jokių ilgalaikių sutarčių. Dirbame lanksčiai ir skaidriai – jūs visada kontroliuojate situaciją." },
  ];
  return (
    <section id="duk" className="py-16 px-6 md:px-12 bg-[#0D0D12]">
      <div className="container max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-[#A8FF3E] text-xs font-semibold uppercase tracking-widest mb-3">DUK</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl md:text-3xl font-extrabold text-white">Dažnai užduodami klausimai</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="forge-card rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-semibold text-sm">{f.q}</span>
                {open === i ? <ChevronUp className="w-4 h-4 text-[#A8FF3E] shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-48" : "max-h-0"}`}>
                <p className="px-5 pb-4 text-white/60 text-sm leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────
function About() {
  return (
    <section className="py-16 bg-[#0A0A0E] border-t border-white/5">
      <div className="container max-w-2xl text-center">
        <div className="w-10 h-10 rounded-sm bg-[#A8FF3E] flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-5 h-5 text-[#0A0A0E]" />
        </div>
        <h3 style={{ fontFamily: 'Syne, sans-serif' }} className="text-xl font-bold text-white mb-2">Inovita</h3>
        <p className="text-white/50 text-sm max-w-md mx-auto">
          Kuriame sistemas, kurios sumažina neatvykimus ir didina pajamas. Automatizacija – ne ateities dalykas, o šiandieninis sprendimas.
        </p>
      </div>
    </section>
  );
}

// ── Final CTA ──────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative py-12 px-6 md:px-12 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0">
        <img src={CTA_BG} alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-[#0A0A0E]/70" />
      </div>
      <div className="container relative z-10 text-center">
          <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3">
          Sužinok, kiek prarandi –<br />
            <span className="text-[#A8FF3E]">užpildyk testą</span>
          </h2>
        <p className="text-white/50 text-base mb-6 max-w-sm mx-auto">Atsakykite į kelis klausimus ir sužinokite tikslų skaičių.</p>
        <Link href="/analize"
          className="inline-flex items-center gap-2 bg-[#A8FF3E] text-[#0A0A0E] font-bold px-8 py-4 rounded text-base hover:bg-[#bfff5e] transition-all btn-primary-pulse">
          Pradėti analizę <ArrowRight className="w-5 h-5" />
        </Link>
        <div className="flex items-center justify-center gap-6 mt-6 text-white/30 text-xs">
          <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-[#A8FF3E]" /> Nemokama</span>
          <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-[#A8FF3E]" /> 2 minutės</span>
          <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-[#A8FF3E]" /> Jokių įsipareigojimų</span>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-white/5 py-10">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-sm bg-[#A8FF3E] flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 text-[#0A0A0E]" />
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif' }} className="text-white font-bold">INOVITA</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed">Rezervacijų automatizacija paslaugų specialistams.</p>
          </div>
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">Įmonė</p>
            <div className="space-y-2 text-xs text-white/40">
              <p>Newix MB</p>
              <p>Įmonės kodas: 307358309</p>
              <p>Pergalės g. 55-56, LT-26124 Elektrėnai</p>
            </div>
          </div>
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">Kontaktai</p>
            <div className="space-y-2 text-xs">
              <a href="mailto:info@inovita.lt" className="block text-white/40 hover:text-[#A8FF3E] transition-colors">info@inovita.lt</a>
              <a href="tel:+37069037050" className="block text-white/40 hover:text-[#A8FF3E] transition-colors">+370 690 37050</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© 2026 Inovita. Visos teisės saugomos.</p>
          <a href="/privatumo-politika" className="hover:text-white/60 transition-colors">Privatumo politika</a>
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0E] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Problems />
      <Solution />
      <Demo />
      <HowItWorks />
      <Stats />
      <FullSolution />
      <LeadCapture />
      <TargetAudience />
      <FAQ />
      <About />
      <FinalCTA />
      <Footer />
    </div>
  );
}
