import db, { Supplier } from "db"

export default async function removeSalesrepFromAdmin({ salesrepId, adminId }) {
  let user: any
  user = await db.user.update({
    where: { id: adminId },
    data: {
      salesreps: {
        disconnect: {
          id: salesrepId,
        },
      },
    },
    include: { salesreps: true },
  })

  await db.user.delete({
    where: { id: salesrepId },
  })

  return user
}
