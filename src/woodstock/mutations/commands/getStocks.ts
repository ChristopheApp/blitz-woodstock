import db from "db"

export default async function getStocks(adminId: string) {
  console.log("getStocks")
  const purchaseCommands = await db.command.findMany({
    where: {
      userId: adminId,
      type: "PURCHASE",
      OR: [{ status: "DELIVERED" }, { status: "PAID" }],
    },
    select: {
      totalPrice: true,
      quantity: true,
      woodType: true,
    },
  })

  const saleCommands = await db.command.findMany({
    where: {
      userId: adminId,
      type: "SALE",
      OR: [{ status: "DELIVERED" }, { status: "PAID" }],
    },
    select: {
      totalPrice: true,
      quantity: true,
      woodType: true,
    },
  })

  const woodsPurchased = purchaseCommands.reduce((acc: any, wood: any) => {
    if (acc[wood.woodType]) {
      acc[wood.woodType].quantity += wood.quantity
      acc[wood.woodType].totalPrice += wood.totalPrice
    } else {
      acc[wood.woodType] = wood
    }
    return acc
  }, {})

  const woodsSold = saleCommands.reduce((acc: any, wood: any) => {
    if (acc[wood.woodType]) {
      acc[wood.woodType].quantity += wood.quantity
      acc[wood.woodType].totalPrice += wood.totalPrice
    } else {
      acc[wood.woodType] = wood
    }
    return acc
  }, {})

  // console.log(commands)
  return { woodsPurchased, woodsSold }
}
