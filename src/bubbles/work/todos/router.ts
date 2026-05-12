// bubbles/work/todos/router.ts
import { router, procedure } from "@/lib/trpc/init"
import { z } from "zod"
import { createSupabaseAdminClient } from "@/lib/supabase/server"

export const todosRouter = router({
  list: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const supabase = createSupabaseAdminClient()
      const { data, error } = await supabase
        .from("todo_items")
        .select("*")
        .eq("userId", input.userId)
        .order("createdAt", { ascending: false })

      if (error) {
        throw new Error(`todos.list failed: ${error.message}`)
      }

      return data ?? []
    }),

  create: procedure
    .input(z.object({
      userId:       z.string(),
      title:        z.string().min(1),
      description:  z.string().optional(),
      dueAt:        z.string().optional(),
      sourceBubble: z.string().optional(),
      sourceRefId:  z.string().optional(),
      sourceData:   z.any().optional(),
    }))
    .mutation(async ({ input }) => {
      const supabase = createSupabaseAdminClient()
      const { data, error } = await supabase
        .from("todo_items")
        .insert({
          userId: input.userId,
          title: input.title,
          description: input.description ?? null,
          sourceBubble: input.sourceBubble ?? null,
          sourceRefId: input.sourceRefId ?? null,
          sourceData: input.sourceData ?? null,
          dueAt: input.dueAt ?? null,
        })
        .select("*")
        .single()

      if (error) {
        throw new Error(`todos.create failed: ${error.message}`)
      }

      return data
    }),

  complete: procedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const supabase = createSupabaseAdminClient()
      const { error } = await supabase
        .from("todo_items")
        .update({ status: "DONE" })
        .eq("id", input.id)
        .eq("userId", input.userId)

      if (error) {
        throw new Error(`todos.complete failed: ${error.message}`)
      }

      return { success: true }
    }),

  delete: procedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const supabase = createSupabaseAdminClient()
      const { error } = await supabase
        .from("todo_items")
        .delete()
        .eq("id", input.id)
        .eq("userId", input.userId)

      if (error) {
        throw new Error(`todos.delete failed: ${error.message}`)
      }

      return { success: true }
    }),
})
