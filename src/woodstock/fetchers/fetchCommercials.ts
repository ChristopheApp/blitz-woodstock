import db from "db"

const fetchCommerials = async (userId: string) => {
  const comms = await db.user.findMany({
    where: { adminId: userId },
    select: { id: true, name: true, email: true, role: true },
  })
  console.log(comms)
  return comms
}

export default fetchCommerials
