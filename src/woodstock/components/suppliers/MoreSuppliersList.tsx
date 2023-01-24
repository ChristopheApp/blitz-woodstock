import { useState } from "react"
import { Supplier, User, Wood } from "@prisma/client"
import DetailsSupplier from "./DetailsSupplier"
import stylesSupplier from "src/woodstock/styles/Supplier.module.css"

interface Props {
  admin: User
  moreSuppliers: (Supplier & { stock: Wood[] })[]
}

export default function MoreSuppliersList({ admin, moreSuppliers }: Props) {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>()

  const displaySupplierDetails = (supplierId: string) => {
    if (selectedSupplierId === supplierId) {
      setSelectedSupplierId(undefined)
      return
    }
    setSelectedSupplierId(supplierId)
  }

  const displaySuppliers = moreSuppliers.map((supplier) => (
    <li className={stylesSupplier.moreSuppliersItems} key={supplier.id}>
      <p
        onClick={() => displaySupplierDetails(supplier.id)}
        className={stylesSupplier.moreSuppliersTitle}
      >
        {supplier.name}
      </p>
      {selectedSupplierId === supplier.id && <DetailsSupplier supplier={supplier} admin={admin} />}
    </li>
  ))

  return <ul>{displaySuppliers}</ul>
}
