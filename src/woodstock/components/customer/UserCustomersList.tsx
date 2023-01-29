import { useEffect, useState } from "react"

import { User, Customer } from "@prisma/client"
import stylesCustomer from "src/woodstock/styles/Customer.module.css"
import removeCustomerFromAdmin from "src/woodstock/mutations/removeCustomerFromAdmin"
import ButtonRemove from "../common/ButtonRemove"
import getAdminCustomers from "src/woodstock/customers/queries/getAdminCustomers"

interface Props {
  customers: Customer[]
  admin: User
}

export default function UserCustomerList({ customers, admin }: Props) {
  const [userCustomers, setUserCustomers] = useState<Customer[]>([])

  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await getAdminCustomers(admin.id)
      setUserCustomers(result)
    }
    fetchCustomers()
  }, [])

  const handleremoveCustomer = async (customerId: string) => {
    const adminId = admin.id
    const result = await removeCustomerFromAdmin({ customerId, adminId })
    console.log(result)
    setUserCustomers(result.customers)
  }

  const displayCustomers = userCustomers.map((customer) => {
    return (
      <li className={stylesCustomer.moreSuppliersItems} key={customer.id}>
        <p className={stylesCustomer.moreSuppliersTitle}>
          <ButtonRemove onClick={() => handleremoveCustomer(customer.id)} /> {customer.firstname}{" "}
          {customer.lastname} {customer.company && `- ${customer.company}`}
        </p>
      </li>
    )
  })

  return (
    <div>
      <h3>Mes clients</h3>
      <ul>{displayCustomers}</ul>
    </div>
  )
}
