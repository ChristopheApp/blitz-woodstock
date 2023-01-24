import styles from "./stocks.module.css"
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
        <div key={stock.id} className={styles.stockItems}>
          <h4>{stock.type}</h4>
          <div>
            <p>Prix : {stock.price} €</p>
            <p>Quantité : {stock.quantity} m3</p>
          </div>
        </div>
      )
    })
  }

  return (
    <section className={styles.managementSection}>
      <h2>Stocks</h2>
      <div className={styles.stockContainer}>{displayStocks()}</div>
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
