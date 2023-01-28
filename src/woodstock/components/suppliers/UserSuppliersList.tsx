import { useState } from "react"
import { Supplier, User, Wood } from "@prisma/client"
import DetailsSupplier from "./DetailsSupplier"
import stylesSupplier from "src/woodstock/styles/Supplier.module.css"
import ButtonRemove from "../common/ButtonRemove"
import removeSupplierFromAdmin from "src/woodstock/mutations/removeSupplierFromAdmin"

interface Props {
  suppliers: (Supplier & { stock: Wood[] })[]
  admin: User
}

export default function UserSuppliersList({ admin, suppliers }: Props) {
  const [userSuppliers, setUserSuppliers] = useState<(Supplier & { stock: Wood[] })[]>(suppliers)
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>()

  const displaySupplierDetails = (supplierId: string) => {
    console.log("click  ")
    if (selectedSupplierId === supplierId) {
      setSelectedSupplierId(undefined)
      return
    }
    setSelectedSupplierId(supplierId)
  }

  const removeSupplier = async (supplierId: string) => {
    const adminId = admin.id
    const result = await removeSupplierFromAdmin({ supplierId, adminId })
    // console.log(result)
  }

  const displaySuppliers = userSuppliers.map((supplier) => {
    return (
      <li className={stylesSupplier.moreSuppliersItems} key={supplier.id}>
        <p
          className={stylesSupplier.moreSuppliersTitle}
          onClick={() => displaySupplierDetails(supplier.id)}
        >
          <ButtonRemove onClick={() => removeSupplier(supplier.id)} /> {supplier.name}
        </p>
        {selectedSupplierId === supplier.id && (
          <DetailsSupplier stranger={false} supplier={supplier} admin={admin} />
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
