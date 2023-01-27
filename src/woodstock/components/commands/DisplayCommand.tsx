import React, { useEffect, useState } from "react"
import { Command, User } from "@prisma/client"
import acceptCommand from "src/woodstock/mutations/commands/acceptCommand"
import refuseCommand from "src/woodstock/mutations/commands/resufeCommand"
import cancelCommand from "src/woodstock/mutations/commands/cancelCommand"
import deliverCommand from "src/woodstock/mutations/commands/deliverCommand"
import payCommand from "src/woodstock/mutations/commands/payCommand"

interface Props {
  oneCommand: Command
}

export default function DisplayCommand({ oneCommand }: Props) {
  const [command, setCommand] = useState<Command>(oneCommand)
  const [commandStatus, setCommandStatus] = useState("Devis en attente")
  const [textButtonValid, setTextButtonValid] = useState("Valider")
  const [textButtonRefuse, setTextButtonRefuse] = useState("Refuser")

  const handleClickValid = async (id: string) => {
    // TODO : add if statement to check status
    if (command.status === "ACCEPTED") {
      console.log("commande livrée")
      const result = await deliverCommand(command)
      console.log(result)
      setCommand(result)
    } else if (command.status === "DELIVERED") {
      console.log("commande payée")
      const result = await payCommand(id)
      console.log(result)
      setCommand(result)
    } else {
      console.log("commande validée")
      const result = await acceptCommand(id)
      console.log(result)
      setCommand(result)
    }
  }

  const handleClickRefuse = async (id: string) => {
    // TODO : add if statement to check status
    if (command.status === "CREATED") {
      console.log("commande refusée")
      const result = await refuseCommand(id)
      console.log(result)
      setCommand(result)
    } else {
      console.log("commande annulée")
      const result = await cancelCommand(command)
      console.log(result)
      setCommand(result)
    }
  }

  // const handleClickCancel = async (command: Command) => {
  //   console.log("commande annulée")
  //   const result = await cancelCommand(command)
  //   console.log(result)
  //   setCommand(result)
  // }

  // const handleClickDeliver = async (command: Command) => {
  //   console.log("commande livrée")
  //   const result = await deliverCommand(command)
  //   console.log(result)
  //   setCommand(result)
  // }

  // const handleClickPay = async (id: string, status: string) => {
  //   console.log("commande payée")
  //   const result = await payCommand(id)
  //   console.log(result)
  //   setCommand(result)
  // }

  useEffect(() => {
    if (command.status === "ACCEPTED") {
      setCommandStatus("En cours de livraison")
      setTextButtonValid("Livraison reçu")
      setTextButtonRefuse("Annuler la commande")
    } else if (command.status === "DELIVERED") {
      setCommandStatus("Livrée, en attente de paiement")
      setTextButtonValid("Commande payée")
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
  }, [command.status])

  return (
    <>
      <li>
        <p>Etat : {commandStatus}</p>
        <p>Bois : {command.woodType} </p>
        <p>Prix moyen : {command.totalPrice / command.quantity} €/m3 </p>
        <p>Quantité : {command.quantity} m3</p>
        <p>Prix total : {command.totalPrice} €</p>
        <button onClick={() => handleClickValid(command.id)}>{textButtonValid}</button>
        <button onClick={() => handleClickRefuse(command.id)}>{textButtonRefuse}</button>
      </li>
    </>
  )
}
