import React, { useEffect, useState } from "react"
import { Order } from "@prisma/client"
import acceptOrder from "src/woodstock/mutations/order/acceptOrder"
import refuseOrder from "src/woodstock/mutations/order/resufeOrder"
import cancelOrder from "src/woodstock/mutations/order/cancelOrder"
import deliverOrder from "src/woodstock/mutations/order/deliverOrder"
import payOrder from "src/woodstock/mutations/order/payOrder"

interface Props {
  oneOrder: Order
  handleReload: () => void
}

export default function DisplayOrder({ handleReload, oneOrder }: Props) {
  const [order, setOrder] = useState<Order>(oneOrder)
  const [orderStatus, setOrderStatus] = useState("Devis en attente")
  const [textButtonValid, setTextButtonValid] = useState("Valider")
  const [textButtonRefuse, setTextButtonRefuse] = useState("Refuser")

  const handleClickValid = async (id: string) => {
    // TODO : add if statement to check status
    if (order.status === "ACCEPTED") {
      const result = await deliverOrder(order)
      setOrder(result)
    } else if (order.status === "DELIVERED") {
      const result = await payOrder(id)
      setOrder(result)
      handleReload()
    } else {
      const result = await acceptOrder(id)
      setOrder(result)
    }
  }

  const handleClickRefuse = async (id: string) => {
    // TODO : add if statement to check status
    if (order.status === "CREATED") {
      const result = await refuseOrder(id)
      setOrder(result)
    } else {
      const result = await cancelOrder(order)
      setOrder(result)
    }
    handleReload()
  }

  useEffect(() => {
    if (order.status === "ACCEPTED") {
      setOrderStatus("En cours de livraison")
      setTextButtonValid("Livraison reçu")
      setTextButtonRefuse("Annuler la commande")
    } else if (order.status === "DELIVERED") {
      setOrderStatus("Livrée, en attente de paiement")
      setTextButtonValid("commande payée")
      setTextButtonRefuse("Annuler la commande")
    }
  }, [order.status])

  return (
    <>
      <li>
        <p>Etat : {orderStatus}</p>
        <p>Bois : {order.woodType} </p>
        <p>Prix moyen : {order.totalPrice / order.quantity} €/m3 </p>
        <p>Quantité : {order.quantity} m3</p>
        <p>Prix total : {order.totalPrice} €</p>
        <button onClick={() => handleClickValid(order.id)}>{textButtonValid}</button>
        <button onClick={() => handleClickRefuse(order.id)}>{textButtonRefuse}</button>
      </li>
    </>
  )
}
