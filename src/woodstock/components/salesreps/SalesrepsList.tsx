import { useState, useEffect } from "react"
import { User } from "@prisma/client"
import styles from "src/woodstock/styles/Customer.module.css"
import removeSalesrepFromAdmin from "src/woodstock/mutations/removeSalesrep"
import ButtonRemove from "../common/ButtonRemove"
import getAdminSalesreps from "src/woodstock/salesrep/queries/getAdminSalesreps"

interface Props {
  salesreps: User[]
  admin: User
  reloadProps: boolean
}

export default function SalesrepsList({ admin, salesreps, reloadProps }: Props) {
  const [relaod, setReload] = useState(reloadProps)
  const [userSalesreps, setUserSalesreps] = useState<User[]>(salesreps)

  useEffect(() => {
    console.log("user salesreps change")
    fetchSalesrep()
  }, [relaod])

  const fetchSalesrep = async () => {
    const adminId = admin.id
    const result = await getAdminSalesreps(adminId)
    console.log("result", result)
    setUserSalesreps(result)
  }

  // Use effect to get salesreps from admin and create getSalesrepsFromAdmin function
  const removeSalesrep = async (salesrepId: string) => {
    const adminId = admin.id
    const result = await removeSalesrepFromAdmin({ salesrepId, adminId })
    setUserSalesreps(result.salesreps)
  }

  return (
    <div>
      <h3>Mes commerciaux</h3>
      <ul>
        {userSalesreps.map((salesrep) => (
          <li key={salesrep.id} className={styles.moreSuppliersItems}>
            <p className={styles.moreSuppliersTitle}>
              <ButtonRemove onClick={() => removeSalesrep(salesrep.id)} />
              {salesrep.email} {salesrep.name && ` - ${salesrep.name}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
