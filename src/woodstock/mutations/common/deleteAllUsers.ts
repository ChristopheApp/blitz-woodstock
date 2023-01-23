import db from "db"

export default async function deleteAllUsers() {
  const users = await db.user.deleteMany({})

  return users
}
