import db from "db"
import { Order } from "@prisma/client"

export default async function cancelOrder(order: Order) {
  const result = await db.order.update({
    where: { id: order.id },
    data: { status: "CANCELED" },
  })

  if (order.status === "DELIVERED") {
    /**
     * If the order is a purchase, we need to update the supplier's stocks
     */
    if (order.type === "PURCHASE" && order.supplierId) {
      const wood = await db.wood.findFirst({
        where: { type: order.woodType, supplierId: order.supplierId },
      })
      if (wood) {
        const supplier = await db.supplier.update({
          where: { id: order.supplierId },
          data: {
            stock: {
              upsert: {
                where: { id: wood.id },
                update: { quantity: wood.quantity + order.quantity },
                create: {
                  quantity: order.quantity,
                  type: order.woodType,
                  price: order.totalPrice / order.quantity,
                },
              },
            },
          },
        })
      } else {
        const supplier = await db.supplier.update({
          where: { id: order.supplierId },
          data: {
            stock: {
              create: {
                quantity: order.quantity,
                type: order.woodType,
                price: order.totalPrice / order.quantity,
              },
            },
          },
        })
      }
    }
    /**
     * If the order is a purchase, we need to update the user's stocks
     */
    // const wood = await db.wood.findFirst({
    //   where: { userId: order.userId, type: order.woodType },
    // })

    // if(wood) {
    //   const updateWood = await db.wood.update({
    //     where: { id: wood.id },
    //     data: {
    //         quantity: wood.quantity - order.quantity,
    //         price: wood.price - order.totalPrice,
    //       },
    //   })
    // }

    const woodU = await db.wood.findFirst({
      where: { type: order.woodType, userId: order.userId },
    })

    if (woodU) {
      const user = await db.user.update({
        where: { id: order.userId },
        data: {
          stocks: {
            upsert: {
              where: { id: woodU.id },
              update: {
                quantity: woodU.quantity - order.quantity,
                price: woodU.price - order.totalPrice,
              },
              create: {
                quantity: -order.quantity,
                type: order.woodType,
                price: -order.totalPrice,
              },
            },
          },
        },
      })
      // Need to include stocks and if quantity of wood is 0, delete it
    }
  }

  return result
}
