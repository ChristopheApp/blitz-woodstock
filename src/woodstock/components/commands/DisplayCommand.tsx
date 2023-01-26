import React, { useEffect, useState } from "react"
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

export default function DisplayCommand({ command, admin }: Props) {
  const [commandStatus, setCommandStatus] = useState("Devis en attente")
  const [textButtonValid, setTextButtonValid] = useState("Valider")
  const [textButtonRefuse, setTextButtonRefuse] = useState("Refuser")
  const [displayButtonValid, setDisplayButtonValid] = useState(true)
  const [displayButtonRefuse, setDisplayButtonRefuse] = useState(true)

  let ButtonValid = () => (
    <button onClick={() => handleClickValid(command.id)}>{textButtonValid}</button>
  )

  const ButtonRefuse = () => (
    <button onClick={() => handleClickRefuse(command.id)}>{textButtonRefuse}</button>
  )
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

  useEffect(() => {
    if (command.status === "ACCEPTED") {
      setCommandStatus("En cours de livraison")
      setTextButtonValid("Livraison reçu")
      setTextButtonRefuse("Annuler la commande")
    } else if (command.status === "DELIVERED") {
      setCommandStatus("Livrée, en attente de paiement")
      setTextButtonValid("Payer")
      setTextButtonRefuse("Annuler la commande")
    }
    // else if (command.status === "PAID") {
    //     setCommandStatus("Complete")
    //     setDisplayButtonValid(false)
    //     setDisplayButtonRefuse(false)

    // } else if (command.status === "CANCELED") {
    //     setCommandStatus("Commande annulée")
    //     setDisplayButtonValid(false)
    //     setDisplayButtonRefuse(false)

    // } else if (command.status === "REFUSED") {
    //     setCommandStatus("Devis refusé")
    //     setDisplayButtonValid(false)
    //     setDisplayButtonRefuse(false)

    // }
  }, [])

  return (
    <>
      <li>
        <p>Etat : {commandStatus}</p>
        <p>Bois : {command.woodType} </p>
        <p>Prix moyen : {command.totalPrice / command.quantity} €/m3 </p>
        <p>Quantité : {command.quantity} m3</p>
        <p>Prix total : {command.totalPrice} €</p>
        {displayButtonValid && <ButtonValid />}
        {displayButtonRefuse && <ButtonRefuse />}
      </li>
    </>
  )
}
