import db from "db"

export default async function getUserStock(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      stock: {
        where: {
          quantityPurchased: { gt: 0 },
        },
      },
    },
  })

  const stock = user?.stock.filter((wood) => wood.quantityPurchased > wood.quantitySold)

  const woodSold = await db.user.findUnique({
    where: { id: userId },
    select: {
      stock: {
        where: {
          quantitySold: { gt: 0 },
        },
      },
    },
  })

  const woodSoldSorted = woodSold?.stock.sort(
    (a, b) => b.totalSoldPrice - b.totalPurchasedPrice - (a.totalSoldPrice - a.totalPurchasedPrice)
  )

  return { stock, user, woodSoldSorted }
}
