import db from "db"
import { Order } from "@prisma/client"
import incSupplierWood from "../wood/incSupplierWood"
import decAdminWoodSold from "../wood/decAdminWoodSold"
import decAdminWoodPurchased from "../wood/decAdminWoodPurchased"

export default async function cancelOrder(order: Order) {
  const result = await db.order.update({
    where: { id: order.id },
    data: { status: "CANCELED" },
  })

  /**
   * if order was delivered we need to update stocks
   */
  if (order.status === "DELIVERED") {
    const quantity = order.quantity
    const supplierId = order.supplierId
    const unitPrice = order.avgPrice
    const woodType = order.woodType
    const adminId = order.userId

    /**
     * If the order is a purchase, we need to update the supplier's and User's stocks
     */
    if (order.orderType === "PURCHASE" && order.supplierId) {
      // Change supplier stocks
      await incSupplierWood(result)

      // Change the user's stocks
      const adminWood = await db.wood.findFirst({
        where: { type: order.woodType, userId: order.userId },
      })
      if (adminWood) {
        const woodId = adminWood.id
        const user = await decAdminWoodPurchased({ quantity, unitPrice, adminId, woodId })
      }
    }

    /**
     * If the order is a sale, we need to update the user's stocks
     */
    if (order.orderType === "SALE") {
      const adminWood = await db.wood.findFirst({
        where: { type: order.woodType, userId: order.userId },
      })
      if (adminWood) {
        const woodId = adminWood.id
        const user = await decAdminWoodSold({ quantity, unitPrice, adminId, woodId })
      }
    }
  }

  return result
}
