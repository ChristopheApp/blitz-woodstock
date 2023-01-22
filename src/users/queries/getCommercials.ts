import db from "db"

export default async function getCommercials(userId) {
  if (!userId) return null

  const comms = await db.user.findMany({
    where: { adminId: userId },
    select: { id: true, name: true, email: true, role: true },
  })
  return comms
}
