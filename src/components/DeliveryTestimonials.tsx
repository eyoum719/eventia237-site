import { MapPin, Truck, Quote } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const QUARTIERS = [
  'Bonapriso', 'Akwa', 'Denver', 'Kotto', 'Logbessou', 'Bonamoussadi', 'Yassa',
  'Bonanjo', 'Bali', 'Makepe', 'Ndokoti', 'Simmel',
];

const TESTIMONIALS = [
  {
    name: 'Amina B.',
    event: 'Mariage à Akwa',
    text: "Service impeccable ! Le matériel était propre et livré à l'heure. Le pack Mariage Prestige a fait sensation. Je recommande à 100%.",
    initials: 'AB',
  },
  {
    name: 'Pierre N.',
    event: 'Baptême à Bonapriso',
    text: "Réservation en 5 minutes sur WhatsApp, sans caution. L'équipe est très réactive et professionnelle. Vraiment top pour mon baptême.",
    initials: 'PN',
  },
  {
    name: 'Société K&E',
    event: 'Conférence à Bonanjo',
    text: "Nous organisons régulièrement des conférences et Eventia 237 est devenu notre partenaire de confiance. Matériel de qualité, ponctualité garantie.",
    initials: 'K&E',
  },
];

export function DeliveryTestimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            ref={ref}
            className={`reveal ${visible ? 'is-visible' : ''}`}
          >
            <span className="section-eyebrow">Zone de livraison</span>
            <h2 className="section-title">
              Livraison rapide et installation <span className="text-gold-500">partout à Douala</span>
            </h2>
            <p className="mt-5 font-sans text-base text-forest-700 sm:text-lg">
              Nous livrons, installons et récupérons le matériel dans tous les quartiers
              de Douala — sans frais cachés.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {QUARTIERS.map((q) => (
                <span
                  key={q}
                  className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3.5 py-1.5 font-sans text-sm font-medium text-forest-700 ring-1 ring-forest-900/8"
                >
                  <MapPin className="h-3.5 w-3.5 text-gold-500" />
                  {q}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-forest-500 p-5 text-cream">
              <Truck className="h-9 w-9 flex-none text-gold-400" strokeWidth={1.5} />
              <p className="font-sans text-sm leading-relaxed text-cream/90">
                <span className="font-semibold text-cream">Livraison & collecte incluses</span> dans
                Douala. Besoin d'une zone hors ville ? Écrivez-nous sur WhatsApp.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                className="card-soft p-6 sm:p-7"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <Quote className="h-7 w-7 text-gold-400" strokeWidth={1.5} />
                <blockquote className="mt-3 font-sans text-base leading-relaxed text-forest-800">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-forest-500 font-display text-sm font-semibold text-gold-400">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-sans text-sm font-semibold text-forest-900">{t.name}</span>
                    <span className="block font-sans text-xs text-forest-600">{t.event}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
