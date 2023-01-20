import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import Header from "src/core/components/Header"
import generateSuppliers from "src/woodstock/mutations/generateSuppliers"
import deleteAllSuppliers from "src/woodstock/mutations/deleteAllSuppliers"
import generateBuyers from "src/woodstock/mutations/generateBuyers"
import deleteAllBuyers from "src/woodstock/mutations/deleteAllBuyers"
import randomWood from "src/woodstock/utils/randomWood"
import fetchSuppliers from "src/woodstock/suppliers/queries/getSuppliers"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className={styles.buttonsContainer}>
          <Link href={Routes.DashboardPage()} className={styles.button}>
            Dashboard
          </Link>
          <button
            className={styles.button}
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
        </div>
        <div>
          Email : <code>{currentUser.email}</code>
          <br />
          User role: <code>{currentUser.role}</code>
          <br />
          User id: <code>{currentUser.id}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  // suppliersInfo()

  return (
    <Layout title="Home">
      <div className={styles.globe} />

      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <h1>Bienvenue sur Woodstock</h1>

              {/* Auth */}

              <div className={styles.buttonContainer}>
                <Suspense fallback="Loading...">
                  <UserInfo />
                </Suspense>
              </div>
            </div>

            <div className={styles.body}>
              {/* Instructions */}
              <div className={styles.instructions}>
                <p>
                  <strong>
                    TODO : SET CASCADE OR SOMETHING LIKE THIS, WHEN DELETE SUPPLIER? DELETE HIS
                    STOCK.
                  </strong>
                </p>

                <div>
                  <div className={styles.code}>
                    <span>1</span>
                    <pre>
                      <button
                        className={styles.button}
                        onClick={async () => {
                          await generateSuppliers()
                        }}
                      >
                        Generate supplier
                      </button>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>2</span>
                    <pre>
                      <button
                        className={styles.button}
                        onClick={async () => {
                          await fetchSuppliers()
                        }}
                      >
                        button test fetch suppliers
                      </button>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>3</span>
                    <pre>
                      <button
                        className={styles.button}
                        onClick={async () => {
                          await generateBuyers()
                        }}
                      >
                        generate Buyers
                      </button>
                    </pre>
                  </div>

                  <div className={styles.code}>
                    <span>4</span>
                    <pre>
                      <button
                        className={styles.button}
                        onClick={async () => {
                          await deleteAllBuyers()
                        }}
                      >
                        Delete all buyers
                      </button>
                    </pre>
                  </div>
                </div>
              </div>
              {/* Links */}
              <div className={styles.linkGrid}>
                <a
                  href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  Blitz Docs
                  <span className={styles.arrowIcon} />
                </a>
                <a
                  href="https://nextjs.org/docs/getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  Next.js Docs
                  <span className={styles.arrowIcon} />
                </a>
                <a
                  href="https://github.com/blitz-js/blitz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  Github Repo
                  <span className={styles.arrowIcon} />
                </a>
                <a
                  href="https://twitter.com/blitz_js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  Blitz Twitter
                  <span className={styles.arrowIcon} />
                </a>
                <a
                  href="https://discord.blitzjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                >
                  Discord Community
                  <span className={styles.arrowIcon} />
                </a>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <span>Powered by</span>
          <a
            href="https://christophe-applanat.fr"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.textLink}
          >
            Christophe Applanat
          </a>
        </footer>
      </div>
    </Layout>
  )
}

export default Home
