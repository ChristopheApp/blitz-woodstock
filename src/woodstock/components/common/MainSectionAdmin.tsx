import { useState } from "react"
import styles from "src/styles/Home.module.css"
import { User, Wood } from "db"
import StockSection from "src/woodstock/components/stocks/StockSection"
import CommercialSection from "../commercials/CommercialSection"
import CommandSection from "../commands/CommandSection"
import BuyerSection from "../buyers/BuyerSection"
import SupplierSection from "../suppliers/SupplierSection"
import ButtonManagementSections from "./ButtonManagementSections"

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
      <div className={styles.sectionContainer}>
        <StockSection stocks={stocks} user={user} admin={admin} />

        <div className={styles.managementSection}>
          <ButtonManagementSections
            onClick={() => setShowSuppliers(!showSuppliers)}
            text="Liste des fournisseurs"
          />
          {showSuppliers && <SupplierSection admin={admin} />}

          <ButtonManagementSections
            onClick={() => setShowBuyers(!showBuyers)}
            text="Liste des clients"
          />
          {showBuyers && <BuyerSection admin={admin} buyers={buyers} />}

          <ButtonManagementSections
            onClick={() => setShowCommands(!showCommands)}
            text="Liste des commandes"
          />
          {showCommands && <CommandSection user={user} admin={admin} />}

          <ButtonManagementSections
            onClick={() => setShowCommercials(!showCommercials)}
            text="Liste des commerciaux"
          >
            {showCommercials && (
              <CommercialSection user={user} admin={admin} commercials={commercials} />
            )}
          </ButtonManagementSections>
        </div>
      </div>
    </>
  )
}
