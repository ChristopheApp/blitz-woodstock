import MainSection from "./MainSection"

type Props = {
  userInfos: any
}

const UserInfos = (props: Props) => {
  const currentUserInfo = props.userInfos
  console.log("Current user info : ", currentUserInfo)

  if (currentUserInfo && currentUserInfo.user && currentUserInfo.admin) {
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
