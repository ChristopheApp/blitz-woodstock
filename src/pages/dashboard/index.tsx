import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser, useUserAdmin, useUserCommercials } from "src/users/hooks/useCurrentUser"
import Header from "src/core/components/Header"
import AddCommercialForm from "src/woodstock/components/commercials/AddCommercialForm"

const UserCommercialInfos = () => {
  const currentUser = useCurrentUser()
  const userCommercials = useUserCommercials(currentUser?.id)

  if (userCommercials) {
    return (
      <>
        <p>Salut je suis admin, y a des commerciaux a afficher</p>
      </>
    )
  } else {
    return <></>
  }
}

const UserAdminInfos = () => {
  const currentUser = useCurrentUser()
  const userAdmin = useUserAdmin(currentUser?.id)

  if (userAdmin) {
    return <>BOnjour je suis un commerial, cest quoi les stock ?</>
  } else {
    return <></>
  }
}

const DashboardPage: BlitzPage = () => {
  const router = useRouter()

  const [isAdmin, setIsAdmin] = useState(false)
  const [admin, setAdmin] = useState()
  const [commercials, setCommercials] = useState([])

  const currentUser = useCurrentUser()

  const userAdmin = useUserAdmin(currentUser?.id)
  const userCommercials = useUserCommercials(currentUser?.id)

  const [logoutMutation] = useMutation(logout)

  useEffect(() => {}, [currentUser])

  return (
    <Layout title="Dashboard">
      <div className={styles.globe} />
      <Header />

      <div className={styles.sectionContainer}>
        <section className={styles.sections}>
          <h2>Stocks</h2>
        </section>

        <section className={styles.sections}>
          <h2>commandes</h2>
        </section>

        <section className={styles.sections}>
          <h2>Ajouter commercial</h2>
          {currentUser && currentUser.role === "ADMIN" && (
            <AddCommercialForm adminId={currentUser.id} />
          )}
          {currentUser && currentUser.role === "ADMIN" && <UserCommercialInfos />}
          {currentUser && currentUser.role === "COMMERCIAL" && <UserAdminInfos />}
        </section>
      </div>
    </Layout>
  )
}

export default DashboardPage
