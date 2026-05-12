# Buuble

Buuble est une base Next.js 16 + tRPC + Supabase pour construire une application multi-modules
(`gaming`, `work`, `tools`, ...).

## Demarrage rapide

1. Installer les dependances:

```bash
npm install
```

2. Creer le fichier local d'environnement:

```bash
# macOS / Linux
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example .env.local
```

3. Remplir au minimum ces variables dans `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`

4. Lancer le projet:

```bash
npm run dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000)

## Structure utile

- `src/lib/core/registry.ts`: registre des modules Buuble
- `src/lib/core/events.ts`: bus d'evenements cross-modules
- `src/lib/trpc/router.ts`: routeur principal tRPC
- `src/lib/supabase/*`: clients Supabase (serveur + navigateur)
- `src/bubbles/*`: logique metier par module

## Prochaines etapes conseillees

- Brancher une route API tRPC dans `src/app/api/trpc/[trpc]/route.ts`
- Connecter `todosRouter` a Prisma/Supabase (plus de mock)
- Ajouter l'auth Supabase et propager `userId` depuis la session
- Ajouter les premieres tables SQL et migrations
