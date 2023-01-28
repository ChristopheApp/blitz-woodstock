import { useState } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User } from "@prisma/client"

import SalesrepsList from "./SalesrepsList"
import AddSalesrepForm from "./AddSalesrepForm"

interface Props {
  salesreps: User[]
  user: User
  admin: User
}

export default function SalesrepSection({ salesreps, user, admin }: Props) {
  const [userSalesreps, setUserSalesreps] = useState<User[]>(salesreps)

  const handleReloadSalesreps = (salesreps: User[]) => {
    setUserSalesreps(salesreps)
  }

  return (
    <>
      <section className={styles.managementSubMenu}>
        {salesreps && user?.role === "ADMIN" && (
          <SalesrepsList admin={admin} salesreps={userSalesreps} />
        )}
        {user && user?.role === "ADMIN" && (
          <AddSalesrepForm onCallback={handleReloadSalesreps} adminId={user?.id} />
        )}
        {/* {user && user?.role === "ADMIN" && <UserSalesrepInfos adminInfo={admin} />}
              {user && user?.role === "COMMERCIAL" && <UserAdminInfos adminInfo={admin} />} */}
      </section>
    </>
  )
}
