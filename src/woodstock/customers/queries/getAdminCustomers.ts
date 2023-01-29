import db from "db"

const getAdminCustomers = async (adminId: string) => {
  const customers = await db.customer.findMany({
    where: { userId: { has: adminId } },
  })
  return customers
}

export default getAdminCustomers
