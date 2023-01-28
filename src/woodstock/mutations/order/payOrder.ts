import db from "db"

export default async function payOrder(id: string) {
  const order = await db.order.update({
    where: { id },
    data: { status: "PAID" },
  })
  return order
}
