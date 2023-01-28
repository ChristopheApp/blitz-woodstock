import { useState } from "react"
import stylesCommon from "src/woodstock/styles/common.module.css"
import { User, Wood } from "db"
import CommercialSection from "../salesreps/CommercialSection"
import CommandSection from "../orders/OrderSection"
import BuyerSection from "../customer/CustomerSection"
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
      <div className={stylesCommon.managementSection}>
        <h2>Administration</h2>
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

        {/* <ButtonManagementSections
          onClick={() => setShowCommands(!showCommands)}
          text="Liste des commandes"
        /> */}
        {/* {showCommands && <CommandSection user={user} admin={admin} />} */}

        <ButtonManagementSections
          onClick={() => setShowCommercials(!showCommercials)}
          text="Liste des commerciaux"
        >
          {showCommercials && (
            <CommercialSection user={user} admin={admin} commercials={commercials} />
          )}
        </ButtonManagementSections>
      </div>
    </>
  )
}
