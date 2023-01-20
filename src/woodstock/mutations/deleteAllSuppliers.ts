import db from "db"

export default async function deleteAllSuppliers() {
  const supplier = await db.supplier.deleteMany({})

  return supplier
}
