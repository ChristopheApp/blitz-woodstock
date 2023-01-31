import React, { useState, useEffect, Suspense } from "react"
import { Order, User } from "@prisma/client"
import DisplayOrder from "./DisplayOrder"
import getActivesSaleOrders from "src/woodstock/orders/queries/getActivesSaleOrders"
import getActivesPurchaseOrders from "src/woodstock/orders/queries/getActivesPurchaseOrders"
import styles from "src/woodstock/styles/common.module.css"
interface Props {
  type: string
  admin: User
}

export default function OrderLists({ type, admin }: Props) {
  const [orderList, setOrderList] = useState<Order[]>([])

  const [displayListBuy, setDisplayListBuy] = useState(true)
  const [displayListSell, setDisplayListSell] = useState(false)

  const fetchOrders = async () => {
    if (type === "PURCHASE") {
      const orders = await getActivesPurchaseOrders(admin.id)
      setOrderList(orders)
    }

    if (type === "SALE") {
      const orders = await getActivesSaleOrders(admin.id)
      setOrderList(orders)
    }
  }

  useEffect(() => {
    fetchOrders()

    return () => {
      setOrderList([])
    }
  }, [])

  const handleReload = () => {
    fetchOrders()
  }

  const displayOrders = orderList.map((order) => {
    return <DisplayOrder handleReload={handleReload} key={order.id} oneOrder={order} />
  })

  return (
    <>
      {displayOrders.length > 0 ? (
        <ul>{displayOrders}</ul>
      ) : (
        <h3 className={styles.description}>Aucune commande en cours</h3>
      )}
    </>
  )
}
