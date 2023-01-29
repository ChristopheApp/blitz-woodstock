import React, { useState, useEffect } from "react"
import styles from "src/woodstock/styles/stocks.module.css"
import stylesCommon from "src/woodstock/styles/common.module.css"
import { User, Wood } from "@prisma/client"
import createUserStocks from "src/woodstock/mutations/createUserStock"
import deleteWood from "src/woodstock/mutations/wood/deleteWood"
import getAllValidCommands from "src/woodstock/orders/queries/getAllValidOrders"
import type Stocks from "src/woodstock/types/stocks"
import createStocks from "src/woodstock/utils/createStocks"
import getUserStock from "../../queries/getUserStock"
interface Props {
  admin: User
}

export default function StockSection({ admin }: Props) {
  const [stocks, setStocks] = useState<Wood[]>([])

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {
    const result = await getUserStock(admin.id)
    console.log("result : ", result)

    const stock = result?.stock

    console.log("stocks : ", stock)
    if (stock) {
      setStocks(stock)
    }
  }

  const displayStocks = () => {
    return stocks.map((wood) => {
      return (
        <div key={wood.type} className={styles.stockItems}>
          <h4>{wood.type}</h4>
          <div>
            <p>
              Prix d'achat moyen : {Math.ceil(wood.totalPurchasedPrice / wood.quantityPurchased)}{" "}
              €/m³
            </p>
            <p>Quantité en stock : {wood.quantityPurchased - wood.quantitySold} m³</p>
          </div>
        </div>
      )
    })
  }

  return (
    <section className={styles.stockSection}>
      <h2>Mes stocks</h2>
      {stocks.length > 0 ? (
        <div className={styles.stockContainer}>{displayStocks()}</div>
      ) : (
        <p>Vous n'avez pas de stocks</p>
      )}
    </section>
  )
}
