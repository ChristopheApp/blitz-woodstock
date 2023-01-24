import db from "db"

const getNotAdminBuyers = async (adminId: string) => {
  console.log("getNotAdminBuyers")
  console.log(adminId)
  const buyers = await db.buyer.findMany()

  const newArray = buyers.filter((e) => e.userId !== adminId)
  console.log(newArray)

  return newArray
}

export default getNotAdminBuyers
