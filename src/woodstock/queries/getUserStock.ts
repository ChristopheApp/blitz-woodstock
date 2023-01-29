import db from "db"

export default async function getUserStock(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { stock: true },
  })
  return user
}
