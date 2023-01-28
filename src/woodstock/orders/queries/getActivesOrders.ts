import db from "db"

export default async function getActivesCommands(id: string) {
  const sale = await db.command.findMany({
    where: {
      type: "SALE",
      userId: id,
      NOT: {
        OR: [{ status: "REFUSED" }, { status: "CANCELED" }, { status: "PAID" }],
      },
    },
  })

  const purchase = await db.command.findMany({
    where: {
      type: "PURCHASE",
      userId: id,
      NOT: {
        OR: [{ status: "REFUSED" }, { status: "CANCELED" }, { status: "PAID" }],
      },
    },
  })
  return { sale, purchase }
}
