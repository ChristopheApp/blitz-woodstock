import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import generateSuppliers from "src/woodstock/mutations/common/generateSuppliers"
import deleteAllSuppliers from "src/woodstock/mutations/common/deleteAllSuppliers"
import generateBuyers from "src/woodstock/mutations/common/generateBuyers"
import deleteAllBuyers from "src/woodstock/mutations/common/deleteAllBuyers"
import getAllSuppliers from "src/woodstock/suppliers/queries/getSuppliers"
import deleteAllUsers from "src/woodstock/mutations/common/deleteAllUsers"
import cleanAllData from "src/woodstock/mutations/common/cleanAllData"

const Config: BlitzPage = () => {
  // suppliersInfo()

  return (
    <Layout title="Config">
      <div className={styles.globe} />

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <h1>Woodstock configuration</h1>
            </div>

            <div className={styles.body}>
              {/* Instructions */}
              <div className={styles.instructions}>
                <p>
                  <strong>Many buttons to setup a configuration to make this app work.</strong>
                </p>

                <div className={styles.configContainer}>
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
                          Generate suppliers
                        </button>
                      </pre>
                    </div>

                    <div className={styles.code}>
                      <span>2</span>
                      <pre>
                        <button
                          className={styles.buttonDelete}
                          onClick={async () => {
                            await deleteAllSuppliers()
                          }}
                        >
                          Delete all suppliers
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
                          className={styles.buttonDelete}
                          onClick={async () => {
                            await deleteAllBuyers()
                          }}
                        >
                          Delete all buyers
                        </button>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <div className={styles.code}>
                      <span>5</span>
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
                      <span>6</span>
                      <pre>
                        <button
                          className={styles.button}
                          onClick={async () => {
                            await getAllSuppliers()
                          }}
                        >
                          button test fetch suppliers
                        </button>
                      </pre>
                    </div>

                    <div className={styles.code}>
                      <span>7</span>
                      <pre>
                        <button
                          className={styles.buttonDelete}
                          onClick={async () => {
                            await deleteAllUsers()
                          }}
                        >
                          Delete all users
                        </button>
                      </pre>
                    </div>

                    <div className={styles.code}>
                      <span>8</span>
                      <pre>
                        <button
                          className={styles.buttonDelete}
                          onClick={async () => {
                            await cleanAllData()
                          }}
                        >
                          Clean all datas
                        </button>
                      </pre>
                    </div>
                  </div>
                </div>
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

export default Config
