import { Check, Crown, Sparkles, Star } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { waLink } from '../lib/supabase';
import { useReveal } from '../hooks/useReveal';

type Pack = {
  name: string;
  capacity: string;
  price: number;
  oldPrice?: number;
  includes: string[];
  image: string;
  badge?: string;
  featured?: boolean;
};

const PACKS: Pack[] = [
  {
    name: 'Pack Baptême',
    capacity: '50 personnes',
    price: 45000,
    oldPrice: 55000,
    includes: ['Chaises simples', 'Tables rectangulaires', 'Nappes'],
    image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Promo',
  },
  {
    name: 'Pack Conférence',
    capacity: '100 personnes',
    price: 120000,
    includes: ['Chaises capitonnées', 'Tables rondes', 'Sonorisation de base'],
    image: 'https://images.pexels.com/photos/2776222/pexels-photo-2776222.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Pack Mariage Prestige',
    capacity: '150 personnes',
    price: 350000,
    includes: ['Chaises acryliques', 'Chapiteau', 'Couverts standard', 'Tapis rouge'],
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Prestige',
    featured: true,
  },
];

function packMessage(name: string) {
  return `Bonjour Eventia 237, je suis très intéressé par le ${name} pour mon événement à Douala. Quelles sont les modalités ?`;
}

export function Packs() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="packs" className="relative py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`mx-auto max-w-2xl text-center reveal ${visible ? 'is-visible' : ''}`}
        >
          <span className="section-eyebrow justify-center">Nos Packs phares</span>
          <h2 className="section-title">
            Des packs <span className="text-gold-500">clés en main</span> pour chaque événement
          </h2>
          <p className="mt-5 font-sans text-base text-forest-700 sm:text-lg">
            Des formacles complètes, sans caution, livrées et installées partout à Douala.
            Réservez en un message WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {PACKS.map((pack, i) => (
            <article
              key={pack.name}
              className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-forest-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-card ${
                pack.featured ? 'lg:scale-[1.03] ring-2 ring-gold-400/60' : ''
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={pack.image}
                  alt={`${pack.name} - Eventia 237`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/55 via-transparent to-transparent" />
                {pack.badge && (
                  <span
                    className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-semibold shadow-soft ${
                      pack.featured
                        ? 'bg-gold-400 text-forest-900'
                        : 'bg-whatsapp text-white'
                    }`}
                  >
                    {pack.featured ? <Crown className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                    {pack.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 text-cream">
                  <h3 className="font-display text-2xl font-semibold">{pack.name}</h3>
                  <p className="mt-0.5 font-sans text-xs uppercase tracking-wider text-cream/85">
                    {pack.capacity}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <ul className="flex-1 space-y-3">
                  {pack.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-sans text-sm text-forest-800">
                      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-forest-500/10 text-forest-500">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-end gap-3">
                  {pack.oldPrice && (
                    <span className="font-sans text-base text-forest-400 line-through">
                      {pack.oldPrice.toLocaleString('fr-FR')} F
                    </span>
                  )}
                  <span className="font-display text-3xl font-semibold text-forest-900">
                    {pack.price.toLocaleString('fr-FR')}
                    <span className="ml-1 font-sans text-sm font-medium text-forest-600">FCFA</span>
                  </span>
                </div>

                <a
                  href={waLink(packMessage(pack.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 w-full ${pack.featured ? 'btn-gold' : 'btn-primary'}`}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Réserver ce pack
                </a>
              </div>

              {pack.featured && (
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-forest-900/80 px-3 py-1 text-gold-300 backdrop-blur">
                  <Star className="h-3.5 w-3.5 fill-gold-300" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider">Best-seller</span>
                </div>
              )}
            </article>
          ))}
        </div>

        <p className="mt-10 text-center font-sans text-sm text-forest-600">
          Besoin d'un pack sur-mesure ?{' '}
          <a
            href={waLink('Bonjour Eventia 237, j\'aimerais un pack sur-mesure pour mon événement à Douala. Pouvez-vous me proposer un devis ?')}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-forest-500 underline decoration-gold-400 underline-offset-4 hover:text-gold-600"
          >
            Demandez un devis personnalisé sur WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
