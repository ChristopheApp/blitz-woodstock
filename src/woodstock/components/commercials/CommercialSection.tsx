import styles from "src/woodstock/styles/common.module.css"
import { User } from "@prisma/client"

import CommercialsList from "./CommercialsList"
import AddCommercialForm from "./AddCommercialForm"

interface Props {
  commercials?: User[]
  user: User
  admin: User
}

export default function CommercialSection({ commercials, user, admin }: Props) {
  return (
    <>
      <section className={styles.managementSubMenu}>
        {commercials && user?.role === "ADMIN" && (
          <CommercialsList admin={admin} commercials={commercials} />
        )}
        {user && user?.role === "ADMIN" && <AddCommercialForm adminId={user?.id} />}
        {/* {user && user?.role === "ADMIN" && <UserCommercialInfos adminInfo={admin} />}
              {user && user?.role === "COMMERCIAL" && <UserAdminInfos adminInfo={admin} />} */}
      </section>
    </>
  )
}
