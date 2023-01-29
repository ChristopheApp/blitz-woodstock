import db from "db"
import randomSupplier from "../../utils/randomSupplier"
import randomWoodStock from "../../utils/randomWoodStock"

export default async function generateSuppliers() {
  const maxSuppliers = Math.floor(Math.random() * (9 - 3) + 3)
  let suppliers: any = []

  for (let i = 0; i < maxSuppliers; i++) {
    const data = randomSupplier()
    const stock = randomWoodStock()
    const supplier = await db.supplier.upsert({
      where: { name: data.name },
      update: {},
      create: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        stock: {
          create: stock,
        },
      },
      select: { id: true, name: true, email: true, phone: true, stock: true },
    })
    suppliers.push(supplier)
  }
  return suppliers
}
