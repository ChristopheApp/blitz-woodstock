import db, { Supplier } from "db"

export default async function removeSupplierFromAdmin({ supplierId, adminId }) {
  let user: any
  user = await db.user.update({
    where: { id: adminId },
    data: {
      suppliers: {
        disconnect: {
          id: supplierId,
        },
      },
    },
    include: { suppliers: true },
  })

  return user
}
