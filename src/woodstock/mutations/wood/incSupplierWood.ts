import db from "db"
import { Order } from "@prisma/client"

export default async function incSupplierWood(order: Order) {
  if (order.supplierId) {
    const wood = await db.wood.findFirst({
      where: { supplierId: order.supplierId, type: order.woodType },
    })

    if (wood) {
      const supplier = await db.supplier.update({
        where: { id: order.supplierId },
        data: {
          stock: {
            update: {
              where: { id: wood.id },
              data: {
                quantityPurchased: { increment: order.quantity },
              },
            },
          },
        },
      })
    }
  }

  return order
}
