import { ArrowRight, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { waLink } from '../lib/supabase';

export function Hero() {
  return (
    <section id="accueil" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.pexels.com/photos/2698725/pexels-photo-2698725.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Réception élégamment décorée à Douala"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/70 via-forest-900/55 to-forest-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/60 to-transparent" />
      </div>

      <div className="container-px mx-auto w-full max-w-7xl pt-24 pb-16 sm:pt-28">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/10 px-4 py-1.5 backdrop-blur-sm animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-gold-300" />
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-200">
              Douala • Location événementielle
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-cream sm:text-5xl lg:text-6xl text-balance animate-fade-up">
            Location de Matériel
            <br />
            <span className="text-gold-400">Événementiel</span> à Douala
          </h1>

          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-cream/85 sm:text-lg animate-fade-up [animation-delay:120ms]">
            Packs sans caution dès 45 000 FCFA • Livraison rapide dans tout Douala.
            Chaises, tables, tentes, vaisselle et décoration pour vos mariages, baptêmes et conférences.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up [animation-delay:240ms]">
            <a
              href={waLink('Bonjour Eventia 237, je souhaite réserver du matériel événementiel pour un événement à Douala. Pouvez-vous m\'aider ?')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Réserver sur WhatsApp
            </a>
            <a href="#packs" className="btn-outline text-base text-cream border-cream/40 hover:border-cream hover:bg-white/10">
              Découvrir nos packs
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 animate-fade-up [animation-delay:360ms]">
            {[
              { stat: '26+', label: 'Matériels disponibles' },
              { stat: '0', label: 'Caution exigée' },
              { stat: '8+', label: 'Quartiers livrés' },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-display text-3xl font-semibold text-gold-400 sm:text-4xl">{item.stat}</div>
                <div className="mt-1 font-sans text-xs font-medium uppercase tracking-wider text-cream/70 sm:text-sm">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#apropos"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-cream/60 transition-colors hover:text-cream sm:flex"
        aria-label="Faire défiler vers le bas"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-cream/40 pt-1.5">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-gold-400" />
        </span>
      </a>
    </section>
  );
}
