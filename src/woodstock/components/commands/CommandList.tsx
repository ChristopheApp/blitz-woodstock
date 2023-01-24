import React from "react"
import { Command, User } from "@prisma/client"

interface Props {
  commands: Command[]
  admin: User
}

export default function CommandList({ commands }: Props) {
  return (
    <>
      <h3>Liste des commandes</h3>
    </>
  )
}
