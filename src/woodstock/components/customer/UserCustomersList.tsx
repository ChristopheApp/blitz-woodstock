import { useState } from "react"

import { User, Customer } from "@prisma/client"
import stylesBuyer from "src/woodstock/styles/Customer.module.css"
import removeBuyerFromAdmin from "src/woodstock/mutations/removeCustomerFromAdmin"
import ButtonRemove from "../common/ButtonRemove"

interface Props {
  customers: Customer[]
  admin: User
}

export default function UserBuyerList({ customers, admin }: Props) {
  const [userBuyers, setUserBuyers] = useState<Customer[]>(customers)

  const handleremoveBuyer = async (buyerId: string) => {
    const adminId = admin.id
    const result = await removeBuyerFromAdmin({ buyerId, adminId })
    console.log(result)
  }

  const displayBuyers = userBuyers.map((customer) => {
    return (
      <li className={stylesBuyer.moreSuppliersItems} key={customer.id}>
        <p className={stylesBuyer.moreSuppliersTitle}>
          <ButtonRemove onClick={() => handleremoveBuyer(customer.id)} /> {customer.firstname}{" "}
          {customer.lastname} {customer.company && `- ${customer.company}`}
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
