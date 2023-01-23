import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db, { Supplier } from "db"
import { Role } from "types"
import { AddCommercial } from "../validations"

// export default resolver.pipe(
//   resolver.zod(AddCommercial),
//   async ({ email, password, adminId }, ctx) => {
//     const hashedPassword = await SecurePassword.hash(password.trim())
//     const user = await db.user.create({
//       data: {
//         email: email.toLowerCase().trim(),
//         hashedPassword,
//         role: "COMMERCIAL",
//         adminId: adminId,
//       },
//       select: { id: true, name: true, email: true, role: true },
//     })

//     await db.user.update({
//       where: { id: adminId },
//       data: {
//         commercialsId: {
//           push: user.id,
//         },
//       },
//     })
//     return user
//   }
// )

export default async function addSupplierToAdmin({ supplier, adminId }) {
  console.log("addSupplierToAdmin")
  console.log(adminId)
  console.log("supplierId")
  console.log(supplier)
  let user: any
  user = await db.user.update({
    where: { id: adminId },
    data: {
      suppliersId: {
        push: supplier.id,
      },
      suppliers: {
        connect: {
          id: supplier.id,
        },
      },
    },
  })

  console.log(user)
  return user
}
