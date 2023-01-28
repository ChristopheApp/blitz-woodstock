import db from "db"

export default async function removeSupplierFromAdmin({ customerId, adminId }) {
  let user: any
  user = await db.user.update({
    where: { id: adminId },
    data: {
      customers: {
        disconnect: {
          id: customerId,
        },
      },
    },
    include: { customers: true },
  })

  return user
}
