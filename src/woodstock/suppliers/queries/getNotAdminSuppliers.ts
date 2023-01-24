import db from "db"

const getNotAdminSuppliers = async (adminId: string) => {
  console.log("getNotAdminSuppliers")
  console.log(adminId)
  const suppliers = await db.supplier.findMany({
    include: { stock: true },
  })
  console.log(suppliers)

  const newArray = suppliers.filter((e) => e.userId !== adminId)
  console.log(newArray)

  return newArray
}

export default getNotAdminSuppliers
