import { useState, useEffect } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User, Order, Wood, Supplier, Customer } from "@prisma/client"
import FormSection from "./FormSection"
import getSuppliersWoodByAdminId from "src/woodstock/wood/queries/getSuppliersWoodByAdminId"
import getActivesOrders from "src/woodstock/orders/queries/getActivesOrders"
import ListsSection from "./ListsSection"

interface Props {
  orders: Order[]
  user: User
  admin: User
  customers: Customer[]
}

interface ActiveOrder {
  sale: Order[]
  purchase: Order[]
}

export default function OrderSection({ orders, user, admin, customers }: Props) {
  const [activeOrders, setActiveOrders] = useState<ActiveOrder>({ sale: [], purchase: [] })
  const [displayForm, setDisplayForm] = useState(false)
  const [displayList, setDisplayList] = useState(true)

  const [woods, setWoods] = useState<
    (Wood & {
      supplier: Supplier | null
    })[]
  >([])

  useEffect(() => {
    fetchAllWoodsBuyable()
    fetchActivesOrders()
  }, [])

  const fetchActivesOrders = async () => {
    const result = await getActivesOrders(admin.id)
    setActiveOrders(result)
  }

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

      {displayList && activeOrders && (
        <ListsSection user={user} admin={admin} orders={activeOrders} />
      )}
      {displayForm &&
        (woods && woods.length > 0 ? (
          <>
            <FormSection customers={customers} admin={admin} woods={woods} />
          </>
        ) : (
          <p>Vous n'avez aucun fournisseur qui propose du bois actuellement.</p>
        ))}
    </section>
  )
}
