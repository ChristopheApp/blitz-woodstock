import React, { useState, useEffect } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User, Wood, Supplier, Buyer, Command } from "@prisma/client"
import CommandLists from "./CommandLists"
import { userAgent } from "next/server"
import { Routes, BlitzPage } from "@blitzjs/next"
import Link from "next/link"

interface ActiveCommand {
  sale: Command[]
  purchase: Command[]
}

interface Props {
  commands: ActiveCommand
  admin: User
  user: User
}

export default function ListsSection({ commands, admin, user }: Props) {
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
        <Link href={Routes.CommandsPage()} className={styles.button}>
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
      {displayListBuy && <CommandLists admin={admin} commands={commands.purchase} />}
      {displayListSell && <CommandLists admin={admin} commands={commands.sale} />}
    </>
  )
}
