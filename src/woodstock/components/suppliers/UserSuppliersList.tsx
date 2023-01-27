import { useState } from "react"
import { Supplier, User, Wood } from "@prisma/client"
import DetailsSupplier from "./DetailsSupplier"
import stylesSupplier from "src/woodstock/styles/Supplier.module.css"
import ButtonRemove from "../common/ButtonRemove"

interface Props {
  suppliers: (Supplier & { stock: Wood[] })[]
  admin: User
}

export default function UserSuppliersList({ admin, suppliers }: Props) {
  const [userSuppliers, setUserSuppliers] = useState<(Supplier & { stock: Wood[] })[]>(suppliers)
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>()

  const displaySupplierDetails = (supplierId: string) => {
    if (selectedSupplierId === supplierId) {
      setSelectedSupplierId(undefined)
      return
    }
    setSelectedSupplierId(supplierId)
  }

  const displaySuppliers = userSuppliers.map((supplier) => {
    return (
      <li className={stylesSupplier.moreSuppliersItems} key={supplier.id}>
        <p className={stylesSupplier.moreSuppliersTitle}>
          <ButtonRemove onClick={() => displaySupplierDetails(supplier.id)} /> {supplier.name}
        </p>
        {selectedSupplierId === supplier.id && (
          <DetailsSupplier supplier={supplier} admin={admin} />
        )}
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
