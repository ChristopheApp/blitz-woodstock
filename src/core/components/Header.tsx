import { Suspense } from "react"
import styles from "src/styles/Home.module.css"
import logout from "src/auth/mutations/logout"
import login from "src/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { Routes, BlitzPage } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"

const UserInfo = () => {
  const router = useRouter()

  const currentUserInfo = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUserInfo) {
    const { user, admin } = currentUserInfo
    return (
      <>
        <div className={styles.headerContainer}>
          <div className={styles.headerSections}>
            <code>{user?.email}</code>
          </div>
          <div className={styles.headerSections}>
            <code>{user?.role}</code>
          </div>
          <div className={styles.headerSections}>
            <button
              className={styles.button}
              onClick={async () => {
                await logoutMutation().then(() => {
                  router.push(Routes.Home())
                })
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div className={styles.headerCustomUnlog}>
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </div>
    )
  }
}

export default function Header() {
  return (
    <div>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}
