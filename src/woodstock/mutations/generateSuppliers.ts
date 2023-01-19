import db from "db"

export default async function generateSuppliers() {
  let i = 2
  const supplier = await db.supplier.create({
    data: {
      name: `Supplier ${i}`,
      email: `supplier${i}@supplier.com`,
      phone: "0123456789",
      stock: {
        create: [
          {
            type: `Stock ${i}`,
            quantity: 100,
            price: 100,
          },
          {
            type: `Stock ${i}`,
            quantity: 100,
            price: 100,
          },
        ],
      },
    },
    select: { id: true, name: true, email: true, phone: true, stock: true },
  })
  console.log(supplier)
  return supplier
}
