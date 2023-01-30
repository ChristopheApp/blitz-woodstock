import { useState } from "react"
import { Supplier, User, Wood } from "@prisma/client"
import DetailsSupplier from "./DetailsSupplier"
import stylesSupplier from "src/woodstock/styles/Supplier.module.css"
import ButtonRemove from "../common/ButtonRemove"
import removeSupplierFromAdmin from "src/woodstock/mutations/removeSupplierFromAdmin"

interface Props {
  suppliers: (Supplier & { stock: Wood[] })[]
  admin: User
  handleRemoveSupplier: (supplierId: string) => void
}

export default function UserSuppliersList({ admin, suppliers, handleRemoveSupplier }: Props) {
  const [userSuppliers, setUserSuppliers] = useState<(Supplier & { stock: Wood[] })[]>(suppliers)
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>()

  const displaySupplierDetails = (supplierId: string) => {
    if (selectedSupplierId === supplierId) {
      setSelectedSupplierId(undefined)
      return
    }
    setSelectedSupplierId(supplierId)
  }

  const removeSupplier = async (supplierId: string) => {
    const adminId = admin.id
    const result = await removeSupplierFromAdmin({ supplierId, adminId })
  }

  const displaySuppliers = userSuppliers.map((supplier) => {
    return (
      <li className={stylesSupplier.moreSuppliersItems} key={supplier.id}>
        <div style={{ display: "flex" }}>
          <ButtonRemove onClick={() => removeSupplier(supplier.id)} />
          <p
            className={stylesSupplier.moreSuppliersTitle}
            onClick={() => displaySupplierDetails(supplier.id)}
          >
            {supplier.name}
          </p>
        </div>
        {selectedSupplierId === supplier.id && (
          <DetailsSupplier
            onClickProps={handleRemoveSupplier}
            stranger={false}
            supplier={supplier}
            admin={admin}
          />
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
