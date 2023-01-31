import db from "db"

export default async function getAdminSalesreps(adminId: string) {
  const salesreps = await db.user.findMany({
    where: { adminId: adminId, role: "SALESREP" },
  })
  return salesreps
}
