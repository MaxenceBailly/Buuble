// lib/trpc/init.ts
import { initTRPC } from "@trpc/server"
import { z } from "zod"

const t = initTRPC.create()

export const router    = t.router
export const procedure = t.procedure
export const middleware = t.middleware
