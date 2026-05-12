// lib/core/registry.ts
// Registre de tous les modules Buuble
// Ajouter un module ici = il est automatiquement intégré partout

export interface BubbleModule {
  slug: string           // "gaming.achievements"
  bubble: string         // "gaming"
  name: string
  version: string

  // Ce que le module peut créer comme todos
  todoTypes: {
    type: string
    label: string
    icon: string
  }[]

  // Événements émis (déclenchent actions cross-bulles)
  feedEvents: string[]

  // Actions sociales disponibles
  socialActions: string[]

  // Entités indexées dans la recherche globale
  searchEntities: string[]

  // Triggers de notifications
  notifications: {
    trigger: string
    delay: string        // "immediate" | "-3d" | "+1h"
  }[]

  // Niveaux d'abonnement
  tiers: {
    free: string[]
    plus?: string[]
    pro?: string[]
  }
}

// ─────────────────────────────────────────────
// V1 — Bulles de lancement
// ─────────────────────────────────────────────

export const GamingAchievements: BubbleModule = {
  slug: "gaming.achievements",
  bubble: "gaming",
  name: "Achievements",
  version: "1.0.0",
  todoTypes: [
    { type: "achievement", label: "Achievement à débloquer", icon: "🏆" },
    { type: "game",        label: "Jeu à finir",             icon: "🎮" },
  ],
  feedEvents: [
    "gaming.achievement.unlocked",
    "gaming.game.completed",
    "gaming.profile.linked",
  ],
  socialActions: ["share_achievement", "challenge_friend", "recommend_game"],
  searchEntities: ["game", "achievement"],
  notifications: [
    { trigger: "gaming.achievement.unlocked", delay: "immediate" },
  ],
  tiers: {
    free: ["view_achievements", "link_steam"],
    plus: ["sync_all_platforms", "achievement_tracker"],
    pro:  ["rare_achievement_alerts", "completion_stats"],
  },
}

export const TodoCore: BubbleModule = {
  slug: "work.todos",
  bubble: "work",
  name: "Todo & Productivité",
  version: "1.0.0",
  todoTypes: [
    { type: "task",    label: "Tâche",    icon: "✅" },
    { type: "project", label: "Projet",   icon: "📁" },
    { type: "idea",    label: "Idée",     icon: "💡" },
  ],
  feedEvents: [
    "work.task.completed",
    "work.project.finished",
  ],
  socialActions: ["share_task", "assign_to_friend"],
  searchEntities: ["task", "project"],
  notifications: [
    { trigger: "task.due_soon",   delay: "-1d" },
    { trigger: "task.overdue",    delay: "immediate" },
  ],
  tiers: {
    free: ["todos", "projects"],
    plus: ["recurring_tasks", "subtasks", "reminders"],
    pro:  ["kanban", "time_tracking", "integrations"],
  },
}

export const FileConverter: BubbleModule = {
  slug: "tools.converter",
  bubble: "tools",
  name: "Convertisseur de fichiers",
  version: "1.0.0",
  todoTypes: [],
  feedEvents: [
    "tools.file.converted",
  ],
  socialActions: ["share_converted_file"],
  searchEntities: [],
  notifications: [
    { trigger: "tools.file.conversion_done", delay: "immediate" },
  ],
  tiers: {
    free: ["images", "documents", "max_10mb"],
    plus: ["audio", "video_short", "max_100mb"],
    pro:  ["video_long", "batch_convert", "max_1gb"],
  },
}

// ─────────────────────────────────────────────
// Registre global — ajouter ici pour activer
// ─────────────────────────────────────────────

export const MODULE_REGISTRY: BubbleModule[] = [
  GamingAchievements,
  TodoCore,
  FileConverter,
  // v2: MusicConcerts, FilmsWatchlist, ...
  // v3: GamingLegacyServers, GamingMultiworld, ...
]

export const getModule = (slug: string) =>
  MODULE_REGISTRY.find(m => m.slug === slug)

export const getBubbleModules = (bubble: string) =>
  MODULE_REGISTRY.filter(m => m.bubble === bubble)
