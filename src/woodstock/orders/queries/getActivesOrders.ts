import db from "db"

export default async function getActivesOrders(id: string) {
  const sale = await db.order.findMany({
    where: {
      orderType: "SALE",
      userId: id,
      NOT: {
        OR: [{ status: "REFUSED" }, { status: "CANCELED" }, { status: "PAID" }],
      },
    },
  })

  const purchase = await db.order.findMany({
    where: {
      orderType: "PURCHASE",
      userId: id,
      NOT: {
        OR: [{ status: "REFUSED" }, { status: "CANCELED" }, { status: "PAID" }],
      },
    },
  })
  return { sale, purchase }
}
