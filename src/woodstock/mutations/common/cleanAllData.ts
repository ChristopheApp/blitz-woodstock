import db, { prisma } from "db"

export default async function cleanAllData() {
  await db.user.deleteMany({
    where: { role: "COMMERCIAL" },
  })
  await db.user.deleteMany({})
  await db.buyer.deleteMany({})
  await db.supplier.deleteMany({})
  await db.command.deleteMany({})
  await db.wood.deleteMany({})
  await db.session.deleteMany({})
  await db.token.deleteMany({})
  console.log("cleanAllData")
}
