import db from "db"

const fetchAllSuppliers = async (_ = null) => {
  const suppliers = await db.supplier.findMany({
    include: { stock: true },
  })
  return suppliers
}

export default fetchAllSuppliers
