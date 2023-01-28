import db from "db"

const getNotAdminCustomers = async (adminId: string) => {
  console.log("getNotAdminCustomers")
  console.log(adminId)
  const customers = await db.customer.findMany({
    where: {
      NOT: {
        userId: { has: adminId },
      },
    },
  })

  return customers
}

export default getNotAdminCustomers
