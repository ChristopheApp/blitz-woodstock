import { Suspense } from "react"
import styles from "src/styles/Home.module.css"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { Routes, BlitzPage } from "@blitzjs/next"
import Link from "next/link"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className={styles.headerCustom}>
          <div>
            <code>Bienvenue {currentUser.email}</code>
          </div>
          <div>
            <code>{currentUser.role}</code>
          </div>
          <button
            className={styles.button}
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
        </div>
      </>
    )
  } else {
    return (
      <div className={styles.headerCustom}>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Login
        </button>
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
