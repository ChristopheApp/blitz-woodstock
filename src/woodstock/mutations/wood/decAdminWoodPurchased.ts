import db from "db"

export default async function decAdminWoodPurchased(data: any) {
  const { quantity, unitPrice, adminId, woodId } = data

  const user = await db.user.update({
    where: { id: adminId },
    data: {
      stock: {
        update: {
          where: { id: woodId },
          data: {
            quantityPurchased: { decrement: quantity },
            totalPurchasedPrice: { decrement: quantity * unitPrice },
          },
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