import { useState, useEffect } from "react"
import MainSectionAdmin from "./MainSectionAdmin"
import MainSectionCommercial from "./MainSectionCommercial"
import stylesCommon from "src/woodstock/styles/common.module.css"
import { User, Wood } from "db"
import StockSection from "src/woodstock/components/stocks/StockSection"
import CommandSection from "../commands/CommandSection"
import TableList from "src/woodstock/components/commands/TableList"
import type Stocks from "src/woodstock/types/stocks"
import getAllValidCommands from "src/woodstock/mutations/commands/getAllValidCommands"
import createStocks from "src/woodstock/utils/createStocks"

interface Props {
  currentUserInfos: any
  adminMode: boolean
}

export default function MainSection({ currentUserInfos, adminMode }: Props) {
  const { user, admin, commercials, commands, suppliers, buyers } = currentUserInfos

  const [isAdmin, setIsAdmin] = useState(true)

  return (
    <>
      <div className={stylesCommon.sectionContainer}>
        <StockSection admin={admin} />

        <div className={stylesCommon.rightSection}>
          <CommandSection buyers={buyers} commands={commands} user={user} admin={admin} />

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
