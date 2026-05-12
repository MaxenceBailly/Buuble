// lib/core/events.ts
// Bus d'événements universel de Buuble
// Chaque module émet ici → le core dispatche aux consumers

export type BuubleEvent =
  // Gaming
  | { type: "gaming.achievement.unlocked"; userId: string; payload: { gameId: string; gameName: string; achievementId: string; achievementName: string; iconUrl?: string } }
  | { type: "gaming.game.completed";       userId: string; payload: { gameId: string; gameName: string } }
  // Work
  | { type: "work.task.completed";         userId: string; payload: { taskId: string; title: string } }
  | { type: "work.project.finished";       userId: string; payload: { projectId: string; title: string } }
  // Tools
  | { type: "tools.file.converted";        userId: string; payload: { filename: string; fromFormat: string; toFormat: string; fileUrl: string } }
  // Music (v2)
  | { type: "music.concert.saved";         userId: string; payload: { artistName: string; venue: string; date: string } }
  // Films (v2)
  | { type: "films.film.watched";          userId: string; payload: { filmId: string; title: string; rating?: number } }

// Consumers enregistrés pour chaque event
type EventConsumer<T extends BuubleEvent["type"]> = (
  event: Extract<BuubleEvent, { type: T }>
) => Promise<void>

const consumers = new Map<string, EventConsumer<any>[]>()

export function onEvent<T extends BuubleEvent["type"]>(
  eventType: T,
  handler: EventConsumer<T>
) {
  const existing = consumers.get(eventType) ?? []
  consumers.set(eventType, [...existing, handler])
}

export async function emitEvent(event: BuubleEvent) {
  const handlers = consumers.get(event.type) ?? []
  await Promise.all(handlers.map(h => h(event as any)))
}

// ─────────────────────────────────────────────
// Consumers par défaut — branchés au démarrage
// ─────────────────────────────────────────────

// Quand un achievement est débloqué → publier dans le feed
onEvent("gaming.achievement.unlocked", async (event) => {
  console.log(`[feed] ${event.userId} a débloqué "${event.payload.achievementName}"`)
  // → INSERT INTO activity_feed
})

// Quand un concert est sauvé → créer une todo
onEvent("music.concert.saved", async (event) => {
  console.log(`[todo] Rappel concert "${event.payload.artistName}" le ${event.payload.date}`)
  // → INSERT INTO todo_items avec sourceBubble="music"
})
