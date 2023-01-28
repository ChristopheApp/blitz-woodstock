import { useState } from "react"
import { User } from "@prisma/client"
import styles from "src/woodstock/styles/customer.module.css"
import removeCommercialFromAdmin from "src/woodstock/mutations/removeSalesrep"
import ButtonRemove from "../common/ButtonRemove"

interface Props {
  commercials: User[]
  admin: User
}

export default function CommercialsList({ admin, commercials }: Props) {
  const [userCommercials, setUserCommercials] = useState<User[]>(commercials)

  const removeCommercial = async (commercialId: string) => {
    const adminId = admin.id
    const result = await removeCommercialFromAdmin({ commercialId, adminId })
    console.log(result)
    setUserCommercials(result.commercials)
  }

  return (
    <div>
      <h3>Mes commerciaux</h3>
      <ul>
        {userCommercials.map((commercial) => (
          <li key={commercial.id} className={styles.moreSuppliersItems}>
            <p className={styles.moreSuppliersTitle}>
              <ButtonRemove onClick={() => removeCommercial(commercial.id)} />
              {commercial.email} {commercial.name && ` - ${commercial.name}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
