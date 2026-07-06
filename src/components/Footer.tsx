import { MapPin, Phone, Clock } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WHATSAPP_BASE, waLink } from '../lib/supabase';

const NAV = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#apropos', label: 'À propos' },
  { href: '#packs', label: 'Nos Packs' },
  { href: '#catalogue', label: 'Catalogue' },
  { href: '#contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-forest-900 text-cream">
      <div className="absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 gold-divider" />

      <div className="container-px mx-auto max-w-7xl py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#accueil" className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl font-semibold tracking-tight text-violet-400">
                Eventia
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-orange-500">
                237
              </span>
            </a>
            <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-cream/70">
              Location de matériel événementiel à Douala. Chaises, tables, tentes,
              vaisselle et décoration pour vos mariages, baptêmes, conférences et
              anniversaires. Packs sans caution, livraison rapide.
            </p>
            <a
              href={waLink('Bonjour Eventia 237, je souhaite organiser un événement à Douala. Pouvez-vous m\'aider ?')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Écrire sur WhatsApp
            </a>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="font-sans text-sm text-cream/75 transition-colors hover:text-gold-300"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              Contact
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 flex-none text-whatsapp" />
                <a
                  href={WHATSAPP_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-cream/80 transition-colors hover:text-gold-300"
                >
                  +237 654-49-71-18
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-gold-400" />
                <span className="font-sans text-sm text-cream/80">+237 654-49-71-18</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold-400" />
                <span className="font-sans text-sm text-cream/80">Douala, Cameroun</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-none text-gold-400" />
                <span className="font-sans text-sm text-cream/80">7j/7 • 8h – 20h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-7 sm:flex-row">
          <p className="font-sans text-xs text-cream/60">
            &copy; 2026 Eventia 237. Tous droits réservés.
          </p>
          <p className="font-sans text-xs text-cream/60">
            Douala • Cameroun &middot; Location de matériel événementiel
          </p>
        </div>
      </div>
    </footer>
  );
}
