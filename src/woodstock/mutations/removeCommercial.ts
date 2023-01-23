import db, { Supplier } from "db"

export default async function removeCommercialFromAdmin({ commercialId, adminId }) {
  let user: any
  user = await db.user.update({
    where: { id: adminId },
    data: {
      commercials: {
        disconnect: {
          id: commercialId,
        },
      },
    },
    include: { commercials: true },
  })

  await db.user.delete({
    where: { id: commercialId },
  })

  return user
}
