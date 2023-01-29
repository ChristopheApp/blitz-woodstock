import db, { Supplier } from "db"

export default async function addCustomerToAdmin({ customerId, adminId }) {
  let user: any
  user = await db.user.update({
    where: { id: adminId },
    data: {
      customers: {
        connect: {
          id: customerId,
        },
      },
    },
    include: { customers: true },
  })

  return user
}
