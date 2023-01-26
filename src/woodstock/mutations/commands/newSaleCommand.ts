import db from "db"

export default async function newSaleCommand(data: any) {
  const { quantity, unitPrice, wood, adminId, type, buyerId } = data

  const user = await db.user.update({
    where: { id: adminId },
    data: {
      commands: {
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
      commands: true,
    },
  })
  return user
}
