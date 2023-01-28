import db from "db"

const getAdminBuyers = async (adminId: string) => {
  const buyers = await db.buyer.findMany({
    where: { userId: adminId },
  })
  console.log(buyers)
  return buyers
}

export default getAdminBuyers
