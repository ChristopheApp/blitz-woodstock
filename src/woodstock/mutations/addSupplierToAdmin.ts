import db, { Supplier } from "db"

export default async function addSupplierToAdmin({ supplierId, adminId }) {
  let user: any
  user = await db.user.update({
    where: { id: adminId },
    data: {
      suppliers: {
        connect: {
          id: supplierId,
        },
      },
    },
    include: { suppliers: true },
  })

  return user
}
