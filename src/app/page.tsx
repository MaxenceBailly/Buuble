import { MODULE_REGISTRY } from "@/lib/core/registry";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="space-y-3">
        <p className="text-sm text-zinc-500">Buuble v0 — workspace bootstrap</p>
        <h1 className="text-3xl font-semibold tracking-tight">Ton projet est bien lance</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Base Next.js + tRPC detectee. Cette page sert de point de depart pour brancher Supabase
          et activer les premieres fonctionnalites.
        </p>
      </header>

      <section className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="mb-3 text-lg font-medium">Checklist immediate</h2>
        <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <li>1. Creer `.env.local` depuis `.env.example`</li>
          <li>2. Renseigner les variables Supabase (URL + anon key + service role key)</li>
          <li>3. Verifier la connexion DB avec `DATABASE_URL`</li>
          <li>4. Connecter les routers tRPC a une route API</li>
          <li>5. Remplacer les TODO par Prisma/Supabase</li>
        </ul>
      </section>

      <section className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="mb-3 text-lg font-medium">Test API tRPC</h2>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Endpoint actif: <code>/api/trpc</code>. Test rapide en navigateur:
        </p>
        <p className="mt-2 break-all rounded bg-zinc-100 p-2 text-xs dark:bg-zinc-900">
          /api/trpc/todos.list?input=%7B%22userId%22%3A%22demo-user%22%7D
        </p>
      </section>

      <section className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="mb-3 text-lg font-medium">Modules detectes</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODULE_REGISTRY.map((module) => (
            <article
              key={module.slug}
              className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700"
            >
              <p className="text-xs uppercase tracking-wide text-zinc-500">{module.bubble}</p>
              <p className="mt-1 font-medium">{module.name}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{module.slug}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
