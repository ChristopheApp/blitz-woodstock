import React, { useState, useEffect } from "react"
import styles from "src/woodstock/styles/stocks.module.css"
import stylesCommon from "src/woodstock/styles/common.module.css"
import { User, Wood } from "@prisma/client"
import createUserStocks from "src/woodstock/mutations/createUserStock"
import deleteWood from "src/woodstock/mutations/wood/deleteWood"
import getAllValidCommands from "src/woodstock/mutations/commands/getAllValidCommands"
import type Stocks from "src/woodstock/types/stocks"
import createStocks from "src/woodstock/utils/createStocks"

interface Props {
  admin: User
}

export default function StockSection({ admin }: Props) {
  const [stocks, setStocks] = useState<Stocks[]>([])

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {
    const result = await getAllValidCommands(admin.id)
    console.log("result : ", result)

    const { purchaseCommands, saleCommands } = result

    let stocks: Stocks[] = createStocks(purchaseCommands, saleCommands)

    console.log("stocks : ", stocks)
    setStocks(stocks)
  }

  const displayStocks = () => {
    return stocks.map((stock) => {
      return (
        <div key={stock.woodType} className={styles.stockItems}>
          <h4>{stock.woodType}</h4>
          <div>
            <p>Prix d'achat moyen : {stock.avgPrice} €/m³</p>
            <p>Quantité en stock : {stock.quantity} m³</p>
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
