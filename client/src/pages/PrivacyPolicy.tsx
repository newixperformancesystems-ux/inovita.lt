/* =============================================================
   INOVITA – Privatumo politika (Privacy Policy)
   Design: "Dark Forge" – same system as Home
   ============================================================= */

import { Link } from "wouter";
import { ArrowLeft, Calendar } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0A0E] text-white">
      {/* Header */}
      <header className="border-b border-white/5 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Grįžti
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-[#A8FF3E] flex items-center justify-center">
              <Calendar className="w-3 h-3 text-[#0A0A0E]" />
            </div>
            <span style={{ fontFamily: "Syne, sans-serif" }} className="text-white font-bold text-sm">
              INOVITA
            </span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1
          style={{ fontFamily: "Syne, sans-serif" }}
          className="text-3xl md:text-4xl font-extrabold text-white mb-10"
        >
          Privatumo politika
        </h1>

        <div className="space-y-10 text-white/70 text-sm leading-relaxed">

          {/* 1 */}
          <section>
            <h2 style={{ fontFamily: "Syne, sans-serif" }} className="text-white text-lg font-bold mb-3">
              1. Bendra informacija
            </h2>
            <p>
              Ši privatumo politika paaiškina, kaip mes renkame, naudojame ir saugome jūsų asmens duomenis,
              kai naudojatės mūsų svetaine ir paslaugomis.
            </p>
            <p className="mt-2">Naudodamiesi šia svetaine, jūs sutinkate su šia privatumo politika.</p>
          </section>

          <div className="border-t border-white/10" />

          {/* 2 */}
          <section>
            <h2 style={{ fontFamily: "Syne, sans-serif" }} className="text-white text-lg font-bold mb-3">
              2. Kokius duomenis renkame
            </h2>
            <p className="mb-2">Galime rinkti šiuos duomenis:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Vardas</li>
              <li>El. pašto adresas</li>
              <li>Telefono numeris (jei pateikiamas)</li>
              <li>Informacija, kurią pateikiate užpildydami formas (pvz. klausimyną)</li>
            </ul>
          </section>

          <div className="border-t border-white/10" />

          {/* 3 */}
          <section>
            <h2 style={{ fontFamily: "Syne, sans-serif" }} className="text-white text-lg font-bold mb-3">
              3. Kaip naudojame duomenis
            </h2>
            <p className="mb-2">Jūsų duomenis naudojame:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Susisiekti su jumis</li>
              <li>Pateikti pasiūlymus ir sprendimus</li>
              <li>Gerinti mūsų paslaugas</li>
              <li>Analizuoti svetainės naudojimą</li>
            </ul>
          </section>

          <div className="border-t border-white/10" />

          {/* 4 */}
          <section>
            <h2 style={{ fontFamily: "Syne, sans-serif" }} className="text-white text-lg font-bold mb-3">
              4. Duomenų saugojimas
            </h2>
            <p>
              Jūsų duomenys saugomi saugiai ir tik tiek, kiek būtina paslaugų teikimui ar teisiniams
              reikalavimams vykdyti.
            </p>
          </section>

          <div className="border-t border-white/10" />

          {/* 5 */}
          <section>
            <h2 style={{ fontFamily: "Syne, sans-serif" }} className="text-white text-lg font-bold mb-3">
              5. Duomenų perdavimas tretiesiems asmenims
            </h2>
            <p>
              Jūsų duomenys gali būti perduodami tik patikimiems partneriams, kurie padeda teikti paslaugas
              (pvz. el. pašto ar automatizavimo platformoms), ir tik tiek, kiek būtina.
            </p>
          </section>

          <div className="border-t border-white/10" />

          {/* 6 */}
          <section>
            <h2 style={{ fontFamily: "Syne, sans-serif" }} className="text-white text-lg font-bold mb-3">
              6. Jūsų teisės
            </h2>
            <p className="mb-2">Jūs turite teisę:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Gauti informaciją apie savo duomenis</li>
              <li>Prašyti juos pataisyti arba ištrinti</li>
              <li>Apriboti jų naudojimą</li>
            </ul>
          </section>

          <div className="border-t border-white/10" />

          {/* 7 */}
          <section>
            <h2 style={{ fontFamily: "Syne, sans-serif" }} className="text-white text-lg font-bold mb-3">
              7. Slapukai (cookies)
            </h2>
            <p>
              Svetainė gali naudoti slapukus, siekiant pagerinti naudotojo patirtį ir analizuoti srautą.
            </p>
          </section>

          <div className="border-t border-white/10" />

          {/* 8 */}
          <section>
            <h2 style={{ fontFamily: "Syne, sans-serif" }} className="text-white text-lg font-bold mb-3">
              8. Kontaktai
            </h2>
            <p>Jeigu turite klausimų dėl privatumo politikos, galite susisiekti:</p>
            <p className="mt-2">
              El. paštas:{" "}
              <a href="mailto:info@inovita.lt" className="text-[#A8FF3E] hover:underline">
                info@inovita.lt
              </a>
            </p>
          </section>

          <div className="border-t border-white/10" />

          {/* 9 */}
          <section>
            <h2 style={{ fontFamily: "Syne, sans-serif" }} className="text-white text-lg font-bold mb-3">
              9. Politikos atnaujinimai
            </h2>
            <p>
              Pasiliekame teisę atnaujinti šią privatumo politiką. Atnaujinimai bus skelbiami šiame puslapyje.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-white/30 text-xs">
        <p>© 2026 Inovita. Visos teisės saugomos.</p>
      </footer>
    </div>
  );
}
