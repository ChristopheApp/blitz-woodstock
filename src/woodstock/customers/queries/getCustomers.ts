import db from "db"

const getBuyers = async (_ = null) => {
  const buyers = await db.buyer.findMany()
  return buyers
}

export default getBuyers
