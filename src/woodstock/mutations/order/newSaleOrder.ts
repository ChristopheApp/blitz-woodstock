import db from "db"

export default async function newSaleOrder(data: any) {
  const { quantity, unitPrice, wood, adminId, type, buyerId } = data

  const user = await db.user.update({
    where: { id: adminId },
    data: {
      orders: {
        create: {
          quantity: quantity,
          totalPrice: quantity * unitPrice,
          type: type,
          woodType: wood.woodType,
          status: "CREATED",
          buyerId: buyerId,
          avgPrice: unitPrice,
        },
      },
    },
    include: {
      orders: true,
    },
  })
  return user
}
