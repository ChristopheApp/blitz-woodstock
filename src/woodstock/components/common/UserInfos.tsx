import { useCurrentUser, useUserAdmin, useUserCommercials } from "src/users/hooks/useCurrentUser"
import styles from "src/styles/Home.module.css"
import { useMutation } from "@blitzjs/rpc"
import logout from "src/auth/mutations/logout"
import AddCommercialForm from "src/woodstock/components/commercials/AddCommercialForm"
import CommercialsList from "src/woodstock/components/commercials/CommercialsList"
import CommercialSection from "../commercials/CommercialSection"
import CommandSection from "../commands/CommandSection"
import StockSection from "../stocks/StockSection"
import BuyerSection from "../buyers/BuyerSection"
import SupplierSection from "../suppliers/SupplierSection"
import MainSection from "./MainSection"

const UserInfos = () => {
  const currentUserInfo = useCurrentUser()
  console.log("Current user info : ", currentUserInfo)
  const [logoutMutation] = useMutation(logout)

  if (currentUserInfo && currentUserInfo.admin) {
    return (
      <>
        <MainSection currentUserInfos={currentUserInfo} />
      </>
    )
  } else {
    return <></>
  }
}

export default UserInfos
