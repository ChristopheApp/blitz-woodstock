import db from "db"

export default async function acceptOrder(id: string) {
  const order = await db.order.update({
    where: { id },
    data: { status: "ACCEPTED" },
  })
  return order
}
