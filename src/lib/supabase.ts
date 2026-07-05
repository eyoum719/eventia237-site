import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const WHATSAPP_NUMBER = '237654497118';
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export const isSupabaseConfigured =
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: { persistSession: false },
    })
  : null;

export type Materiel = {
  id: string;
  nom: string;
  description: string | null;
  prix: number;
  categorie: string;
  image_url: string | null;
  ordre: number;
};

export type CategorieKey =
  | 'chaises'
  | 'tables'
  | 'tentes'
  | 'nappes_housses'
  | 'vaisselle_divers';

export const CATEGORIES: { key: CategorieKey; label: string }[] = [
  { key: 'chaises', label: 'Chaises' },
  { key: 'tables', label: 'Tables' },
  { key: 'tentes', label: 'Tentes' },
  { key: 'nappes_housses', label: 'Nappes & Housses' },
  { key: 'vaisselle_divers', label: 'Vaisselle & Divers' },
];

export async function fetchMateriels(): Promise<Materiel[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('materiels')
    .select('id, nom, description, prix, categorie, image_url, ordre')
    .order('ordre', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Materiel[];
}

export function waLink(text: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export function formatFCFA(value: number): string {
  return value.toLocaleString('fr-FR').replace(/\u202f/g, ' ');
}
