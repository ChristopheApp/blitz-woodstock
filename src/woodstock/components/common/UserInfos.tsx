import MainSection from "./MainSection"

type Props = {
  userInfos: any
}

const UserInfos = (props: Props) => {
  const currentUserInfo = props.userInfos
  console.log("Current user info : ", currentUserInfo)

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
