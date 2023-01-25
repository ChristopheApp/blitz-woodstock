import React from "react"
import { Command, User } from "@prisma/client"
import acceptCommand from "src/woodstock/mutations/commands/acceptCommand"
import CommandDisplayer from "./CommandDisplayer"

interface Props {
  commands: Command[]
  admin: User
}

export default function CommandList({ commands, admin }: Props) {
  const handleClickValid = async (id: string) => {
    console.log("commande validée")
    const result = await acceptCommand(id)
    console.log(result)
  }

  const handleClickRefuse = (id: string) => {
    console.log("commande refusée")
  }

  const displayCommands = commands.map((command) => {
    return <CommandDisplayer key={command.id} admin={admin} command={command} />
  })

  return (
    <>
      <h3>Liste des commandes</h3>
      <ul>{displayCommands}</ul>
    </>
  )
}
