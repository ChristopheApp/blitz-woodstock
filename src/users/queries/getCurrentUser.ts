import { Ctx } from "blitz"
import db, { User } from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user: User | null = await db.user.findFirst({
    where: { id: session.userId },
    include: { commercials: true, commands: true, stocks: true },
  })

  let admin: User | null = user

  if (user?.role === "COMMERCIAL") {
    admin = await db.user.findFirst({
      where: { id: user.adminId as string },
      include: { commercials: true, commands: true, stocks: true },
    })
  }

  return { user, admin }
}
