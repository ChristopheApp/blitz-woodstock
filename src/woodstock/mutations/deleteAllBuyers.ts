import db from "db"

export default async function deleteAllBuyers() {
  const buyer = await db.buyer.deleteMany({})

  return buyer
}
