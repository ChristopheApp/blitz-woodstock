// Randomly generate a supplier object
// List of names
const supplierNames = [`John`, `Paul`, `George`, `Ringo`, `Pete`, `John`, `Paul`]

export default function randomSupplier() {
  const supplierName = supplierNames[Math.floor(Math.random() * supplierNames.length)]
  const supplier = {
    name: supplierName,
    email: `${supplierName}@supplier.com`,
    phone: `0123456789`,
    stock: [],
  }
  return supplier
}
