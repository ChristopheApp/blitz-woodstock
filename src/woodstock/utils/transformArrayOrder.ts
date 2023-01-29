/**
 * Transform an array of order into an object wich each key is a wood type
 */
import type ValidOrder from "../types/validOrder"

export default function transformArrayOrder(orders: ValidOrder[]) {
  const test = orders.reduce((acc: any, wood: any) => {
    if (acc[wood.woodType]) {
      acc[wood.woodType].quantity += wood.quantity
      acc[wood.woodType].totalPrice += wood.totalPrice
    } else {
      acc[wood.woodType] = wood
    }
    return acc
  }, {})
  return test
}
