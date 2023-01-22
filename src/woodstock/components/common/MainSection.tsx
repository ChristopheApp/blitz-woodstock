import { useState } from "react"
import styles from "src/styles/Home.module.css"
import { User, Wood } from "db"
import StockSection from "src/woodstock/components/stocks/StockSection"
import CommercialSection from "../commercials/CommercialSection"
import CommandSection from "../commands/CommandSection"
import BuyerSection from "../buyers/BuyerSection"
import SupplierSection from "../suppliers/SupplierSection"

interface Props {
  currentUserInfos: any
  user?: User | null
  admin?: User | null
  stocks?: Wood[]
  // commercials?: Commercial[]
  // commands?: Command[]
  // buyers?: Buyer[]
  // suppliers?: Supplier[]
}

export default function MainSection({ currentUserInfos }: Props) {
  const { user, admin, commercials, commands, stocks, suppliers, buyers } = currentUserInfos

  const [showSuppliers, setShowSuppliers] = useState(false)
  const [showBuyers, setShowBuyers] = useState(false)
  const [showCommands, setShowCommands] = useState(false)
  const [showCommercials, setShowCommercials] = useState(false)

  return (
    <>
      <div className={styles.header}>
        <h1>Woodstock</h1>

        <div className={styles.sectionContainer}>
          <StockSection stocks={stocks} user={user} admin={admin} />

          <div className={styles.body}>
            <div className={styles.instructions}>
              <button onClick={() => setShowSuppliers(!showSuppliers)}>
                <p>Afficher les fournisseurs</p>
              </button>
              {showSuppliers && <SupplierSection user={user} admin={admin} />}

              <button onClick={() => setShowBuyers(!showBuyers)}>
                <p>Afficher les clients</p>
              </button>
              {showBuyers && <BuyerSection user={user} admin={admin} />}

              <button onClick={() => setShowCommands(!showCommands)}>
                <p>Afficher les commandes</p>
              </button>
              {showCommands && <CommandSection user={user} admin={admin} />}

              <button onClick={() => setShowCommercials(!showCommercials)}>
                <p>Afficher les commerciaux</p>
              </button>
              {showCommercials && (
                <CommercialSection user={user} admin={admin} commercials={commercials} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
