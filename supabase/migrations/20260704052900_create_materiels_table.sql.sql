/*
# Create materiels table for Eventia 237 catalogue

1. New Tables
- `materiels`
  - `id` (uuid, primary key)
  - `nom` (text, not null, unique) - product display name
  - `description` (text) - short description shown on cards
  - `prix` (integer, not null) - rental price in FCFA
  - `categorie` (text, not null) - filter category (chaises, tables, tentes, nappes_housses, vaisselle_divers)
  - `image_url` (text) - URL to product image in Supabase Storage (may be NULL)
  - `ordre` (integer, default 0) - display order
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `materiels`.
- Public read-only access for anon + authenticated (catalogue is intentionally public, no sign-in screen).
- No write policies: the catalogue is managed via the database, not from the frontend.

3. Data
- Seeds the 26 reference materials provided by the owner, each mapped to its filter category.
*/

CREATE TABLE IF NOT EXISTS materiels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  description text,
  prix integer NOT NULL,
  categorie text NOT NULL,
  image_url text,
  ordre integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS materiels_nom_key ON materiels(nom);
CREATE INDEX IF NOT EXISTS materiels_categorie_idx ON materiels(categorie);

ALTER TABLE materiels ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_materiels" ON materiels;
CREATE POLICY "public_read_materiels"
ON materiels FOR SELECT
TO anon, authenticated USING (true);

INSERT INTO materiels (nom, description, prix, categorie, image_url, ordre) VALUES
('Chaises d''enfants simples', 'Chaises pour enfants', 100, 'chaises', NULL, 1),
('Chaises plastiques simples', 'Chaises plastiques empilables', 100, 'chaises', NULL, 2),
('Chaises acrylique', 'Chaises acrylique transparentes', 1100, 'chaises', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/CHAISES/Chaises-acryliques/20260703_204229_9432.jpg', 3),
('Chaises capitonnées', 'Chaises capitonnées confortables', 1100, 'chaises', NULL, 4),
('Tente ordinaire 8x4 m', 'Tente 8m x 4m', 15000, 'tentes', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/TENTES/Tentes-simple-4m.8m/20260703_204146_6638.webp', 5),
('Tente ordinaire 6x6 m', 'Tente 6m x 6m', 15000, 'tentes', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/TENTES/Tentes-simples-6m.6m/20260703_204151_1548.webp', 6),
('Chapiteau 5x5 m', 'Chapiteau 5x5 m', 20000, 'tentes', NULL, 7),
('Table rectangulaire 10 places', 'Table rectangulaire 10 places', 1000, 'tables', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/TABLES/tables-rectangulaires/IMG-20251203-WA0001.jpg', 8),
('Table ronde 10 places', 'Table ronde 10 places', 1000, 'tables', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/TABLES/tables-rondes/IMG-20251203-WA0000.jpg', 9),
('Mange-debout', 'Table mange-debout', 2500, 'tables', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/TABLES/mange-debout/IMG_20251119_103432_357.jpg', 10),
('Nappe rectangulaire', 'Nappe rectangulaire', 1000, 'nappes_housses', NULL, 11),
('Nappe ronde', 'Nappe ronde', 1000, 'nappes_housses', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/NAPPES/nappe-ronde/20260703_204127_7353.webp', 12),
('Nappe mange-debout', 'Nappe mange-debout', 2500, 'nappes_housses', NULL, 13),
('Chemin de table', 'Chemin de table', 250, 'nappes_housses', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/CHEMIN-DE-TABLE/20260703_204136_6573.webp', 14),
('Noeuds de chaises', 'Noeuds de chaises', 100, 'nappes_housses', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/NOEUDS-DE-CHAISES/20260703_204131_1936.webp', 15),
('Housses slims', 'Housses slims', 250, 'nappes_housses', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/HOUSSES/housse-slim/20260703_204220_0278.webp', 16),
('Housses coton', 'Housses coton', 150, 'nappes_housses', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/HOUSSES/housse-coton/Screenshot_20260703_141340_WhatsApp.jpg', 17),
('Groupe électrogène', 'Groupe électrogène', 20000, 'vaisselle_divers', NULL, 18),
('Marmite chauffante', 'Marmite chauffante', 2500, 'vaisselle_divers', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/MARMITE-CHAUFFANTE/20260703_204241_1803.webp', 19),
('Couvert Simple', 'Couvert Simple', 700, 'vaisselle_divers', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/COUVERTS/couvert-simple/20260703_204205_5975.webp', 20),
('Couvert Standard', 'Couvert Standard', 1000, 'vaisselle_divers', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/COUVERTS/couvert-standard/IMG_20251118_085123_591.jpg', 21),
('Couvert Améliorée', 'Couvert Améliorée', 1500, 'vaisselle_divers', NULL, 22),
('Couvert Amélioré Plus', 'Couvert Amélioré Plus', 2000, 'vaisselle_divers', NULL, 23),
('Gazon synthétique', 'Gazon synthétique', 1000, 'vaisselle_divers', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/gazon/IMG_20251119_102703_640.jpg', 24),
('Tapis rouge', 'Tapis rouge', 1000, 'vaisselle_divers', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/TAPIS/IMG_20251119_092016_836.jpg', 25),
('Contours de tables rectangulaires', 'Contours de tables rectangulaires', 2000, 'nappes_housses', 'https://fkyqhozpjieyanpmvvsg.supabase.co/storage/v1/object/public/catalogue-eventia/cataloggue-eventia237/contour-de-table/20260703_204828_8094.webp', 26)
ON CONFLICT (nom) DO UPDATE SET
  description = EXCLUDED.description,
  prix = EXCLUDED.prix,
  categorie = EXCLUDED.categorie,
  image_url = EXCLUDED.image_url,
  ordre = EXCLUDED.ordre;
