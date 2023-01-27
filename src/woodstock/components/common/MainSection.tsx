import { useState } from "react"
import MainSectionAdmin from "./MainSectionAdmin"
import MainSectionCommercial from "./MainSectionCommercial"
import stylesCommon from "src/woodstock/styles/common.module.css"
import StockSection from "src/woodstock/components/stocks/StockSection"
import CommandSection from "../commands/CommandSection"

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
        <div className={stylesCommon.rightSection}>
          <StockSection admin={admin} />
          {isAdmin && <MainSectionAdmin currentUserInfos={currentUserInfos} />}
        </div>
        <div className={stylesCommon.rightSection}>
          <CommandSection buyers={buyers} commands={commands} user={user} admin={admin} />

          {/* {isAdmin ? (
            <MainSectionAdmin currentUserInfos={currentUserInfos} />
          ) : (
            <MainSectionCommercial currentUserInfos={currentUserInfos} />
          )} */}
        </div>
      </div>
    </>
  )
}
