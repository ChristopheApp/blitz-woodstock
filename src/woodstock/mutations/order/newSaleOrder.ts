import db from "db"

export default async function newSaleOrder(data: any) {
  const { quantity, unitPrice, woodType, adminId, orderType, customerId } = data

  const user = await db.user.update({
    where: { id: adminId },
    data: {
      orders: {
        create: {
          quantity: quantity,
          totalPrice: quantity * unitPrice,
          orderType: orderType,
          woodType: woodType,
          status: "CREATED",
          customerId: customerId,
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
