// Randomly generate a supplier object
// List of names
const supplierNames = [
  "Bois Durables Inc.",
  "Bois de Luxe SARL",
  "Forêts du Nord Inc.",
  "Bois de qualité supérieure Inc.",
  "Bois Naturels Inc.",
  "Bois de construction Durable Inc.",
  "Bois d'œuvre Premium Inc.",
  "Bois de charpente Inc.",
  "Bois de menuiserie Inc.",
  "Bois de décoration Inc.",
  "Bois de jardin Inc.",
  "Bois de terrasse Inc.",
  "Bois de meubles Inc.",
  "Bois de construction Inc.",
  "Bois d'œuvre Inc.",
  "Bois de charpente et construction Inc.",
  "Bois de terrasse en teck Inc.",
  "Bois de revêtement Inc.",
  "Bois de construction durable Inc.",
  "Bois de menuiserie de qualité Inc.",
  "Bois de spécialité Inc.",
  "Bois de construction de qualité Inc.",
  "Bois de charpente de qualité Inc.",
  "Bois de terrasse de qualité Inc.",
  "Bois de meubles de qualité Inc.",
  "Bois de construction écologique Inc.",
  "Bois d'œuvre écologique Inc.",
  "Bois de charpente écologique Inc.",
  "Bois de terrasse écologique Inc.",
  "Bois de meubles écologique Inc.",
  "Bois de construction durable écologique Inc.",
  "Bois d'œuvre durable écologique Inc.",
  "Bois de charpente durable écologique Inc.",
  "Bois de terrasse durable écologique Inc.",
  "Bois de meubles durable écologique Inc.",
]

export default function randomSupplier() {
  let supplierName: string
  do {
    const index = Math.floor(Math.random() * supplierNames.length)
    supplierName = supplierNames[index] || ""
  } while (!supplierName && supplierName !== "")

  const supplier = {
    name: supplierName,
    email: `randomemail@supplier.com`,
    phone: `0123456789`,
  }
  return supplier
}
