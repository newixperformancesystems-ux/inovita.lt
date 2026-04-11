import { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { Link } from 'wouter';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#0A0A0E] border-b border-white/5 sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm bg-[#A8FF3E] flex items-center justify-center">
            <Calendar className="w-4 h-4 text-[#0A0A0E]" />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif' }} className="text-white font-bold text-lg tracking-tight">INOVITA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium"
          >
            Pagrindinis
          </Link>
          <Link
            href="/tapti-klientu"
            className="text-sm font-semibold bg-[#A8FF3E] text-[#0A0A0E] px-4 py-2 rounded hover:bg-[#bfff5e] transition-colors"
          >
            Tapti klientu
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0A0E]/98 border-t border-white/5 px-4 py-4 flex flex-col gap-3">
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-white/70 hover:text-white py-2 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Pagrindinis
            </Link>
            <Link
              href="/tapti-klientu"
              className="text-center font-semibold bg-[#A8FF3E] text-[#0A0A0E] px-4 py-2.5 rounded text-sm"
              onClick={() => setIsOpen(false)}
            >
              Tapti klientu
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
