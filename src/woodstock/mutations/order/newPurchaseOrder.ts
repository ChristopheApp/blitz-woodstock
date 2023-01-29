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

  // // Change supplier stocks
  // const supplier = await decSupplierWood({ quantity, supplierId, woodId })

  // Change admin stocks
  // if (wood) {
  //   const user = await updateAdminWood({ quantity, unitPrice, adminId, woodId: wood.id })
  //   console.log("update wood")
  //   return user
  // } else {
  //   const user = await newAdminWood({ quantity, unitPrice, adminId, woodType: woodType })
  //   console.log("new wood")
  //   return user
  // }
  return user
}
