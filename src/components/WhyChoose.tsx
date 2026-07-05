import { ShieldCheck, Truck, BadgeCheck, MessageCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Sans caution',
    text: "Profitez de nos packs sans caution. Organisez sereinement sans avancer de dépôt lourd.",
  },
  {
    icon: Truck,
    title: 'Livraison & collecte',
    text: 'Nous livrons et récupérons le matériel dans tous les quartiers de Douala, sans effort de votre part.',
  },
  {
    icon: BadgeCheck,
    title: 'Matériel de qualité vérifié',
    text: 'Chaises, tables, tentes et vaisselle propres, entretenus et contrôlés avant chaque événement.',
  },
  {
    icon: MessageCircle,
    title: 'Réservation ultra-rapide',
    text: 'Réservez en quelques minutes via WhatsApp. Une réponse claire et rapide, sans paperasse.',
  },
];

export function WhyChoose() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-forest-50 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`mx-auto max-w-2xl text-center reveal ${visible ? 'is-visible' : ''}`}
        >
          <span className="section-eyebrow justify-center">Pourquoi nous choisir</span>
          <h2 className="section-title">
            Pourquoi choisir <span className="text-gold-500">Eventia&nbsp;237</span> ?
          </h2>
          <p className="mt-5 font-sans text-base text-forest-700 sm:text-lg">
            Un service pensé pour la tranquillité des organisateurs d'événements à Douala.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, i) => (
            <article
              key={reason.title}
              className="card-soft group p-7 text-center"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-500/8 text-forest-500 transition-all duration-500 group-hover:bg-gold-400 group-hover:text-forest-900">
                <reason.icon className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-forest-900">
                {reason.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-forest-700">
                {reason.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
