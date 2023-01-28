import React, { useEffect, useState } from "react"
import { Order, User } from "@prisma/client"
import acceptOrder from "src/woodstock/mutations/order/acceptOrder"
import refuseOrder from "src/woodstock/mutations/order/resufeOrder"
import cancelOrder from "src/woodstock/mutations/order/cancelOrder"
import deliverOrder from "src/woodstock/mutations/order/deliverOrder"
import payOrder from "src/woodstock/mutations/order/payOrder"

interface Props {
  oneOrder: Order
}

export default function DisplayOrder({ oneOrder }: Props) {
  const [order, setOrder] = useState<Order>(oneOrder)
  const [orderStatus, setOrderStatus] = useState("Devis en attente")
  const [textButtonValid, setTextButtonValid] = useState("Valider")
  const [textButtonRefuse, setTextButtonRefuse] = useState("Refuser")

  const handleClickValid = async (id: string) => {
    // TODO : add if statement to check status
    if (order.status === "ACCEPTED") {
      console.log("ordere livrée")
      const result = await deliverOrder(order)
      console.log(result)
      setOrder(result)
    } else if (order.status === "DELIVERED") {
      console.log("ordere payée")
      const result = await payOrder(id)
      console.log(result)
      setOrder(result)
    } else {
      console.log("ordere validée")
      const result = await acceptOrder(id)
      console.log(result)
      setOrder(result)
    }
  }

  const handleClickRefuse = async (id: string) => {
    // TODO : add if statement to check status
    if (order.status === "CREATED") {
      console.log("ordere refusée")
      const result = await refuseOrder(id)
      console.log(result)
      setOrder(result)
    } else {
      console.log("ordere annulée")
      const result = await cancelOrder(order)
      console.log(result)
      setOrder(result)
    }
  }

  // const handleClickCancel = async (order: Order) => {
  //   console.log("ordere annulée")
  //   const result = await cancelOrder(order)
  //   console.log(result)
  //   setOrder(result)
  // }

  // const handleClickDeliver = async (order: Order) => {
  //   console.log("ordere livrée")
  //   const result = await deliverOrder(order)
  //   console.log(result)
  //   setOrder(result)
  // }

  // const handleClickPay = async (id: string, status: string) => {
  //   console.log("ordere payée")
  //   const result = await payOrder(id)
  //   console.log(result)
  //   setOrder(result)
  // }

  useEffect(() => {
    if (order.status === "ACCEPTED") {
      setOrderStatus("En cours de livraison")
      setTextButtonValid("Livraison reçu")
      setTextButtonRefuse("Annuler la ordere")
    } else if (order.status === "DELIVERED") {
      setOrderStatus("Livrée, en attente de paiement")
      setTextButtonValid("Ordere payée")
      setTextButtonRefuse("Annuler la ordere")
    }
    // else if (order.status === "PAID") {
    //     setOrderStatus("Complete")
    //     setDisplayButtonValid(false)
    //     setDisplayButtonRefuse(false)

    // } else if (order.status === "CANCELED") {
    //     setOrderStatus("Ordere annulée")
    //     setDisplayButtonValid(false)
    //     setDisplayButtonRefuse(false)

    // } else if (order.status === "REFUSED") {
    //     setOrderStatus("Devis refusé")
    //     setDisplayButtonValid(false)
    //     setDisplayButtonRefuse(false)

    // }
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
