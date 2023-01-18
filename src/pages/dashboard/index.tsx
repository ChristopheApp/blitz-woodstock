import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import Header from "src/core/components/Header"
import AddCommercialForm from "src/woodstock/components/AddCommercialForm"

const DashboardPage: BlitzPage = () => {
  const router = useRouter()

  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  return (
    <Layout title="Dashboard">
      <div className={styles.globe} />
      <Header />

      <div className={styles.container}>
        {currentUser && <AddCommercialForm adminId={currentUser.id} />}
      </div>
    </Layout>
  )
}

export default DashboardPage
