import styles from "src/styles/Home.module.css"
import { User, Wood } from "@prisma/client"
import createUserStocks from "src/woodstock/mutations/createUserStock"

interface Props {
  stocks: Wood[]
  user: User | null
  admin: User
}

export default function StockSection({ stocks, user, admin }: Props) {
  const displayStocks = () => {
    return stocks.map((stock) => {
      return (
        <div key={stock.id}>
          <p>{stock.type}</p>
          <p>{stock.price}</p>
          <p>{stock.quantity}</p>
        </div>
      )
    })
  }

  return (
    <section className={styles.managementSection}>
      <h2>Stocks</h2>
      {displayStocks()}
      <button
        className={styles.button}
        onClick={async () => {
          await createUserStocks(admin.id)
        }}
      >
        create user stock
      </button>
    </section>
  )
}
