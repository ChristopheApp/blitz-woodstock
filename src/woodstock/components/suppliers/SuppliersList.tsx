import { useState } from "react"
import { Supplier, User } from "@prisma/client"
import removeSupplierFromAdmin from "src/woodstock/mutations/removeSupplierFromAdmin"
import addSupplierToAdmin from "src/woodstock/mutations/addSupplierToAdmin"

interface Props {
  suppliers: Supplier[]
  admin: User
  allSuppliers: Supplier[]
}

export default function SuppliersList({ admin, suppliers, allSuppliers }: Props) {
  const [userSuppliers, setUserSuppliers] = useState<Supplier[]>(suppliers)
  // const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([])

  const addSupplier = async (supplier: Supplier) => {
    const adminId = admin.id
    const result = await addSupplierToAdmin({ supplier, adminId })
    setUserSuppliers(result.suppliers)
  }

  const displaySuppliers = allSuppliers.map((supplier) => (
    <div onClick={() => addSupplier(supplier)} key={supplier.id}>
      <p>{supplier.name}</p>
      <p>{supplier.email}</p>
    </div>
  ))

  return <>{displaySuppliers}</>
}
