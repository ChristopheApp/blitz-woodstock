import { useState } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User, Customer } from "@prisma/client"
import UserCustomerList from "./UserCustomersList"
import getNotAdminCustomers from "src/woodstock/customers/queries/getNotAdminCustomers"
import getCustomers from "src/woodstock/customers/queries/getCustomers"
import MoreCustomersList from "./MoreCustomersList"

interface Props {
  customers: Customer[]
  admin: User
}

export default function CustomerSection({ customers, admin }: Props) {
  const [userCustomers, setUserCustomers] = useState<Customer[]>(customers)
  const [moreCustomers, setMoreCustomers] = useState<Customer[]>([])
  const [displayNewCustomers, setDisplayNewCustomers] = useState(false)

  const fetchCustomers = async () => {
    if (!displayNewCustomers) {
      const newCustomers = await getNotAdminCustomers(admin.id)
      setMoreCustomers(newCustomers)
      console.log("new customers")
      console.log(newCustomers)
    }
    setDisplayNewCustomers(!displayNewCustomers)
  }

  return (
    <section className={styles.managementSubMenu}>
      {userCustomers.length <= 0 ? (
        <h3>Vous n'avez pas de client</h3>
      ) : (
        <UserCustomerList admin={admin} customers={customers} />
      )}

      <button onClick={fetchCustomers}>
        {displayNewCustomers ? "Masquer les clients" : "Afficher plus de clients"}
      </button>

      {displayNewCustomers && <MoreCustomersList admin={admin} moreCustomers={moreCustomers} />}
    </section>
  )
  return (
    <section className={styles.managementSubMenu}>
      <h3>Vous n'avez pas de client</h3>
    </section>
  )
}
