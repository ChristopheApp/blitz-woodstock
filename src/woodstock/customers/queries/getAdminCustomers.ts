import db from "db"

const getAdminCustomers = async (adminId: string) => {
  const customers = await db.customer.findMany({
    where: { userId: { has: adminId } },
  })
  console.log(customers)
  return customers
}

export default getAdminCustomers
