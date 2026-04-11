/* =============================================================
   INOVITA – Quiz / Rezervacijų Analizė Page
   Design: "Dark Forge" – same system as Home
   Webhook: Make.com – replace REPLACE_WITH_YOUR_WEBHOOK
   ============================================================= */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle, Calendar } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────
interface QuizData {
  clientsPerMonth: string;
  noShows: string;
  avgPrice: string;
  timeSlots: string;
  sendReminders: string;
  specialty: string;
  name: string;
  contact: string;
}

// Email is sent via server-side /api/contact endpoint

// ── Calculate estimated losses ─────────────────────────────────
function calcLoss(data: Partial<QuizData>): { monthly: number; yearly: number; hours: number } {
  // noShows: multiply by midpoint count
  const noShowMap: Record<string, number> = { "1–2": 2, "3–5": 4, "5–10": 8, "10+": 12 };
  // avgPrice: multiply by midpoint price
  const priceMap: Record<string, number> = { "20–40": 30, "40–60": 50, "60–100": 80, "100+": 120 };
  const noShows = noShowMap[data.noShows ?? ""] ?? 4;
  const price = priceMap[data.avgPrice ?? ""] ?? 50;
  const monthly = noShows * price;
  return { monthly, yearly: monthly * 12, hours: 12 };
}

// ── Step definitions ───────────────────────────────────────────
const STEPS = [
  {
    id: "clientsPerMonth",
    question: "Kiek klientų aptarnaujate per mėnesį?",
    options: ["20–40", "40–80", "80–120", "120+"],
  },
  {
    id: "noShows",
    question: "Kiek klientų vidutiniškai neatvyksta per mėnesį?",
    options: ["1–2", "3–5", "5–10", "10+"],
  },
  {
    id: "avgPrice",
    question: "Kokia vidutinė vizito kaina (€)?",
    options: ["20–40", "40–60", "60–100", "100+"],
  },
  {
    id: "timeSlots",
    question: "Kiek skirtingų paslaugų laikų turite kalendoriuje?",
    options: ["1", "2–3", "4–5+"],
  },
  {
    id: "sendReminders",
    question: "Ar šiuo metu siunčiate priminimus klientams?",
    options: ["Taip", "Ne", "Kartais"],
  },
  {
    id: "specialty",
    question: "Jūsų specialybė",
    options: ["Kirpėjas / Kirpėja", "Kosmetologas", "Odontologas", "Masažo terapeutas", "Treneris", "Kita"],
  },
];

// ── Progress bar ───────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-white/5 rounded-full h-1 mb-8">
      <div
        className="h-1 rounded-full bg-[#A8FF3E] transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Option button ──────────────────────────────────────────────
function OptionBtn({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-lg border text-sm font-medium transition-all duration-200 ${
        selected
          ? "border-[#A8FF3E] bg-[#A8FF3E]/10 text-white"
          : "border-white/10 bg-white/3 text-white/60 hover:border-white/25 hover:text-white hover:bg-white/5"
      }`}
    >
      <span className={`inline-block w-4 h-4 rounded-full border mr-3 align-middle transition-all ${selected ? "border-[#A8FF3E] bg-[#A8FF3E]" : "border-white/30"}`} />
      {label}
    </button>
  );
}

// ── Result screen ──────────────────────────────────────────────
function ResultScreen({ data }: { data: Partial<QuizData> }) {
  const { monthly, yearly, hours } = calcLoss(data);
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-[#A8FF3E]/10 border border-[#A8FF3E]/30 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-7 h-7 text-[#A8FF3E]" />
      </div>
      <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-3xl font-extrabold text-white mb-2">
        Jūsų analizė paruošta
      </h2>
      <p className="text-white/50 text-sm mb-8">Štai kiek prarandate dėl neatvykusių klientų:</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="forge-card rounded-xl p-5 text-center">
          <div className="stat-number text-3xl mb-1">€{monthly}</div>
          <p className="text-white/40 text-xs uppercase tracking-wide">Per mėnesį</p>
        </div>
        <div className="forge-card rounded-xl p-5 text-center">
          <div className="stat-number text-3xl mb-1">€{yearly}</div>
          <p className="text-white/40 text-xs uppercase tracking-wide">Per metus</p>
        </div>
        <div className="forge-card rounded-xl p-5 text-center">
          <div className="stat-number text-3xl mb-1">{hours}h</div>
          <p className="text-white/40 text-xs uppercase tracking-wide">Švaistoma/mėn.</p>
        </div>
      </div>

      <div className="forge-card rounded-xl p-6 mb-6 text-left">
        <h3 style={{ fontFamily: 'Syne, sans-serif' }} className="text-white font-bold mb-3 text-lg">Ką galime padaryti:</h3>
        <div className="space-y-2">
          {[
            `Sumažinti neatvykimus iki 80–90%`,
            `Grąžinti iki €${Math.round(monthly * 0.8)}/mėn. prarastų pajamų`,
            `Sutaupyti ~10–15 val./mėn. rankinio darbo`,
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-white/70">
              <CheckCircle className="w-4 h-4 text-[#A8FF3E] shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <p className="text-white/40 text-sm mb-6">Susisieksime su jumis per 24 valandas su individualiu pasiūlymu.</p>
      <Link href="/"
        className="inline-flex items-center gap-2 text-[#A8FF3E] text-sm font-semibold hover:underline">
        <ArrowLeft className="w-4 h-4" /> Grįžti į pagrindinį puslapį
      </Link>
    </div>
  );
}

// ── Contact step ───────────────────────────────────────────────
function ContactStep({
  data,
  onChange,
  onSubmit,
  loading,
}: {
  data: Partial<QuizData>;
  onChange: (field: keyof QuizData, val: string) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  const { monthly } = calcLoss(data);
  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#A8FF3E]/30 bg-[#A8FF3E]/5 mb-4">
          <span className="text-[#A8FF3E] text-xs font-medium">Paskutinis žingsnis</span>
        </div>
        <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-3xl font-extrabold text-white mb-2">
          Gaukite savo analizę
        </h2>
        <p className="text-white/50 text-sm">
          Pagal jūsų atsakymus prarandate apie{" "}
          <span className="text-[#A8FF3E] font-bold">€{monthly}/mėn.</span>
        </p>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Jūsų vardas"
          value={data.name || ""}
          onChange={e => onChange("name", e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#A8FF3E]/50 transition-colors"
        />
        <input
          type="text"
          placeholder="El. paštas arba telefono numeris"
          value={data.contact || ""}
          onChange={e => onChange("contact", e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#A8FF3E]/50 transition-colors"
        />
        <button
          onClick={onSubmit}
          disabled={loading || !data.name || !data.contact}
          className="w-full bg-[#A8FF3E] text-[#0A0A0E] font-bold py-4 rounded-lg hover:bg-[#bfff5e] transition-all text-sm disabled:opacity-50 btn-primary-pulse flex items-center justify-center gap-2"
        >
          {loading ? "Siunčiama..." : <>Gauti analizę <ArrowRight className="w-4 h-4" /></>}
        </button>
        <p className="text-white/30 text-xs text-center">Susisieksime per 24 valandas.</p>
      </div>
    </div>
  );
}

// ── Main Quiz component ────────────────────────────────────────
export default function Quiz() {
  const [step, setStep] = useState(0); // 0..5 = questions, 6 = contact, 7 = result
  const [data, setData] = useState<Partial<QuizData>>({});
  const [loading, setLoading] = useState(false);

  const totalSteps = STEPS.length + 1; // +1 for contact
  const currentStepDef = STEPS[step];
  const selectedVal = currentStepDef ? data[currentStepDef.id as keyof QuizData] : undefined;

  const handleSelect = (val: string) => {
    if (!currentStepDef) return;
    setData(prev => ({ ...prev, [currentStepDef.id]: val }));
  };

  const handleNext = () => {
    if (step < STEPS.length) setStep(s => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const handleContactChange = (field: keyof QuizData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async () => {
    if (!data.name || !data.contact) return;
    setLoading(true);
    try {
      const quizData = {
        clientsPerMonth: data.clientsPerMonth,
        noShows: data.noShows,
        avgPrice: data.avgPrice,
        timeSlots: data.timeSlots,
        sendReminders: data.sendReminders,
        specialty: data.specialty,
        estimated_monthly_loss: calcLoss(data).monthly,
      };
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          contact: data.contact,
          source: "quiz",
          quizData,
        }),
      }).catch(() => {});
    } finally {
      setLoading(false);
      setStep(totalSteps); // result screen
    }
  };

  const isContactStep = step === STEPS.length;
  const isResultStep = step === totalSteps;

  return (
    <div className="min-h-screen bg-[#0A0A0E] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Grįžti
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-[#A8FF3E] flex items-center justify-center">
              <Calendar className="w-3 h-3 text-[#0A0A0E]" />
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif' }} className="text-white font-bold text-sm">INOVITA</span>
          </div>
          {!isResultStep && (
            <span className="text-white/30 text-xs">{Math.min(step + 1, totalSteps)}/{totalSteps}</span>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {!isResultStep && (
            <ProgressBar current={step} total={totalSteps} />
          )}

          {isResultStep ? (
            <ResultScreen data={data} />
          ) : isContactStep ? (
            <ContactStep data={data} onChange={handleContactChange} onSubmit={handleSubmit} loading={loading} />
          ) : (
            <div>
              <p className="text-[#A8FF3E] text-xs font-semibold uppercase tracking-widest mb-3">
                Klausimas {step + 1} iš {STEPS.length}
              </p>
              <h2 style={{ fontFamily: 'Syne, sans-serif' }} className="text-2xl md:text-3xl font-extrabold text-white mb-8">
                {currentStepDef.question}
              </h2>
              <div className="space-y-3 mb-8">
                {currentStepDef.options.map(opt => (
                  <OptionBtn
                    key={opt}
                    label={opt}
                    selected={selectedVal === opt}
                    onClick={() => handleSelect(opt)}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors disabled:opacity-20"
                >
                  <ArrowLeft className="w-4 h-4" /> Atgal
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedVal}
                  className="flex items-center gap-2 bg-[#A8FF3E] text-[#0A0A0E] font-bold px-6 py-3 rounded-lg hover:bg-[#bfff5e] transition-all text-sm disabled:opacity-40"
                >
                  Toliau <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
