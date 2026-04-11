import { Calendar } from 'lucide-react';

export default function Footer() {
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
