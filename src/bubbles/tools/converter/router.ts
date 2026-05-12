// bubbles/tools/converter/router.ts
import { router, procedure } from "@/lib/trpc/init"
import { z } from "zod"

const SUPPORTED_CONVERSIONS: Record<string, string[]> = {
  "image/jpeg":      ["png", "webp", "gif", "avif"],
  "image/png":       ["jpg", "webp", "gif", "avif"],
  "image/webp":      ["jpg", "png"],
  "application/pdf": ["docx", "txt"],
  "text/plain":      ["pdf", "docx"],
}

export const converterRouter = router({
  supportedFormats: procedure.query(async () => {
    return SUPPORTED_CONVERSIONS
  }),

  convert: procedure
    .input(z.object({
      userId:       z.string(),
      filename:     z.string(),
      mimeType:     z.string(),
      targetFormat: z.string(),
      fileBase64:   z.string(), // fichier encodé en base64
    }))
    .mutation(async ({ input }) => {
      // TODO: appel Sharp/FFmpeg via Supabase Edge Function
      // Retourne un URL de téléchargement temporaire
      return {
        jobId:     crypto.randomUUID(),
        status:    "processing",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // 1h
      }
    }),

  jobStatus: procedure
    .input(z.object({ jobId: z.string() }))
    .query(async ({ input }) => {
      // TODO: vérifier le statut dans bubble_items
      return { status: "done", downloadUrl: null }
    }),
})
