import React from "react"
import { Command, User } from "@prisma/client"
import acceptCommand from "src/woodstock/mutations/commands/acceptCommand"
import CommandDisplayer from "./CommandDisplayer"
import DisplayCommand from "./DisplayCommand"

interface Props {
  commands: Command[]
  admin: User
}

export default function CommandLists({ commands, admin }: Props) {
  const displayCommands = commands.map((command) => {
    return <DisplayCommand key={command.id} oneCommand={command} />
  })

  return (
    <>
      <ul>{displayCommands}</ul>
    </>
  )
}
