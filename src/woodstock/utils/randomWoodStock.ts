import randomWood from "./randomWood"

export default function randomWoodStock() {
  let woodStock: any = []
  const maxStock = Math.floor(Math.random() * (7 - 2) + 2)
  for (let i = 0; i < maxStock; i++) {
    woodStock.push(randomWood())
  }
  return woodStock
}
