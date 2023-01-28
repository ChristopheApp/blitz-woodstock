import db from "db"

const getNotAdminSuppliers = async (adminId: string) => {
  console.log("getNotAdminSuppliers")
  console.log(adminId)
  const suppliers = await db.supplier.findMany({
    where: {
      NOT: {
        userId: { has: adminId },
      },
    },
    include: { stock: true },
  })
  console.log("more suppliers : ", suppliers)

  // const newArray = suppliers.filter((e) => e.userId !== adminId)
  // console.log(newArray)

  return suppliers
}

export default getNotAdminSuppliers
