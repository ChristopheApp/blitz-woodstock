import { useState } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User } from "@prisma/client"
import getAdminSalesreps from "src/woodstock/salesrep/queries/getAdminSalesreps"

import SalesrepsList from "./SalesrepsList"
import AddSalesrepForm from "./AddSalesrepForm"

interface Props {
  salesreps: User[]
  user: User
  admin: User
}

export default function SalesrepSection({ salesreps, user, admin }: Props) {
  const [userSalesreps, setUserSalesreps] = useState<User[]>(salesreps)
  const [reload, setReload] = useState(false)

  // useEffect(() => {
  //   console.log("user salesreps change")
  //   fetchSalesrep()
  // }, [relaod])

  const fetchSalesrep = async () => {
    const adminId = admin.id
    const result = await getAdminSalesreps(adminId)
    console.log("result", result)
    setUserSalesreps(result)
  }

  const handleReloadSalesreps = (salesreps: User[]) => {
    console.log("on success")
    setReload(!reload)
    fetchSalesrep()
  }

  return (
    <>
      <section className={styles.managementSubMenu}>
        {userSalesreps && user?.role === "ADMIN" && (
          <SalesrepsList reloadProps={reload} admin={admin} salesreps={userSalesreps} />
        )}
        {user && user?.role === "ADMIN" && (
          <AddSalesrepForm onSuccess={handleReloadSalesreps} adminId={user?.id} />
        )}
        {/* {user && user?.role === "ADMIN" && <UserSalesrepInfos adminInfo={admin} />}
              {user && user?.role === "COMMERCIAL" && <UserAdminInfos adminInfo={admin} />} */}
      </section>
    </>
  )
}
