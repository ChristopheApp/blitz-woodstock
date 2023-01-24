import styles from "src/woodstock/styles/stocks.module.css"
import stylesCommon from "src/woodstock/styles/common.module.css"
import { User, Wood } from "@prisma/client"
import createUserStocks from "src/woodstock/mutations/createUserStock"
import deleteWood from "src/woodstock/mutations/wood/deleteWood"
interface Props {
  stocks: Wood[]
  user: User | null
  admin: User
}

export default function StockSection({ stocks, user, admin }: Props) {
  const removeWood = async (wood: Wood) => {
    await deleteWood(wood.id)
  }

  const displayStocks = () => {
    return stocks.map((stock) => {
      return (
        <div onClick={() => removeWood(stock)} key={stock.id} className={styles.stockItems}>
          <h4>{stock.type}</h4>
          <div>
            <p>Prix d'achat moyen : {stock.price} €/m³</p>
            <p>Quantité : {stock.quantity} m³</p>
          </div>
        </div>
      )
    })
  }

  return (
    <section className={styles.stockSection}>
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
