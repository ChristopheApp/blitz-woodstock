import { Ctx } from "blitz"
import db, { User } from "db"
// import type UserInfos from "src/woodstock/types/UserInfos"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    include: { commercials: true, commands: true, stocks: true, suppliers: true, buyers: true },
  })

  let admin = user

  if (user?.role === "COMMERCIAL") {
    admin = await db.user.findFirst({
      where: { id: user.adminId as string },
      include: { commercials: true, commands: true, stocks: true, suppliers: true, buyers: true },
    })
  }

  const commercials = admin?.commercials
  const commands = admin?.commands
  const stocks = admin?.stocks
  const suppliers = admin?.suppliers
  const buyers = admin?.buyers

  return { user, admin, commercials, commands, stocks, suppliers, buyers }
}
