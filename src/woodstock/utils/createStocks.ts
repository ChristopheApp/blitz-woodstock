import type ValidOrder from "../types/validOrder"
import type Stocks from "../types/stocks"
import transformArrayOrder from "./transformArrayOrder"

/**
 * Create stocks from orders
 */
export default function createStocks(
  purchaseOrders: ValidOrder[],
  saleOrders: ValidOrder[]
): Stocks[] {
  const woodsPurchased = transformArrayOrder(purchaseOrders)
  const woodsSold = transformArrayOrder(saleOrders)

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
