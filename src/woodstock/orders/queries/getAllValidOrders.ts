import db from "db"

export default async function getAllValidCommands(adminId: string) {
  const purchaseCommands = await db.order.findMany({
    where: {
      userId: adminId,
      orderType: "PURCHASE",
      OR: [{ status: "DELIVERED" }, { status: "PAID" }],
    },
    select: {
      totalPrice: true,
      quantity: true,
      woodType: true,
    },
  })

  const saleCommands = await db.order.findMany({
    where: {
      userId: adminId,
      orderType: "SALE",
      OR: [{ status: "DELIVERED" }, { status: "PAID" }],
    },
    select: {
      totalPrice: true,
      quantity: true,
      woodType: true,
    },
  })

  return { purchaseCommands, saleCommands }
}
