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
  return `Bonjour Eventia 237, je souhaite réserver le matériel : ${nom} au tarif de ${formatFCFA(prix)} FCFA pour un événement au Cameroun. Est-il disponible ?`;
}

function Placeholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-50 to-orange-50 text-purple-300">
      <ImageIcon className="h-10 w-10 text-[#6B46C0]/40" strokeWidth={1.25} />
      <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#6B46C0]/60">
        Photo à venir
      </span>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100">
      <div className="aspect-square animate-pulse bg-slate-100" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
        <div className="h-9 w-full animate-pulse rounded-full bg-slate-100" />
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
      // NOTE: Si Bolt bugge sur les variables d'environnement, Vercel lira correctement le live de Supabase
      if (!isSupabaseConfigured) {
        console.warn("Supabase non configuré localement sur Bolt, chargement du fallback.");
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
        setError('Impossible de charger le catalogue en direct sur cet aperçu. Vos modifications restent sécurisées.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    }
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
    <section id="catalogue" className="relative bg-slate-50 py-20 sm:py-28">
      <div className="container-px mx-auto w-full max-w-7xl">
        
        {/* TITRE DE LA SECTION REVISITÉ */}
        <div
          ref={ref}
          className={`mx-auto max-w-2xl text-center reveal ${visible ? 'is-visible' : ''}`}
        >
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#6B46C0] bg-purple-50 px-4 py-1.5 rounded-full inline-block mb-3">
            Catalogue matériel
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Notre <span className="text-[#FF6B00]">catalogue</span> de location
          </h2>
          <p className="mt-4 font-sans text-base text-slate-500 sm:text-lg">
            {items.length} matériels disponibles à la location. Cliquez sur un produit
            pour réserver instantanément via WhatsApp.
          </p>
        </div>

        {/* FILTRES COULEUR VIOLET PRESTIGE */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-sans text-sm font-bold transition-all duration-300 ${
                active === f.key
                  ? 'bg-[#6B46C0] text-white shadow-lg shadow-purple-500/20'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-[#6B46C0]/40 hover:text-slate-900'
              }`}
            >
              {f.label}
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                  active === f.key ? 'bg-white/20 text-white' : 'bg-purple-50 text-[#6B46C0]'
                }`}
              >
                {countByCat[f.key] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-2xl bg-orange-50 px-5 py-4 text-sm text-slate-700 ring-1 ring-orange-200">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-[#FF6B00]" />
            <span>{error}</span>
          </div>
        )}

        {/* GRILLE DE PRODUITS */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
            : filtered.map((m) => (
                <article
                  key={m.id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-100"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    {m.image_url ? (
                      <img
                        src={m.image_url}
                        alt={m.nom}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
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
                    <h3 className="font-sans text-sm font-bold leading-snug text-slate-800 sm:text-base group-hover:text-[#6B46C0] transition-colors">
                      {m.nom}
                    </h3>
                    {m.description && (
                      <p className="mt-1 font-sans text-xs text-slate-400 sm:text-sm line-clamp-2">
                        {m.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-baseline gap-0.5">
                      <span className="font-sans text-xl font-black text-slate-900 sm:text-2xl">
                        {formatFCFA(m.prix)}
                      </span>
                      <span className="font-sans text-xs font-bold text-slate-400 ml-1">FCFA</span>
                    </div>
                    
                    {/* BOUTON WHATSAPP CONSERVÉ EN VERT POUR IDENTIFICATION DIRECTE */}
                    <a
                      href={waLink(materielMessage(m.nom, m.prix))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-whatsapp/10 px-3 py-2.5 font-sans text-xs font-bold text-whatsappDark transition-all duration-200 hover:bg-whatsapp hover:text-white sm:text-sm"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Réserver
                    </a>
                  </div>
                </article>
              ))}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="mt-12 text-center font-sans text-slate-400">
            Aucun matériel dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </section>
  );
}
