import { useState } from "react"
import MainSectionAdmin from "./MainSectionAdmin"
import MainSectionCommercial from "./MainSectionCommercial"
import stylesCommon from "src/woodstock/styles/common.module.css"
import { User, Wood } from "db"
import StockSection from "src/woodstock/components/stocks/StockSection"
import CommandSection from "../commands/CommandSection"
import TableList from "src/woodstock/components/commands/TableList"

interface Props {
  currentUserInfos: any
  adminMode: boolean
}

export default function MainSection({ currentUserInfos, adminMode }: Props) {
  const { user, admin, commercials, commands, stocks, suppliers, buyers } = currentUserInfos

  const [isAdmin, setIsAdmin] = useState(true)

  return (
    <>
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
      <TableList commands={commands} />
    </>
  )
}
