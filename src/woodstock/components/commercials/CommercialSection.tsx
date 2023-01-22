import styles from "src/styles/Home.module.css"
import { User } from "@prisma/client"

import CommercialsList from "./CommercialsList"
import AddCommercialForm from "./AddCommercialForm"

interface Props {
  commercials?: User[]
  user: User | null
  admin: User | null
}

export default function CommercialSection({ commercials, user, admin }: Props) {
  return (
    <>
      <section className={styles.sections}>
        <h2>Ajouter commercial</h2>
        {commercials && user?.role === "ADMIN" && <CommercialsList commercials={commercials} />}
        {user && user?.role === "ADMIN" && <AddCommercialForm adminId={user?.id} />}
        {/* {user && user?.role === "ADMIN" && <UserCommercialInfos adminInfo={admin} />}
              {user && user?.role === "COMMERCIAL" && <UserAdminInfos adminInfo={admin} />} */}
      </section>
    </>
  )
}
