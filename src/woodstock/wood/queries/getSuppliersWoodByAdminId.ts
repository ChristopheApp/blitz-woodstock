import db from "db"

export default async function getSuppliersWoodByAdminId(adminId: string) {
  const woods = await db.wood.findMany({
    where: {
      supplier: {
        userId: {
          has: adminId,
        },
      },
    },
    include: {
      supplier: true,
    },
  })
  return woods
}
