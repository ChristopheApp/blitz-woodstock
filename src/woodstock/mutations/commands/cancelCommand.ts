import db from "db"
import { Command } from "@prisma/client"

export default async function cancelCommand(command: Command) {
  const result = await db.command.update({
    where: { id: command.id },
    data: { status: "CANCELED" },
  })

  if (command.status === "DELIVERED") {
    /**
     * If the command is a purchase, we need to update the supplier's stocks
     */
    if (command.type === "PURCHASE" && command.supplierId) {
      const wood = await db.wood.findFirst({
        where: { type: command.woodType, supplierId: command.supplierId },
      })
      if (wood) {
        const supplier = await db.supplier.update({
          where: { id: command.supplierId },
          data: {
            stock: {
              upsert: {
                where: { id: wood.id },
                update: { quantity: wood.quantity + command.quantity },
                create: {
                  quantity: command.quantity,
                  type: command.woodType,
                  price: command.totalPrice / command.quantity,
                },
              },
            },
          },
        })
      } else {
        const supplier = await db.supplier.update({
          where: { id: command.supplierId },
          data: {
            stock: {
              create: {
                quantity: command.quantity,
                type: command.woodType,
                price: command.totalPrice / command.quantity,
              },
            },
          },
        })
      }
    }
    /**
     * If the command is a purchase, we need to update the user's stocks
     */
    // const wood = await db.wood.findFirst({
    //   where: { userId: command.userId, type: command.woodType },
    // })

    // if(wood) {
    //   const updateWood = await db.wood.update({
    //     where: { id: wood.id },
    //     data: {
    //         quantity: wood.quantity - command.quantity,
    //         price: wood.price - command.totalPrice,
    //       },
    //   })
    // }

    const woodU = await db.wood.findFirst({
      where: { type: command.woodType, userId: command.userId },
    })

    if (woodU) {
      const user = await db.user.update({
        where: { id: command.userId },
        data: {
          stocks: {
            upsert: {
              where: { id: woodU.id },
              update: {
                quantity: woodU.quantity - command.quantity,
                price: woodU.price - command.totalPrice,
              },
              create: {
                quantity: -command.quantity,
                type: command.woodType,
                price: -command.totalPrice,
              },
            },
          },
        },
      })
      // Need to include stocks and if quantity of wood is 0, delete it
      return user
    }
  }

  return result
}
