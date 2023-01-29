import { useState, useEffect } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User, Order, Wood, Supplier, Customer } from "@prisma/client"
import FormSection from "./FormSection"
import getSuppliersWoodByAdminId from "src/woodstock/wood/queries/getSuppliersWoodByAdminId"
import getActivesOrders from "src/woodstock/orders/queries/getActivesPurchaseOrders"
import ListsSection from "./ListsSection"

interface Props {
  user: User
  admin: User
  customers: Customer[]
}

export default function OrderSection({ user, admin, customers }: Props) {
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
    setWoods(woods)
  }

  const handleClickList = () => {
    setDisplayList(true)
    setDisplayForm(false)
  }

  const handleClickForm = () => {
    setDisplayList(false)
    setDisplayForm(true)
  }

  return (
    <section className={styles.managementSection}>
      <div className={styles.ongletOrder}>
        <button onClick={handleClickList} className={styles.ongletTitle}>
          <h2>Commandes en cours</h2>
        </button>
        <button onClick={handleClickForm} className={styles.ongletTitle}>
          <h2>Passer une commande</h2>
        </button>
      </div>

      {displayList && <ListsSection user={user} admin={admin} />}
      {displayForm && (
        <>
          <FormSection customers={customers} admin={admin} woods={woods} />
        </>
      )}
    </section>
  )
}
