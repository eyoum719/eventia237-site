import { MessageCircle } from 'lucide-react';
import { waLink } from '../lib/supabase';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">
        
        {/* LOGO TEXTUEL AVEC LES COULEURS DE NOTRE LOGO BLOQUÉ */}
        <a href="#accueil" className="flex items-center space-x-2 group">
          <span className="text-2xl font-black tracking-tight text-[#6B46C0]">
            Eventia<span className="text-[#FF6B00]">237</span>
          </span>
        </a>

        {/* NAVIGATION CENTRALE */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
          <a href="#accueil" className="hover:text-[#6B46C0] transition">Accueil</a>
          <a href="#catalogue" className="hover:text-[#6B46C0] transition">Notre Catalogue</a>
          <a href="#apropos" className="hover:text-[#6B46C0] transition">À Propos</a>
        </nav>

        {/* BOUTON WHATSAPP BUSINESS DYNAMIQUE */}
        <div className="flex items-center space-x-4">
          <a 
            href={waLink('Bonjour Eventia 237, je souhaite entrer en contact avec vous pour l\'organisation d\'un événement.')}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#FF6B00] hover:bg-[#e05e00] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition flex items-center space-x-2 text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Contactez-nous sur WhatsApp</span>
            <span className="inline sm:hidden">WhatsApp</span>
          </a>
        </div>

      </div>
    </header>
  );
}
