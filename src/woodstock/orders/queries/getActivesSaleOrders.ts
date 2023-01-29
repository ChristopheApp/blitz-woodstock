import db from "db"

export default async function getActivesSaleOrders(userId: string) {
  const sale = await db.order.findMany({
    where: {
      orderType: "SALE",
      userId: userId,
      NOT: {
        OR: [{ status: "REFUSED" }, { status: "CANCELED" }, { status: "PAID" }],
      },
    },
  })
  return sale
}
