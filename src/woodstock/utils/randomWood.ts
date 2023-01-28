const woodTypes = [
  "Acacia",
  "Alder",
  "Ash",
  "Beech",
  "Birch",
  "Cedar",
  "Chestnut",
  "Cherry",
  "Cypress",
  "Elm",
  "Fir",
  "Hemlock",
  "Hickory",
  "Holly",
  "Hornbeam",
  "Juniper",
  "Larch",
  "Laurel",
  "Mahogany",
  "Maple",
  "Oak",
  "Pine",
  "Poplar",
  "Redwood",
  "Rosewood",
  "Spruce",
  "Teak",
  "Walnut",
  "Willow",
  "Yew",
]

export default function randomWood() {
  const woodType = woodTypes[Math.floor(Math.random() * woodTypes.length)]
  const wood = {
    type: woodType,
    unitPrice: Math.floor(Math.random() * (120 - 60) + 60),
    quantityPurchased: Math.floor(Math.random() * 1000),
  }
  return wood
}
