// src/lib/prisma.ts
// Note: run `npx prisma generate` locally to get full types

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any

if (process.env.NODE_ENV === "production") {
  const { PrismaClient } = require("@prisma/client")
  prisma = new PrismaClient()
} else {
  const g = globalThis as any
  if (!g._prisma) {
    const { PrismaClient } = require("@prisma/client")
    g._prisma = new PrismaClient()
  }
  prisma = g._prisma
}

export default prisma