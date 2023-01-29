import React, { useState, useEffect } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User, Order } from "@prisma/client"
import OrderLists from "./OrderLists"
import { Routes } from "@blitzjs/next"
import Link from "next/link"

interface Props {
  admin: User
  user: User
}

export default function ListsSection({ admin, user }: Props) {
  const [displayListBuy, setDisplayListBuy] = useState(true)
  const [displayListSell, setDisplayListSell] = useState(false)

  const handleClickBuy = () => {
    setDisplayListBuy(true)
    setDisplayListSell(false)
  }

  const handleClickSell = () => {
    setDisplayListBuy(false)
    setDisplayListSell(true)
  }

  return (
    <>
      {user.role === "ADMIN" && (
        <Link href={Routes.OrdersPage()} className={styles.button}>
          <h3 className={styles.linkAllCmd}>Toutes les commandes</h3>
        </Link>
      )}

      <div className={styles.formSelector}>
        <h3
          className={displayListBuy ? styles.titleFormSelected : styles.pointer}
          onClick={handleClickBuy}
        >
          Achats
        </h3>
        <h3
          className={displayListSell ? styles.titleFormSelected : styles.pointer}
          onClick={handleClickSell}
        >
          Ventes
        </h3>
      </div>
      {displayListBuy && <OrderLists admin={admin} type="PURCHASE" />}
      {displayListSell && <OrderLists admin={admin} type="SALE" />}
    </>
  )
}
