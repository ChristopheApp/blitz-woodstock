import db from "db"
import { Order } from "@prisma/client"

export default async function deliverOrder(order: Order) {
  console.log("deliverOrder")
  console.log(order)
  const result = await db.order.update({
    where: { id: order.id },
    data: { status: "DELIVERED" },
  })

  /**
   * If the order is a purchase, we need to update the supplier's stocks
   */
  if (order.type === "PURCHASE" && order.supplierId) {
    const supplier = await db.supplier.findFirst({
      where: { id: order.supplierId },
    })

    if (supplier) {
      const wood = await db.wood.findFirst({
        where: { type: order.woodType, supplierId: supplier.id },
      })

      if (wood) {
        const updatedWood = await db.wood.update({
          where: { id: wood.id },
          data: {
            quantity: wood.quantity - order.quantity,
          },
        })
        console.log(updatedWood)
      }
    }
  }

  // /** DONT NEED THIS
  //  * If the order is a purchase, we need to update the user's stocks
  //  *
  //  */
  // const wood = await db.wood.findFirst({
  //   where: { type: order.woodType, userId: order.userId },
  // })

  // if (wood) {
  //   const user = await db.user.update({
  //     where: { id: order.userId },
  //     data: {
  //       stocks: {
  //         upsert: {
  //           where: { id: wood.id },
  //           update: {
  //             quantity: wood.quantity + order.quantity,
  //             price: wood.price + order.totalPrice,
  //           },
  //           create: {
  //             quantity: order.quantity,
  //             type: order.woodType,
  //             price: order.totalPrice,
  //           },
  //         },
  //       },
  //     },
  //     include: { stocks: true },
  //   })
  //   console.log(user)
  // } else {
  //   const user = await db.user.update({
  //     where: { id: order.userId },
  //     data: {
  //       stocks: {
  //         create: {
  //           quantity: order.quantity,
  //           type: order.woodType,
  //           price: order.totalPrice,
  //         },
  //       },
  //     },
  //     include: { stocks: true },
  //   })
  //   console.log(user)
  // }
  return result
}
