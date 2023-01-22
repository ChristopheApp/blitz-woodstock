import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser, useUserAdmin, useUserCommercials } from "src/users/hooks/useCurrentUser"
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
import AddCommercialForm from "src/woodstock/components/AddCommercialForm"
import { User } from "@prisma/client"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

interface Props {
  adminInfo: User | null
}

const UserCommercialInfos = ({ adminInfo }: Props) => {
  if (adminInfo) {
    return (
      <>
        <p>Salut je suis admin, y a des commerciaux a afficher</p>
        <p>{adminInfo.commercialsId}</p>
      </>
    )
  } else {
    return <></>
  }
}

const UserAdminInfos = ({ adminInfo }: Props) => {
  if (adminInfo) {
    return <>BOnjour je suis un commerial, cest quoi les stock ?</>
  } else {
    return <></>
  }
}

const UserInfo = () => {
  const currentUserInfo = useCurrentUser()
  console.log("Current user info : ", currentUserInfo)
  const [logoutMutation] = useMutation(logout)

  if (currentUserInfo) {
    const { user, admin } = currentUserInfo

    return (
      <>
        <div className={styles.sectionContainer}>
          <section className={styles.sections}>
            <h2>Stocks</h2>
          </section>

          <section className={styles.sections}>
            <h2>commandes</h2>
          </section>

          <section className={styles.sections}>
            <h2>Ajouter commercial</h2>
            {user && user?.role === "ADMIN" && <AddCommercialForm adminId={user?.id} />}
            {user && user?.role === "ADMIN" && <UserCommercialInfos adminInfo={admin} />}
            {user && user?.role === "COMMERCIAL" && <UserAdminInfos adminInfo={admin} />}
          </section>
        </div>
      </>
    )
  } else {
    return <></>
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
              <h1>Woodstock</h1>

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
                  <strong>TODO : Set relation command / user ...</strong>
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
