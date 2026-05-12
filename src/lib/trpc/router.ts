// lib/trpc/router.ts
import { router } from "./init"
import { todosRouter }     from "@/bubbles/work/todos/router"
import { converterRouter } from "@/bubbles/tools/converter/router"
import { gamingRouter }    from "@/bubbles/gaming/achievements/router"

export const appRouter = router({
  todos:     todosRouter,
  converter: converterRouter,
  gaming:    gamingRouter,
})

export type AppRouter = typeof appRouter
