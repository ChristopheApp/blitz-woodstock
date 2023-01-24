import db, { Supplier } from "db"

export default async function addBuyerToAdmin({ buyerId, adminId }) {
  let user: any
  user = await db.user.update({
    where: { id: adminId },
    data: {
      buyers: {
        connect: {
          id: buyerId,
        },
      },
    },
    include: { buyers: true },
  })

  return user
}
