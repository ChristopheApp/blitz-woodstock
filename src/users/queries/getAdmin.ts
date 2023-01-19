import db, { User } from "db"

export default async function getAdminOrCommercials(userId) {
  if (!userId) return null

  const admin = await db.user.findFirst({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true },
  })
  console.log(admin)
  return admin
}
