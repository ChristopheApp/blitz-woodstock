import db from "db"

export default async function removeSupplierFromAdmin({ buyerId, adminId }) {
  let user: any
  user = await db.user.update({
    where: { id: adminId },
    data: {
      buyers: {
        disconnect: {
          id: buyerId,
        },
      },
    },
    include: { buyers: true },
  })

  return user
}
