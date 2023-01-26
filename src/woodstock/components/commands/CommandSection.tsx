import { useState, useEffect } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User, Command, Wood, Supplier, Buyer } from "@prisma/client"
import FormBuyWood from "./FormBuyWood"
import CommandLists from "./CommandLists"
import FormSection from "./FormSection"
import getSuppliersWoodByAdminId from "src/woodstock/wood/queries/getSuppliersWoodByAdminId"
import getActivesCommands from "src/woodstock/commands/queries/getActivesCommands"
import type Stocks from "src/woodstock/types/stocks"
import ListsSection from "./ListsSection"

interface Props {
  commands: Command[]
  user: User
  admin: User
  buyers: Buyer[]
}

interface ActiveCommand {
  sale: Command[]
  purchase: Command[]
}

export default function CommandlSection({ commands, user, admin, buyers }: Props) {
  const [activeCommands, setActiveCommands] = useState<ActiveCommand>()
  const [displayForm, setDisplayForm] = useState(false)
  const [displayList, setDisplayList] = useState(true)

  const [woods, setWoods] = useState<
    (Wood & {
      supplier: Supplier | null
    })[]
  >([])

  useEffect(() => {
    fetchAllWoodsBuyable()
    fetchActivesCommands()
  }, [])

  const fetchActivesCommands = async () => {
    console.log("fetchActivesCommands")
    const result = await getActivesCommands(admin.id)
    setActiveCommands(result)
    console.log(result)
  }

  const fetchAllWoodsBuyable = async () => {
    const woods = await getSuppliersWoodByAdminId(admin.id)
    setWoods(woods)
  }

  const handleClickList = () => {
    console.log("click list")
    setDisplayList(true)
    setDisplayForm(false)
  }

  const handleClickForm = () => {
    console.log("click form")
    setDisplayList(false)
    setDisplayForm(true)
  }

  return (
    <section className={styles.managementSection}>
      <div className={styles.ongletCommand}>
        <button onClick={handleClickList} className={styles.ongletTitle}>
          <h2>Commandes en cours</h2>
        </button>
        <button onClick={handleClickForm} className={styles.ongletTitle}>
          <h2>Passer une commande</h2>
        </button>
      </div>

      {displayList && activeCommands && <ListsSection admin={admin} commands={activeCommands} />}
      {displayForm &&
        (woods && woods.length > 0 ? (
          <>
            <FormSection buyers={buyers} admin={admin} woods={woods} />
          </>
        ) : (
          <p>Vous n'avez aucun fournisseur qui propose du bois actuellement.</p>
        ))}
    </section>
  )
}
