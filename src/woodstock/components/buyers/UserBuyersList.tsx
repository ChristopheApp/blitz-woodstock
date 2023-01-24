import { useState } from "react"

import styles from "src/styles/Home.module.css"
import { User, Buyer } from "@prisma/client"
import stylesBuyer from "./Buyer.module.css"
import removeBuyerFromAdmin from "src/woodstock/mutations/removeBuyerFromAdmin"

interface Props {
  buyers: Buyer[]
  admin: User
}

export default function UserBuyerList({ buyers, admin }: Props) {
  const [userBuyers, setUserBuyers] = useState<Buyer[]>(buyers)

  const handleremoveBuyer = async (buyerId: string) => {
    const adminId = admin.id
    const result = await removeBuyerFromAdmin({ buyerId, adminId })
    console.log(result)
  }

  const displayBuyers = userBuyers.map((buyer) => {
    return (
      <li className={stylesBuyer.moreSuppliersItems} key={buyer.id}>
        <p onClick={() => handleremoveBuyer(buyer.id)} className={stylesBuyer.moreSuppliersTitle}>
          - {buyer.firstname} {buyer.lastname} {buyer.company && `- ${buyer.company}`}
        </p>
      </li>
    )
  })

  return (
    <div>
      <h3>Mes fournisseurs</h3>
      <ul>{displayBuyers}</ul>
    </div>
  )
}
