// bubbles/gaming/achievements/router.ts
import { router, procedure } from "@/lib/trpc/init"
import { z } from "zod"
import { emitEvent } from "@/lib/core/events"

export const gamingRouter = router({
  // Lier un compte Steam
  linkSteam: procedure
    .input(z.object({ userId: z.string(), steamId: z.string() }))
    .mutation(async ({ input }) => {
      // TODO: INSERT INTO game_profiles
      return { success: true }
    }),

  // Récupérer les achievements via l'API Steam
  syncAchievements: procedure
    .input(z.object({ userId: z.string(), steamId: z.string() }))
    .mutation(async ({ input }) => {
      // TODO: appel Steam Web API
      // GET http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/
      // Puis INSERT INTO bubble_items
      return { synced: 0 }
    }),

  listAchievements: procedure
    .input(z.object({
      userId:  z.string(),
      gameId:  z.string().optional(),
      unlocked: z.boolean().optional(),
    }))
    .query(async ({ input }) => {
      // TODO: SELECT FROM bubble_items WHERE bubbleSlug='gaming' AND itemType='achievement'
      return []
    }),

  // Émettre un événement quand un achievement est débloqué
  unlockAchievement: procedure
    .input(z.object({
      userId:          z.string(),
      gameId:          z.string(),
      gameName:        z.string(),
      achievementId:   z.string(),
      achievementName: z.string(),
      iconUrl:         z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await emitEvent({
        type: "gaming.achievement.unlocked",
        userId: input.userId,
        payload: {
          gameId:          input.gameId,
          gameName:        input.gameName,
          achievementId:   input.achievementId,
          achievementName: input.achievementName,
          iconUrl:         input.iconUrl,
        },
      })
      return { success: true }
    }),
})
