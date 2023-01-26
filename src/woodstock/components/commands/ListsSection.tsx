import React, { useState, useEffect } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User, Wood, Supplier, Buyer, Command } from "@prisma/client"
import CommandLists from "./CommandLists"

interface ActiveCommand {
  sale: Command[]
  purchase: Command[]
}

interface Props {
  commands: ActiveCommand
  admin: User
}

export default function ListsSection({ commands, admin }: Props) {
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
      <div className={styles.formSelector}>
        <h3 className={displayListBuy ? styles.titleFormSelected : ""} onClick={handleClickBuy}>
          Achats
        </h3>
        <h3 className={displayListSell ? styles.titleFormSelected : ""} onClick={handleClickSell}>
          Ventes
        </h3>
      </div>
      {displayListBuy && <CommandLists admin={admin} commands={commands.purchase} />}
      {displayListSell && <CommandLists admin={admin} commands={commands.sale} />}
    </>
  )
}
