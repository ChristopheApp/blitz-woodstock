import { useState } from "react"
import styles from "src/woodstock/styles/common.module.css"
import MainSectionAdmin from "./MainSectionAdmin"
import MainSectionCommercial from "./MainSectionCommercial"
import stylesCommon from "src/woodstock/styles/common.module.css"
import { User, Wood } from "db"
import StockSection from "src/woodstock/components/stocks/StockSection"
import CommercialSection from "../commercials/CommercialSection"
import CommandSection from "../commands/CommandSection"
import BuyerSection from "../buyers/BuyerSection"
import SupplierSection from "../suppliers/SupplierSection"
import ButtonManagementSections from "./ButtonManagementSections"

interface Props {
  currentUserInfos: any
  adminMode: boolean
}

export default function MainSection({ currentUserInfos, adminMode }: Props) {
  const { user, admin, commercials, commands, stocks, suppliers, buyers } = currentUserInfos

  const [isAdmin, setIsAdmin] = useState(true)

  return (
    <>
      <h1 className={styles.title}>Woodstock</h1>
      <div className={stylesCommon.sectionContainer}>
        <StockSection stocks={stocks} user={user} admin={admin} />

        <div className={stylesCommon.rightSection}>
          <CommandSection commands={commands} user={user} admin={admin} />

          {isAdmin ? (
            <MainSectionAdmin currentUserInfos={currentUserInfos} />
          ) : (
            <MainSectionCommercial currentUserInfos={currentUserInfos} />
          )}
        </div>
      </div>
    </>
  )
}
