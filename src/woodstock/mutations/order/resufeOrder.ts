import db from "db"

export default async function refuseOrder(id: string) {
  const order = await db.order.update({
    where: { id },
    data: { status: "REFUSED" },
  })

  return order
}
