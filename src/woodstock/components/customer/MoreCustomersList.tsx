import { useState } from "react"
import { User, Customer } from "@prisma/client"
import ButtonAdd from "../common/ButtonAdd"
import stylesCustomer from "src/woodstock/styles/Customer.module.css"
import addCustomerToAdmin from "src/woodstock/mutations/addCustomerToAdmin"

interface Props {
  admin: User
  moreCustomers: Customer[]
}

export default function MoreCustomersList({ admin, moreCustomers }: Props) {
  const handleAddCustomer = async (customerId: string) => {
    const adminId = admin.id
    const result = await addCustomerToAdmin({ customerId, adminId })
    console.log(result)
  }

  const displaySuppliers = moreCustomers.map((customer) => (
    <li className={stylesCustomer.moreSuppliersItems} key={customer.id}>
      <p className={stylesCustomer.moreSuppliersTitle}>
        <ButtonAdd onClick={() => handleAddCustomer(customer.id)} /> {customer.firstname}{" "}
        {customer.lastname} {customer.company && `- ${customer.company}`}
      </p>
    </li>
  ))

  return <ul>{displaySuppliers}</ul>
}
