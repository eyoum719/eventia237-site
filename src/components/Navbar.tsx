import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { waLink } from '../lib/supabase';

const LINKS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#apropos', label: 'À propos' },
  { href: '#packs', label: 'Nos Packs' },
  { href: '#catalogue', label: 'Catalogue' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 shadow-soft backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between sm:h-20">
        <a href="#accueil" className="group flex items-baseline gap-1.5" aria-label="Eventia 237 - Accueil">
          <span className="font-display text-xl font-semibold tracking-tight text-violet-500 transition-colors duration-300 group-hover:text-violet-600 sm:text-2xl">
            Eventia
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-orange-500 transition-colors duration-300 group-hover:text-orange-600 sm:text-2xl">
            237
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative rounded-full px-4 py-2 font-sans text-sm font-medium text-forest-700 transition-colors duration-300 hover:text-forest-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href={waLink('Bonjour Eventia 237, je souhaite organiser un événement à Douala et j\'aimerais avoir des informations sur vos packs.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Réserver
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-500/10 text-forest-700 transition-colors hover:bg-forest-500/20 lg:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-forest-900/5 bg-cream/98 backdrop-blur-md transition-[max-height,opacity] duration-400 lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-sans text-base font-medium text-forest-800 transition-colors hover:bg-forest-500/8 hover:text-forest-900"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={waLink('Bonjour Eventia 237, je souhaite organiser un événement à Douala et j\'aimerais avoir des informations sur vos packs.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-orange w-full"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Réserver sur WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
