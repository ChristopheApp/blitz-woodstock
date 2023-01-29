import React from "react"
import { Supplier, User, Wood } from "@prisma/client"
import styles from "src/woodstock/styles/common.module.css"

interface Props {
  supplier: Supplier & { stock: Wood[] }
  admin: User
  stranger: boolean
  onClickProps: (supplierId: string) => void
}

export default function DetailsSupplier({ supplier, admin, stranger, onClickProps }: Props) {
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

  const handleClick = async () => {
    onClickProps(supplierId)
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
