import styles from "src/styles/Home.module.css"
import MainSectionAdmin from "./MainSectionAdmin"
import MainSectionCommercial from "./MainSectionCommercial"

interface Props {
  currentUserInfos: any
}

export default function MainSection({ currentUserInfos }: Props) {
  if (currentUserInfos.user.role === "ADMIN") {
    return (
      <>
        <h1 className={styles.title}>Woodstock</h1>

        <MainSectionAdmin currentUserInfos={currentUserInfos} />
      </>
    )
  } else {
    return (
      <>
        <h1 className={styles.title}>Woodstock</h1>

        <MainSectionCommercial currentUserInfos={currentUserInfos} />
      </>
    )
  }
}
