# Fast Transport Wien E.U. – Website & Bestellsystem

Vollständige Next.js-Webanwendung für **Fast Transport Wien E.U.**, optimiert für Vercel-Deployment via GitHub.

## Features

- Professionelle Website (Hero, Services, FAQ, Kundenstimmen, CTA)
- Online-Bestellformular mit **Live-Preisrechner** (Backend-only Rabattlogik)
- Rabattcode `FTW20` (max. 100 € Rabatt pro Auftrag)
- Bestellungen werden in PostgreSQL gespeichert
- Admin-Dashboard (Login per E-Mail/Passwort aus Env-Variablen, HMAC-signiertes Cookie)
- Status-Verwaltung (Eingegangen → Bestätigt → In Bearbeitung → Zugestellt)
- Preis-Anpassung pro Auftrag durch Admin
- **PDF-Rechnungen** im Format der bestehenden FTW-Rechnung (auto-generiert mit pdf-lib)
- Kontaktformular, Impressum, Datenschutz, AGB, Cookie-Banner
- Mobile-first, Tailwind CSS

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma + PostgreSQL**
- **pdf-lib** für PDF-Rechnungen
- **Zod** für Validierung
- **HMAC-Cookie-Auth** (kein next-auth, keine Peer-Dep-Konflikte)

## Vercel Deployment – Schritt für Schritt

### 1. Repository auf GitHub pushen

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/fast-transport-wien.git
git push -u origin main
```

### 2. Postgres-Datenbank anlegen

Empfehlung: **Vercel Postgres** (kostenloser Tier, 1-Klick-Setup) oder **Neon** / **Supabase** / **Railway**.

#### Vercel Postgres
1. Vercel Dashboard → **Storage** → **Create** → **Postgres**
2. Datenbank mit dem Projekt verbinden (das setzt `DATABASE_URL` automatisch)

#### Neon (Alternative)
1. Bei <https://neon.tech> einen kostenlosen Account erstellen
2. Neues Projekt anlegen → Connection String kopieren

### 3. Projekt auf Vercel importieren

1. Vercel Dashboard → **Add New** → **Project**
2. GitHub-Repo `fast-transport-wien` auswählen
3. **Framework Preset**: Next.js (wird automatisch erkannt)
4. **Build Command**: `npm run build` (Default ist OK)
5. **Environment Variables** setzen (siehe Schritt 4)
6. **Deploy** klicken

### 4. Environment Variables in Vercel setzen

Gehe zu **Project Settings → Environment Variables** und setze:

| Variable | Wert | Pflicht |
|----------|------|---------|
| `DATABASE_URL` | Postgres-Connection-String aus Schritt 2 | **Ja** |
| `ADMIN_EMAIL` | Deine Admin-E-Mail (z. B. `fasttransportwien@gmail.com`) | **Ja** |
| `ADMIN_PASSWORD` | Sicheres Passwort | **Ja** |
| `ADMIN_SECRET` | Zufällige Zeichenfolge (mindestens 32 Zeichen). Generieren: `openssl rand -base64 32` | **Ja** |
| `PRICE_PER_ADDRESS_GROSS` | `25` | Optional |
| `PRICE_DISCOUNT_PER_ADDRESS_GROSS` | `20` | Optional |
| `DISCOUNT_CODE` | `FTW20` | Optional |
| `DISCOUNT_MAX_GROSS` | `100` | Optional |
| `SURCHARGE_OVER_10KG_GROSS` | `10` | Optional |
| `SURCHARGE_EXPRESS_GROSS` | `15` | Optional |
| `SURCHARGE_COOLING_GROSS` | `20` | Optional |
| `MIN_ORDER_GROSS` | `25` | Optional |
| `VAT_RATE` | `0.20` | Optional |

Alle 4 Pflicht-Variablen müssen gesetzt sein, damit Login und Datenbank funktionieren.

### 5. Datenbank-Schema deployen (einmalig)

Die Vercel-Build-Pipeline ruft **nicht automatisch** `prisma db push` auf (um nicht versehentlich Tabellen zu zerstören). Mache das einmal manuell:

#### Option A: Mit Vercel CLI (empfohlen)

```bash
# Vercel CLI installieren
npm i -g vercel

# Im Projektverzeichnis: env-Variablen aus Vercel ziehen
vercel link
vercel env pull .env.production.local

# Schema deployen
DATABASE_URL=$(grep DATABASE_URL .env.production.local | cut -d= -f2- | tr -d '"') npx prisma db push
```

#### Option B: Lokal mit der Production-DB-URL

```bash
# Postgres-URL kopieren aus Vercel Dashboard → Storage → Postgres → .env.local
# In .env.local einfügen, dann:
npx prisma db push
```

### 6. Fertig!

- **Website**: `https://your-project.vercel.app/`
- **Admin**: `https://your-project.vercel.app/admin/login`
  - Login mit den `ADMIN_EMAIL` / `ADMIN_PASSWORD` aus Schritt 4

---

## Lokale Entwicklung

```bash
# 1) Dependencies installieren
npm install

# 2) .env aus .env.example anlegen
cp .env.example .env
# DATABASE_URL, ADMIN_*, ADMIN_SECRET setzen

# 3) Datenbank initialisieren
npx prisma db push

# 4) Dev-Server
npm run dev
```

→ <http://localhost:3000>

---

## Preis- und Rabattlogik (Backend-only)

Die exakte Rabattmechanik ist **ausschließlich** in `src/lib/pricing.ts` implementiert. Das Frontend bekommt nur die fertigen Zahlen (Zwischensumme, Rabatt, Endpreis).

Standardregeln (über Env-Variablen änderbar):

- Mindestpreis: **25 €** inkl. MwSt pro Auftrag
- Standardpreis: **25 €** inkl. MwSt pro Adresse
- Mit Code **FTW20**: effektiv **20 €** inkl. MwSt pro Adresse
- Maximaler Rabatt: **100 €** pro Auftrag
- Zuschlag bei > 10 kg: **+10 €**
- Express-Zuschlag: **+15 €**
- Kühltransport-Zuschlag: **+20 €**
- VAT: **20 %**

---

## Status-Workflow

```
RECEIVED → IN_REVIEW → CONFIRMED → IN_PROGRESS → DELIVERED
                                       ↘ CANCELLED
```

Admin ändert den Status im Auftrags-Detail (`/admin/orders/[id]`).

---

## Rechnungen

Format: `FTW-YYYY-NNN` (sequenziell pro Jahr).

PDF wird zur Laufzeit von `pdf-lib` erzeugt – kein externer Service nötig.
Layout entspricht der bestehenden FTW-Rechnung: grüner Header, Logo, Firmenblock,
Kunde, Leistungsbeschreibung, Netto / MwSt 20% / **Brutto in Brand-Grün**, 7 Tage Zahlungsziel.

---

## Was beim Build passiert

`npm run build` führt aus:

```
prisma generate && next build
```

`prisma generate` benötigt **keine** Datenbank-Verbindung – es liest nur das Schema.
`next build` erzeugt die statischen Seiten und API-Routen. Alle Admin- und Auftragsseiten
sind als `dynamic = 'force-dynamic'` markiert, sodass sie zur Laufzeit ausgeführt werden
und keine Build-Time-DB-Verbindung brauchen.

→ Der Vercel-Build funktioniert auch dann, wenn `DATABASE_URL` zum Build-Zeitpunkt
**noch nicht gesetzt** ist.

---

## Was wurde gegenüber der ersten Version geändert

Diese v2 wurde komplett neu aufgebaut, um Vercel-Build-Probleme zu beseitigen:

- **`next-intl` entfernt** – DE-only, vermeidet i18n-Build-Fehler
- **`next-auth` entfernt** – ersetzt durch HMAC-Cookie-Auth (keine Peer-Dep-Konflikte mit `nodemailer`)
- **`nodemailer` entfernt** – Kontakt- und Bestellanfragen werden in der DB gespeichert; das Admin-Dashboard zeigt sie an. (E-Mail-Versand kann jederzeit per Webhook zu Resend, Brevo etc. ergänzt werden.)
- **Prisma + PostgreSQL** statt SQLite – kompatibel mit Vercel
- **Keine Enums** im Prisma-Schema mehr – alle Status-Felder sind `String`
- **Alle build-relevanten Pakete in `dependencies`** (Tailwind, PostCSS, autoprefixer, Prisma CLI, TypeScript, @types/*) – Vercel installiert sie garantiert
- **`tsconfig.json`** mit explizitem `baseUrl: "."` und `paths: { "@/*": ["./src/*"] }`
- **Admin-Pages alle dynamic** – kein DB-Zugriff zur Build-Zeit
- **Flache Route-Struktur** ohne `[locale]` – keine Resolution-Probleme

---

## Lizenz

Dieses Projekt wurde individuell für Fast Transport Wien E.U. erstellt.
