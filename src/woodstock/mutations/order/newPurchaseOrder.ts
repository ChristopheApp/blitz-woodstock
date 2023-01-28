import db from "db"

export default async function newOrder(data: any) {
  const { quantity, wood, adminId, type } = data

  const order = await db.user.update({
    where: { id: adminId },
    data: {
      orders: {
        create: {
          quantity: quantity,
          totalPrice: quantity * wood.price,
          type: type,
          woodType: wood.type,
          status: "CREATED",
          supplierId: wood.supplierId,
          avgPrice: wood.price,
        },
      },
    },
    include: {
      orders: true,
    },
  })
  return order
}
