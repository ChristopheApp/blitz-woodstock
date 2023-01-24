import db from "db"

const getNotAdminSuppliers = async (adminId: string) => {
  const suppliers = await db.supplier.findMany({
    where: {
      NOT: {
        userId: adminId,
      },
    },
    include: { stock: true },
  })
  console.log(suppliers)
  return suppliers
}

export default getNotAdminSuppliers
