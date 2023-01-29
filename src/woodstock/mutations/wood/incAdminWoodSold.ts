import db from "db"

export default async function incAdminWoodSold(data: any) {
  const { quantity, unitPrice, adminId, woodId } = data

  const user = await db.user.update({
    where: { id: adminId },
    data: {
      stock: {
        update: {
          where: { id: woodId },
          data: {
            quantitySold: { increment: quantity },
            totalSoldPrice: { increment: quantity * unitPrice },
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
