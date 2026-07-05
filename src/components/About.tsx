import { useReveal } from '../hooks/useReveal';
import { WhatsAppIcon } from './WhatsAppIcon';
import { waLink } from '../lib/supabase';

export function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="apropos" className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 reveal ${visible ? 'is-visible' : ''}`}
        >
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-card">
              <img
                src="https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Événement chic décoré par Eventia 237 à Douala"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-forest-500 px-7 py-6 text-cream shadow-card sm:block">
              <div className="font-display text-3xl font-semibold text-gold-400">2026</div>
              <div className="mt-1 font-sans text-xs uppercase tracking-wider text-cream/80">
                Au service de vos événements
              </div>
            </div>
            <div className="absolute -left-3 top-8 h-24 w-24 rounded-tl-3xl border-l-2 border-t-2 border-gold-400/50" />
          </div>

          <div>
            <span className="section-eyebrow">À propos de nous</span>
            <h2 className="section-title">
              Une jeune entreprise <span className="text-gold-500">dynamique</span> au service de vos événements
            </h2>
            <div className="mt-4 h-px w-24 gold-divider" />

            <p className="mt-6 font-sans text-base leading-relaxed text-forest-800 sm:text-lg">
              Eventia237 est une jeune entreprise dynamique basée à Douala spécialisée
              dans la location de matériel événementiel (chaises, tables, tentes,
              vaisselle, décoration). Nous mettons à votre disposition du matériel de
              qualité, propre et bien entretenu.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-forest-700 sm:text-lg">
              Notre priorité : vous permettre d'organiser vos événements (baptêmes,
              mariages, conférences, anniversaires) en toute sérénité avec des packs
              sans caution et un service réactif.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink('Bonjour Eventia 237, j\'aimerais en savoir plus sur vos services de location de matériel événementiel à Douala.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Discutons de votre projet
              </a>
              <a href="#catalogue" className="btn-outline">
                Voir le catalogue
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
