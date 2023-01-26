import React from "react"
import { Command, User } from "@prisma/client"
import acceptCommand from "src/woodstock/mutations/commands/acceptCommand"
import refuseCommand from "src/woodstock/mutations/commands/resufeCommand"
import cancelCommand from "src/woodstock/mutations/commands/cancelCommand"
import deliverCommand from "src/woodstock/mutations/commands/deliverCommand"
import payCommand from "src/woodstock/mutations/commands/payCommand"

interface Props {
  command: Command
  admin: User
}

export default function CommandDisplayer({ command, admin }: Props) {
  const handleClickValid = async (id: string) => {
    console.log("commande validée")
    const result = await acceptCommand(id)
    console.log(result)
  }

  const handleClickRefuse = async (id: string) => {
    console.log("commande refusée")
    const result = await refuseCommand(id)
    console.log(result)
  }

  const handleClickCancel = async (command: Command) => {
    console.log("commande annulée")
    const result = await cancelCommand(command)
    console.log(result)
  }

  const handleClickDeliver = async (command: Command) => {
    console.log("commande livrée")
    const result = await deliverCommand(command)
    console.log(result)
  }

  const handleClickPay = async (id: string, status: string) => {
    console.log("commande payée")
    const result = await payCommand(id)
    console.log(result)
  }

  if (command.status === "CREATED") {
    return (
      <>
        <li>
          <p>Etat : Devis en attente </p>
          <p>Bois : {command.woodType} </p>
          <p>Prix moyen : {command.totalPrice / command.quantity} €/m3 </p>
          <p>Quantité : {command.quantity} m3</p>
          <p>Prix total : {command.totalPrice} €</p>
          <button onClick={() => handleClickValid(command.id)}>Valider</button>
          <button onClick={() => handleClickRefuse(command.id)}>Refuser</button>
        </li>
      </>
    )
  } else if (command.status === "ACCEPTED") {
    return (
      <li>
        <p>Type : {command.type}</p>
        <p>Etat : En cours de livraison </p>
        <p>Bois : {command.woodType} </p>
        <p>Quantité : {command.quantity} m3</p>
        <p>Prix total : {command.totalPrice} €</p>
        <p>Prix moyen : {command.totalPrice / command.quantity} €/m3 </p>
        <button onClick={() => handleClickDeliver(command)}>Livraison reçu</button>
        <button onClick={() => handleClickCancel(command)}>Annuler</button>
      </li>
    )
  } else if (command.status === "DELIVERED") {
    return (
      <li>
        <p>Type : {command.type}</p>
        <p>Etat : Livrée, en attente de paiement</p>
        <p>Bois : {command.woodType} </p>
        <p>Quantité : {command.quantity} m3</p>
        <p>Prix total : {command.totalPrice} €</p>
        <p>Prix moyen : {command.totalPrice / command.quantity} €/m3 </p>
        <button onClick={() => handleClickPay(command.id, command.status)}>Payer</button>
        <button onClick={() => handleClickCancel(command)}>Annuler</button>
      </li>
    )
  } else if (command.status === "PAID") {
    return (
      <li>
        <p>Type : {command.type}</p>
        <p>Etat : Complete</p>
        <p>Bois : {command.woodType} </p>
        <p>Quantité : {command.quantity} m3</p>
        <p>Prix total : {command.totalPrice} €</p>
        <p>Prix moyen : {command.totalPrice / command.quantity} €/m3 </p>
      </li>
    )
  } else if (command.status === "CANCELED") {
    return (
      <li>
        <p>Type : {command.type}</p>
        <p>Etat : Commande annulée</p>
        <p>Bois : {command.woodType} </p>
        <p>Quantité : {command.quantity} m3</p>
        <p>Prix total : {command.totalPrice} €</p>
        <p>Prix moyen : {command.totalPrice / command.quantity} €/m3 </p>
      </li>
    )
  } else if (command.status === "REFUSED") {
    return (
      <li>
        <p>Type : {command.type}</p>
        <p>Etat : Devis refusé </p>
        <p>Bois : {command.woodType} </p>
        <p>Quantité : {command.quantity} m3</p>
        <p>Prix total : {command.totalPrice} €</p>
        <p>Prix moyen : {command.totalPrice / command.quantity} €/m3 </p>
      </li>
    )
  } else {
    return <></>
  }
}
