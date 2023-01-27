import db from "db"
import { Command } from "@prisma/client"

export default async function deliverCommand(command: Command) {
  console.log("deliverCommand")
  console.log(command)
  const result = await db.command.update({
    where: { id: command.id },
    data: { status: "DELIVERED" },
  })

  /**
   * If the command is a purchase, we need to update the supplier's stocks
   */
  if (command.type === "PURCHASE" && command.supplierId) {
    const supplier = await db.supplier.findFirst({
      where: { id: command.supplierId },
    })

    if (supplier) {
      const wood = await db.wood.findFirst({
        where: { type: command.woodType, supplierId: supplier.id },
      })

      if (wood) {
        const updatedWood = await db.wood.update({
          where: { id: wood.id },
          data: {
            quantity: wood.quantity - command.quantity,
          },
        })
        console.log(updatedWood)
      }
    }
  }

  // /** DONT NEED THIS
  //  * If the command is a purchase, we need to update the user's stocks
  //  *
  //  */
  // const wood = await db.wood.findFirst({
  //   where: { type: command.woodType, userId: command.userId },
  // })

  // if (wood) {
  //   const user = await db.user.update({
  //     where: { id: command.userId },
  //     data: {
  //       stocks: {
  //         upsert: {
  //           where: { id: wood.id },
  //           update: {
  //             quantity: wood.quantity + command.quantity,
  //             price: wood.price + command.totalPrice,
  //           },
  //           create: {
  //             quantity: command.quantity,
  //             type: command.woodType,
  //             price: command.totalPrice,
  //           },
  //         },
  //       },
  //     },
  //     include: { stocks: true },
  //   })
  //   console.log(user)
  // } else {
  //   const user = await db.user.update({
  //     where: { id: command.userId },
  //     data: {
  //       stocks: {
  //         create: {
  //           quantity: command.quantity,
  //           type: command.woodType,
  //           price: command.totalPrice,
  //         },
  //       },
  //     },
  //     include: { stocks: true },
  //   })
  //   console.log(user)
  // }
  return result
}
