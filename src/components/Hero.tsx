import { ArrowRight, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { waLink } from '../lib/supabase';

export function Hero() {
  return (
    <section id="accueil" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      {/* BACKGROUND AVEC LES NOUVELLES COULEURS VIOLETTES */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.pexels.com/photos/2698725/pexels-photo-2698725.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Réception élégamment décorée au Cameroun"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        {/* Dégradés basés sur notre violet premium pour donner de la profondeur */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6B46C0]/80 via-[#53319e]/65 to-[#6B46C0]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#53319e]/70 to-transparent" />
      </div>

      <div className="container-px mx-auto w-full max-w-7xl pt-24 pb-16 sm:pt-28">
        <div className="max-w-2xl">
          {/* PETIT BADGE DU HAUT - ACCENTUATION ORANGE */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-white/10 px-4 py-1.5 backdrop-blur-sm animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-[#FF6B00]" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
              Cameroun • Créativité • Prestige • Émotion
            </span>
          </div>

          {/* TITRE ÉCLATANT AVEC NOTRE TOUCHE ORANGE VIF */}
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance animate-fade-up">
            Vos Événements d'Exception
            <br />
            <span className="text-[#FF6B00]">au Cameroun</span>
          </h1>

          {/* DESCRIPTION SANS LES PACKS - FOCUS CATALOGUE */}
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-purple-100 sm:text-lg animate-fade-up [animation-delay:120ms]">
            Donnez un nouvel éclat à vos célébrations. Louez du matériel de prestige livré rapidement. 
            Chaises, tables, tentes, vaisselle et décoration haut de gamme pour vos mariages, galas et conférences.
          </p>

          {/* BOUTONS AVEC LE NOUVEAU DESIGN */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up [animation-delay:240ms]">
            {/* BOUTON WHATSAPP EN ORANGE FLAMBOYANT */}
            <a
              href={waLink('Bonjour Eventia 237, je souhaite réserver du matériel événementiel depuis votre catalogue. Pouvez-vous m\'aider ?')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] px-6 py-4 text-base font-bold text-white shadow-xl shadow-orange-500/20 transition duration-200"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Réserver sur WhatsApp
            </a>
            
            {/* BOUTON CATALOGUE EN BORDS BLANCS */}
            <a 
              href="#catalogue" 
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/5 hover:bg-white/10 px-6 py-4 text-base font-bold text-white transition duration-200"
            >
              Explorer le Catalogue
              <ArrowRight className="h-4 w-4 text-[#FF6B00]" />
            </a>
          </div>

          {/* COMPTEURS (STATS) RETRAVAILLÉS EN ORANGE */}
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 animate-fade-up [animation-delay:360ms]">
            {[
              { stat: '50+', label: 'Équipements au catalogue' },
              { stat: '0', label: 'Caution exigée' },
              { stat: '100%', label: 'Livraison & Installation' },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-display text-3xl font-black text-[#FF6B00] sm:text-4xl">{item.stat}</div>
                <div className="mt-1 font-sans text-xs font-medium uppercase tracking-wider text-purple-200 sm:text-sm">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOUTON DE DÉFILEMENT VERS LE BAS RECOLORÉ */}
      <a
        href="#catalogue"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-purple-200/60 transition-colors hover:text-white sm:flex"
        aria-label="Faire défiler vers le catalogue"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/30 pt-1.5">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-[#FF6B00]" />
        </span>
      </a>
    </section>
  );
}
