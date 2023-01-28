import db from "db"

export default async function getAllValidCommands(adminId: string) {
  const purchaseCommands = await db.command.findMany({
    where: {
      userId: adminId,
      type: "PURCHASE",
      OR: [{ status: "DELIVERED" }, { status: "PAID" }],
    },
    select: {
      totalPrice: true,
      quantity: true,
      woodType: true,
    },
  })

  const saleCommands = await db.command.findMany({
    where: {
      userId: adminId,
      type: "SALE",
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
