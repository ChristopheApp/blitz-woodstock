import db from "db"
import randomWoodStock from "../utils/randomWoodStock"

export default async function createUserStocks(adminId: string) {
  const stock = randomWoodStock()
  const user = await db.user.update({
    where: { id: adminId },
    data: {
      stocks: {
        create: stock,
      },
    },

    include: { stocks: true },
  })

  console.log(user)
  return user
}
