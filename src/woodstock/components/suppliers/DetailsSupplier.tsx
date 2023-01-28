import React, { useState } from "react"
import { Supplier, User, Wood } from "@prisma/client"
import addSupplierToAdmin from "src/woodstock/mutations/addSupplierToAdmin"
import removeSupplierFromAdmin from "src/woodstock/mutations/removeSupplierFromAdmin"
import styles from "src/woodstock/styles/common.module.css"

interface Props {
  supplier: Supplier & { stock: Wood[] }
  admin: User
  stranger: boolean
  onClickProps: (supplierId: string) => void
}

export default function DetailsSupplier({ supplier, admin, stranger, onClickProps }: Props) {
  const adminId = admin.id
  const supplierId = supplier.id

  const stocks = supplier.stock.map((stock) => {
    return (
      <div key={stock.id}>
        <p>
          {stock.quantityPurchased} m³ de <strong>{stock.type}</strong> {stock.unitPrice}€/m³
        </p>
      </div>
    )
  })

  const addSupplier = async () => {
    const result = await addSupplierToAdmin({ supplierId, adminId })
    // setUserSuppliers(result.suppliers)
  }

  const removeSupplier = async () => {
    const result = await removeSupplierFromAdmin({ supplierId, adminId })
    // console.log(result)
  }

  const handleClick = async () => {
    onClickProps(supplierId)
    // if (!stranger) {
    //   await removeSupplierFromAdmin({ supplierId, adminId })
    // } else {
    //   await addSupplierToAdmin({ supplierId, adminId })
    // }
  }
  return (
    <>
      <p className={styles.description}>les stocks actuel du fournisseur : </p>
      {stocks}
      <button onClick={handleClick}>
        {!stranger ? "Retirer ce fournisseur" : "Ajouter ce fournisseur"}
      </button>
    </>
  )
}
