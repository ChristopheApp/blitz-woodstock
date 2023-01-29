import db from "db"

export default async function getActivesPurchaseOrders(userId: string) {
  const purchase = await db.order.findMany({
    where: {
      orderType: "PURCHASE",
      userId: userId,
      NOT: {
        OR: [{ status: "REFUSED" }, { status: "CANCELED" }, { status: "PAID" }],
      },
    },
  })
  return purchase
}
