import db, { Supplier } from "db"

export default async function addSupplierToAdmin({ supplier, adminId }) {
  let user: any
  user = await db.user.update({
    where: { id: adminId },
    data: {
      suppliers: {
        connect: {
          id: supplier.id,
        },
      },
    },
    include: { suppliers: true },
  })

  return user
}
