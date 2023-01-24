import { useState } from "react"
import styles from "src/woodstock/styles/common.module.css"
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

  return <></>
}
