import { Ctx } from "blitz"
import db, { User } from "db"
// import type UserInfos from "src/woodstock/types/UserInfos"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    include: { salesreps: true, orders: true, stock: true, suppliers: true, customers: true },
  })

  let isAdmin = true
  let admin = user

  if (user?.role === "SALESREP") {
    admin = await db.user.findFirst({
      where: { id: user.adminId as string },
      include: { salesreps: true, orders: true, stock: true, suppliers: true, customers: true },
    })
    isAdmin = false
  }

  const salesreps = admin?.salesreps
  const orders = admin?.orders
  const stock = admin?.stock
  const suppliers = admin?.suppliers
  const customers = admin?.customers

  return { user, admin, salesreps, orders, stock, suppliers, customers, isAdmin }
}
