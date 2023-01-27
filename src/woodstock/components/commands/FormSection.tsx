import React, { useState, useEffect } from "react"
import FormBuyWood from "./FormBuyWood"
import FormSellWood from "./FormSellWood"
import { User, Wood, Supplier, Buyer } from "@prisma/client"
import styles from "src/woodstock/styles/common.module.css"
import type Stocks from "src/woodstock/types/stocks"

interface Props {
  admin: User
  woods: (Wood & {
    supplier: Supplier | null
  })[]
  buyers: Buyer[]
}

export default function FormSection({ admin, woods, buyers }: Props) {
  const [displayFormBuy, setDisplayFormBuy] = useState(true)
  const [displayFormSell, setDisplayFormSell] = useState(false)

  const handleClickBuy = () => {
    setDisplayFormBuy(true)
    setDisplayFormSell(false)
  }

  const handleClickSell = () => {
    setDisplayFormBuy(false)
    setDisplayFormSell(true)
  }

  return (
    <>
      <div className={styles.formSelector}>
        <h3
          className={displayFormBuy ? styles.titleFormSelected : styles.pointer}
          onClick={handleClickBuy}
        >
          Acheter du bois
        </h3>
        <h3
          className={displayFormSell ? styles.titleFormSelected : styles.pointer}
          onClick={handleClickSell}
        >
          Vendre du bois
        </h3>
      </div>
      {displayFormBuy && <FormBuyWood admin={admin} woods={woods} />}
      {displayFormSell && <FormSellWood admin={admin} buyers={buyers} />}
    </>
  )
}
