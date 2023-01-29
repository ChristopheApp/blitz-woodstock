import db from "db"
import newAdminWood from "../wood/newAdminWood"
import updateAdminWood from "../wood/incAdminWoodPurchased"
import decSupplierWood from "../wood/decSupplierWood"

export default async function newOrder(data: any) {
  const { quantity, unitPrice, supplierId, woodType, adminId, orderType, woodId } = data

  // Create new order
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
          supplierId: supplierId,
          avgPrice: unitPrice,
        },
      },
    },
    include: {
      orders: true,
      stock: true,
    },
  })

  return user
}
