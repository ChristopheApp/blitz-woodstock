import db from "db"

export default async function newCommand(data: any) {
  const { quantity, wood, adminId, type } = data

  const command = await db.user.update({
    where: { id: adminId },
    data: {
      commands: {
        create: {
          quantity: quantity,
          totalPrice: quantity * wood.price,
          type: type,
          woodType: wood.type,
          status: "CREATED",
          supplierId: wood.supplierId,
        },
      },
    },
    include: {
      commands: true,
    },
  })
  return command
}
