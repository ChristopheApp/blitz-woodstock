import db, { prisma } from "db"

export default async function cleanAllData() {
  await db.user.deleteMany({
    where: { role: "SALESREP" },
  })
  await db.user.deleteMany({})
  await db.customer.deleteMany({})
  await db.supplier.deleteMany({})
  await db.order.deleteMany({})
  await db.wood.deleteMany({})
  await db.session.deleteMany({})
  await db.token.deleteMany({})
  console.log("cleanAllData")
}
