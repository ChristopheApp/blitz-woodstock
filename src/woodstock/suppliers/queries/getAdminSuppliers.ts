import db from "db"

const getAdminSuppliers = async (adminId: string) => {
  const suppliers = await db.supplier.findMany({
    where: { userId: { has: adminId } },
    include: { stock: true },
  })
  console.log(suppliers)
  return suppliers
}

export default getAdminSuppliers
