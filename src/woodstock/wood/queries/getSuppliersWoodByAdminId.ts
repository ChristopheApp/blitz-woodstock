import db from "db"

export default async function getSuppliersWoodByAdminId(adminId: string) {
  const woods = await db.wood.findMany({
    where: {
      supplier: {
        user: {
          id: adminId,
        },
      },
    },
    include: {
      supplier: true,
    },
  })
  return woods
}
