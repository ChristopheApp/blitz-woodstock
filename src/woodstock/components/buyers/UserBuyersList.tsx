import { useState } from "react"

import { User, Buyer } from "@prisma/client"
import stylesBuyer from "src/woodstock/styles/Buyer.module.css"
import removeBuyerFromAdmin from "src/woodstock/mutations/removeBuyerFromAdmin"
import ButtonRemove from "../common/ButtonRemove"

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
        <p className={stylesBuyer.moreSuppliersTitle}>
          <ButtonRemove onClick={() => handleremoveBuyer(buyer.id)} /> {buyer.firstname}{" "}
          {buyer.lastname} {buyer.company && `- ${buyer.company}`}
        </p>
      </li>
    )
  })

  return (
    <div>
      <h3>Mes clients</h3>
      <ul>{displayBuyers}</ul>
    </div>
  )
}
