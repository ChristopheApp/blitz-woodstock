import { useState, useEffect } from "react"
import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import TableList from "src/woodstock/components/commands/TableList"
import { Command, User } from "db"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

const userInfos = async () => {
  const currentUserInfo = useCurrentUser()

  return <></>
}

const CommandsPage: BlitzPage = () => {
  const currentUserInfo = useCurrentUser()

  const [commands, setCommands] = useState<Command[]>([])
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if (currentUserInfo && currentUserInfo.commands) {
      setCommands(currentUserInfo.commands)
    }

    if (currentUserInfo && currentUserInfo.user) {
      setUser(currentUserInfo.user)
    }
  }, [currentUserInfo])

  if (!currentUserInfo) {
    return <div>loading...</div>
  } else if (user?.role === "ADMIN") {
    return (
      <Layout title="Commands">
        <TableList commands={commands} />
      </Layout>
    )
  } else {
    return (
      <Layout title="Commands">
        <h3>Vous n'avez pas accès aux commandes.</h3>
      </Layout>
    )
  }
}

export default CommandsPage
