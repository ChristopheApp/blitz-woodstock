import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import Header from "src/core/components/Header"
import generateSuppliers from "src/woodstock/mutations/common/generateSuppliers"
import generateBuyers from "src/woodstock/mutations/common/generateBuyers"
import deleteAllBuyers from "src/woodstock/mutations/common/deleteAllBuyers"
import fetchSuppliers from "src/woodstock/suppliers/queries/getSuppliers"
import createUserStocks from "src/woodstock/mutations/createUserStock"

import UserInfos from "src/woodstock/components/common/UserInfos"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  // suppliersInfo()

  return (
    <Layout title="Home">
      <div className={styles.globe} />

      <Header />
      <div className={styles.container}>
        <Suspense fallback="Loading...">
          <UserInfos />
        </Suspense>
        <main className={styles.main}>
          <div className={styles.wrapper}>
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
