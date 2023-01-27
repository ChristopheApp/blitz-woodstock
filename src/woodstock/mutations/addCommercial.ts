import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { AddCommercial } from "../validations"

export default resolver.pipe(
  resolver.zod(AddCommercial),
  async ({ email, password, adminId }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const commercial = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        role: "COMMERCIAL",
        adminId: adminId,
      },
      select: { id: true, name: true, email: true, role: true },
    })

    const user = await db.user.update({
      where: { id: adminId },
      data: {
        commercialsId: {
          push: commercial.id,
        },
      },
      include: { commercials: true },
    })
    return user
  }
)
