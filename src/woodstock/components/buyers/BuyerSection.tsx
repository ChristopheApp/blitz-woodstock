import { useState } from "react"

import styles from "src/woodstock/styles/common.module.css"
import { User, Buyer } from "@prisma/client"
import UserBuyerList from "./UserBuyersList"
import getNotAdminBuyers from "src/woodstock/buyers/queries/getNotAdminBuyers"
import getBuyers from "src/woodstock/buyers/queries/getBuyers"
import MoreBuyersList from "./MoreBuyersList"

interface Props {
  buyers: Buyer[]
  admin: User
}

export default function BuyerSection({ buyers, admin }: Props) {
  const [userBuyers, setUserBuyers] = useState<Buyer[]>(buyers)
  const [moreBuyers, setMoreBuyers] = useState<Buyer[]>([])
  const [displayNewBuyers, setDisplayNewBuyers] = useState(false)

  const fetchBuyers = async () => {
    if (!displayNewBuyers) {
      const newBuyers = await getNotAdminBuyers(admin.id)
      setMoreBuyers(newBuyers)
      console.log("new buyers")
      console.log(newBuyers)
    }
    setDisplayNewBuyers(!displayNewBuyers)
  }

  return (
    <section className={styles.managementSubMenu}>
      {userBuyers.length <= 0 ? (
        <h3>Vous n'avez pas de client</h3>
      ) : (
        <UserBuyerList admin={admin} buyers={buyers} />
      )}

      <button onClick={fetchBuyers}>
        {displayNewBuyers ? "Masquer les clients" : "Afficher plus de clients"}
      </button>

      {displayNewBuyers && <MoreBuyersList admin={admin} moreBuyers={moreBuyers} />}
    </section>
  )
}
