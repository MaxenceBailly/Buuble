# Buuble

Buuble est une base Next.js 16 + tRPC + Supabase pour construire une application multi-modules
(`gaming`, `work`, `tools`, ...).

Description projet :

Une plateforme modulaire et connectée qui centralise différents domaines du quotidien au sein d’un même écosystème intelligent. L’idée n’est pas simplement de regrouper des services, mais de créer des “bulles” spécialisées — jeux vidéo, musique, films, productivité, travail, restauration, commerce, sport, hébergement, bases de données, etc. — capables d’interagir naturellement entre elles grâce à un profil utilisateur, un graphe social et un système d’événements communs. Chaque bulle peut évoluer indépendamment, ajouter ses propres fonctionnalités et devenir un véritable univers dédié, tout en restant profondément reliée au reste de la plateforme. Par exemple, un film peut être ajouté automatiquement à une todo list, recommandé à des amis, lié à un événement calendrier ou déclencher des suggestions basées sur les habitudes de l’utilisateur. Dans le domaine du jeu vidéo, la plateforme pourrait commencer par le suivi des achievements avant d’évoluer vers des classements, des systèmes multijoueur communautaires, des serveurs pour jeux abandonnés, ou encore des expériences coopératives inspirées d’Archipelago. L’objectif est de construire une plateforme évolutive pensée comme un “système d’exploitation social et personnel”, où chaque activité, donnée ou interaction peut se connecter intelligemment aux autres afin de créer une expérience fluide, personnalisée et communautaire. Techniquement, le projet repose sur une architecture modulaire et scalable orientée événements, permettant d’ajouter de nouvelles bulles ou de nouveaux modules sans devoir refondre le système existant, garantissant ainsi une forte évolutivité sur le long terme.

La DA : sombre avec des bulles, style glassmorphisme et organique

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
