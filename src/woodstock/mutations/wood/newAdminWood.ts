import db from "db"

export default async function newAdminWood(data: any) {
  const { quantity, unitPrice, adminId, woodType } = data

  const user = await db.user.update({
    where: { id: adminId },
    data: {
      stock: {
        create: {
          type: woodType,
          quantityPurchased: quantity,
          totalPurchasedPrice: quantity * unitPrice,
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
