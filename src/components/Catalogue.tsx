import { useEffect, useMemo, useState } from 'react';
import { ImageIcon, AlertCircle } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useReveal } from '../hooks/useReveal';
import {
  CATEGORIES,
  fetchMateriels,
  formatFCFA,
  isSupabaseConfigured,
  waLink,
  type Materiel,
} from '../lib/supabase';
import { FALLBACK_MATERIELS } from '../lib/fallbackData';

type FilterKey = 'tous' | string;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'tous', label: 'Tous' },
  ...CATEGORIES.map((c) => ({ key: c.key, label: c.label })),
];

function materielMessage(nom: string, prix: number) {
  return `Bonjour Eventia 237, je souhaite réserver le matériel : ${nom} au tarif de ${formatFCFA(prix)} FCFA pour un événement à Douala. Est-il disponible ?`;
}

function Placeholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-forest-50 to-cream text-forest-300">
      <ImageIcon className="h-10 w-10" strokeWidth={1.25} />
      <span className="font-sans text-[11px] font-medium uppercase tracking-wider text-forest-400">
        Photo à venir
      </span>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-forest-900/5">
      <div className="aspect-square animate-pulse bg-forest-100" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-forest-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-forest-100" />
        <div className="h-9 w-full animate-pulse rounded-full bg-forest-100" />
      </div>
    </div>
  );
}

export function Catalogue() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [items, setItems] = useState<Materiel[]>([]);
  const [active, setActive] = useState<FilterKey>('tous');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isSupabaseConfigured) {
        setItems(FALLBACK_MATERIELS);
        setUsingFallback(true);
        setLoading(false);
        return;
      }
      try {
        const data = await fetchMateriels();
        if (cancelled) return;
        setItems(data.length > 0 ? data : FALLBACK_MATERIELS);
        setUsingFallback(data.length === 0);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.error('Supabase fetch error:', err);
        setItems(FALLBACK_MATERIELS);
        setUsingFallback(true);
        setError('Impossible de charger le catalogue en direct. Affichage de la liste de référence.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => (active === 'tous' ? items : items.filter((m) => m.categorie === active)),
    [items, active],
  );

  const countByCat = useMemo(() => {
    const map: Record<string, number> = { tous: items.length };
    for (const c of CATEGORIES) map[c.key] = items.filter((m) => m.categorie === c.key).length;
    return map;
  }, [items]);

  return (
    <section id="catalogue" className="relative bg-forest-50 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div
          ref={ref}
          className={`mx-auto max-w-2xl text-center reveal ${visible ? 'is-visible' : ''}`}
        >
          <span className="section-eyebrow justify-center">Catalogue matériel</span>
          <h2 className="section-title">
            Notre <span className="text-gold-500">catalogue</span> de location
          </h2>
          <p className="mt-5 font-sans text-base text-forest-700 sm:text-lg">
            {items.length} matériels disponibles à la location. Cliquez sur un produit
            pour réserver instantanément via WhatsApp.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans text-sm font-medium transition-all duration-300 ${
                active === f.key
                  ? 'bg-forest-500 text-cream shadow-soft'
                  : 'bg-white text-forest-700 ring-1 ring-forest-900/8 hover:ring-forest-500/40 hover:text-forest-900'
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  active === f.key ? 'bg-cream/20 text-cream' : 'bg-forest-500/10 text-forest-600'
                }`}
              >
                {countByCat[f.key] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-2xl bg-gold-50 px-5 py-4 text-sm text-forest-800 ring-1 ring-gold-300/60">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-gold-600" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
            : filtered.map((m) => (
                <article
                  key={m.id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-forest-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
                >
                  <div className="relative aspect-square overflow-hidden bg-cream">
                    {m.image_url ? (
                      <img
                        src={m.image_url}
                        alt={m.nom}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    {m.image_url ? (
                      <div className="hidden h-full w-full">
                        <Placeholder />
                      </div>
                    ) : (
                      <Placeholder />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="font-sans text-sm font-semibold leading-snug text-forest-900 sm:text-base">
                      {m.nom}
                    </h3>
                    {m.description && (
                      <p className="mt-1 font-sans text-xs text-forest-600 sm:text-sm">
                        {m.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-display text-xl font-semibold text-forest-900 sm:text-2xl">
                        {formatFCFA(m.prix)}
                      </span>
                      <span className="font-sans text-xs font-medium text-forest-600">FCFA</span>
                    </div>
                    <a
                      href={waLink(materielMessage(m.nom, m.prix))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-whatsapp/10 px-3 py-2 font-sans text-xs font-semibold text-whatsappDark transition-all duration-300 hover:bg-whatsapp hover:text-white sm:text-sm"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      Réserver
                    </a>
                  </div>
                </article>
              ))}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="mt-12 text-center font-sans text-forest-600">
            Aucun matériel dans cette catégorie pour le moment.
          </p>
        )}

        {usingFallback && !loading && !error && (
          <p className="mt-10 text-center font-sans text-xs text-forest-400">
            Catalogue de référence affiché. Connectez votre clé Supabase pour synchroniser les données en direct.
          </p>
        )}
      </div>
    </section>
  );
}
