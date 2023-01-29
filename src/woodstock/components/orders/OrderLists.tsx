import React from "react"
import { Order, User } from "@prisma/client"
import DisplayOrder from "./DisplayOrder"

interface Props {
  orders: Order[]
  admin: User
}

export default function OrderLists({ orders, admin }: Props) {
  const displayOrders = orders.map((order) => {
    return <DisplayOrder key={order.id} oneOrder={order} />
  })

  return (
    <>
      <ul>{displayOrders}</ul>
    </>
  )
}
