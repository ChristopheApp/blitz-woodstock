import type ValidCommand from "../types/validCommand"
import type Stocks from "../types/stocks"
import transformArrayCommand from "./transformArrayCommand"

/**
 * Create stocks from commands
 */
export default function createStocks(
  purchaseCommands: ValidCommand[],
  saleCommands: ValidCommand[]
): Stocks[] {
  const woodsPurchased = transformArrayCommand(purchaseCommands)
  const woodsSold = transformArrayCommand(saleCommands)

  let stocks: Stocks[] = []

  for (const type in woodsPurchased) {
    let quantitySold = 0
    woodsSold[type] && (quantitySold = woodsSold[type].quantity)
    woodsPurchased[type].avgPrice = Math.floor(
      woodsPurchased[type].totalPrice / woodsPurchased[type].quantity
    )
    woodsPurchased[type].stock = woodsPurchased[type].quantity - quantitySold
    woodsPurchased[type].stock > 0 && stocks.push(woodsPurchased[type])
  }

  return stocks
}
