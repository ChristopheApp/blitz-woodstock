import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { AddSalesrep } from "../validations"

export default resolver.pipe(
  resolver.zod(AddSalesrep),
  async ({ email, password, adminId }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const salesrep = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        role: "SALESREP",
        adminId: adminId,
      },
      select: { id: true, name: true, email: true, role: true },
    })

    const user = await db.user.update({
      where: { id: adminId },
      data: {
        salesrepsId: {
          push: salesrep.id,
        },
      },
      include: { salesreps: true },
    })
    return user
  }
)
