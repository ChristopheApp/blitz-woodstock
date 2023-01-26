/**
 * Transform an array of command into an object wich each key is a wood type
 */
import type ValidCommand from "../types/validCommand"

export default function transformArrayCommand(commands: ValidCommand[]) {
  const test = commands.reduce((acc: any, wood: any) => {
    if (acc[wood.woodType]) {
      acc[wood.woodType].quantity += wood.quantity
      acc[wood.woodType].totalPrice += wood.totalPrice
    } else {
      acc[wood.woodType] = wood
    }
    return acc
  }, {})
  console.log("test : ", test)
  return test
}
