import db from "db"
import { Order } from "@prisma/client"
import newAdminWood from "../wood/newAdminWood"
import incAdminWoodPurchased from "../wood/incAdminWoodPurchased"
import incAdminWoodSold from "../wood/incAdminWoodSold"
import decSupplierWood from "../wood/decSupplierWood"

export default async function deliverOrder(order: Order) {
  const result = await db.order.update({
    where: { id: order.id },
    data: { status: "DELIVERED" },
  })

  /**
   * If the order is a purchase, we need to update the supplier's and user's stocks
   */
  const quantity = order.quantity
  const supplierId = order.supplierId
  const unitPrice = order.avgPrice
  const woodType = order.woodType
  const adminId = order.userId

  if (order.orderType === "PURCHASE" && order.supplierId) {
    // Change supplier stocks
    const supplierWood = await db.wood.findFirst({
      where: { type: order.woodType, supplierId: order.supplierId },
    })

    if (supplierWood) {
      const woodId = supplierWood.id
      await decSupplierWood({ quantity, supplierId, woodId })
    }

    // Change the user's stocks

    const adminWood = await db.wood.findFirst({
      where: { type: order.woodType, userId: order.userId },
    })
    if (adminWood) {
      const woodId = adminWood.id
      const user = await incAdminWoodPurchased({ quantity, unitPrice, adminId, woodId })
    } else {
      const user = await newAdminWood({ quantity, unitPrice, adminId, woodType })
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
      const user = await incAdminWoodSold({ quantity, unitPrice, adminId, woodId })
    }
    /**
     * TODO
     *
     */
  }
  return result
}
