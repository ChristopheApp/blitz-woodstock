import db from "db"

const getNotAdminSuppliers = async (adminId: string) => {
  const suppliers = await db.supplier.findMany({
    where: {
      NOT: {
        userId: { has: adminId },
      },
    },
    include: { stock: true },
  })
  return suppliers
}

export default getNotAdminSuppliers
