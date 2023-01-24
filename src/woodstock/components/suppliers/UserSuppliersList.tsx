import { useState } from "react"
import { Supplier, User } from "@prisma/client"
import removeSupplierFromAdmin from "src/woodstock/mutations/removeSupplierFromAdmin"

interface Props {
  suppliers: Supplier[]
  admin: User
}

export default function UserSuppliersList({ admin, suppliers }: Props) {
  const [userSuppliers, setUserSuppliers] = useState<Supplier[]>(suppliers)

  const removeSupplier = async (supplierId: string) => {
    const adminId = admin.id
    const result = await removeSupplierFromAdmin({ supplierId, adminId })
    console.log(result)
    setUserSuppliers(result.suppliers)
  }

  const displaySuppliers = userSuppliers.map((supplier) => {
    return (
      <li key={supplier.id} onClick={() => removeSupplier(supplier.id)}>
        {supplier.name}
      </li>
    )
  })

  return (
    <div>
      <h3>Mes fournisseurs</h3>
      <ul>{displaySuppliers}</ul>
    </div>
  )
}
