import { useState } from "react"
import { Supplier, User, Wood, Buyer } from "@prisma/client"
import removeSupplierFromAdmin from "src/woodstock/mutations/removeSupplierFromAdmin"
import addSupplierToAdmin from "src/woodstock/mutations/addSupplierToAdmin"
// import DetailsSupplier from "./DetailsSupplier"
import stylesBuyer from "./Buyer.module.css"
import addBuyerToAdmin from "src/woodstock/mutations/addBuyerToAdmin"

interface Props {
  admin: User
  moreBuyers: Buyer[]
}

export default function MoreBuyersList({ admin, moreBuyers }: Props) {
  const handleAddBuyer = async (buyerId: string) => {
    const adminId = admin.id
    const result = await addBuyerToAdmin({ buyerId, adminId })
    console.log(result)
  }

  const displaySuppliers = moreBuyers.map((buyer) => (
    <li className={stylesBuyer.moreSuppliersItems} key={buyer.id}>
      <p onClick={() => handleAddBuyer(buyer.id)} className={stylesBuyer.moreSuppliersTitle}>
        + {buyer.firstname} {buyer.lastname} {buyer.company && `- ${buyer.company}`}
      </p>
    </li>
  ))

  return <ul>{displaySuppliers}</ul>
}
