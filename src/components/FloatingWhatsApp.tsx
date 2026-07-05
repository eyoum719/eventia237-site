import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { waLink } from '../lib/supabase';

export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = window.setTimeout(() => setTipOpen(true), 3500);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      {tipOpen && (
        <div className="relative max-w-[15rem] rounded-2xl rounded-br-sm bg-white px-4 py-3 shadow-card ring-1 ring-forest-900/5 animate-scale-in">
          <button
            type="button"
            onClick={() => setTipOpen(false)}
            className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-forest-500 text-cream shadow-soft"
            aria-label="Fermer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <p className="font-sans text-xs leading-relaxed text-forest-800">
            <span className="font-semibold text-forest-900">Besoin d'aide ?</span>
            <br />
            Réservez votre matériel en 2 minutes sur WhatsApp.
          </p>
        </div>
      )}

      <a
        href={waLink('Bonjour Eventia 237, je souhaite organiser un événement à Douala. Pouvez-vous m\'aider ?')}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-15 w-15 items-center justify-center rounded-full bg-whatsapp text-white shadow-card animate-wa-pulse transition-transform duration-300 hover:scale-105 sm:h-16 sm:w-16"
        style={{ height: '3.75rem', width: '3.75rem' }}
        aria-label="Contacter Eventia 237 sur WhatsApp"
      >
        <WhatsAppIcon className="h-8 w-8 sm:h-9 sm:w-9" />
        <span className="absolute right-0 top-0 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-gold-400 ring-2 ring-white" />
        </span>
      </a>
    </div>
  );
}
