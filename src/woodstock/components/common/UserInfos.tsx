import React, { useState, useEffect } from "react"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import logout from "src/auth/mutations/logout"
import MainSection from "./MainSection"

const UserInfos = ({ currentUserInfo }) => {
  const [userInfos, setUserInfos] = useState(currentUserInfo)

  // const currentUserInfo = useCurrentUser()
  console.log("Current user info : ", currentUserInfo)
  const [logoutMutation] = useMutation(logout)

  // useEffect(() => {
  //   const userinfo = useCurrentUser()
  // }, [])

  if (currentUserInfo && currentUserInfo.user && currentUserInfo.admin) {
    let adminMode = false

    if (currentUserInfo.user.role === "ADMIN") adminMode = true

    return (
      <>
        <MainSection adminMode={adminMode} currentUserInfos={currentUserInfo} />
      </>
    )
  } else {
    return <></>
  }
}

export default UserInfos
