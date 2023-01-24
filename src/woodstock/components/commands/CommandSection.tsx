import { useState, useEffect } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User, Command, Wood, Supplier } from "@prisma/client"
import FormNewCommand from "./FormNewCommand"
import CommandList from "./CommandList"
import getSuppliersWoodByAdminId from "src/woodstock/wood/queries/getSuppliersWoodByAdminId"

interface Props {
  commands: Command[]
  user: User
  admin: User
}

export default function CommandlSection({ commands, user, admin }: Props) {
  const [displayForm, setDisplayForm] = useState(false)
  const [displayList, setDisplayList] = useState(true)

  const [woods, setWoods] = useState<
    (Wood & {
      supplier: Supplier | null
    })[]
  >([])

  useEffect(() => {
    fetchAllWoodsBuyable()
  }, [])

  const fetchAllWoodsBuyable = async () => {
    const woods = await getSuppliersWoodByAdminId(admin.id)
    console.log(woods)
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
          <h2>Liste des commandes</h2>
        </button>
        <button onClick={handleClickForm} className={styles.ongletTitle}>
          <h2>Passer une commande</h2>
        </button>
      </div>
      {displayList && <CommandList admin={admin} commands={commands} />}
      {displayForm &&
        (woods && woods.length > 0 ? (
          <FormNewCommand admin={admin} woods={woods} />
        ) : (
          <p>Vous n'avez aucun fournisseur qui propose du bois actuellement.</p>
        ))}
    </section>
  )
}
