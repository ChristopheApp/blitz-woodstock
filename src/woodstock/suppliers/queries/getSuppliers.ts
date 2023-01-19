import db from "db"

const fetchSuppliers = async (_ = null) => {
  const suppliers = await db.supplier.findMany({
    select: { id: true, name: true, email: true, stock: true },
  })
  console.log(suppliers)
  return suppliers
}

export default fetchSuppliers
