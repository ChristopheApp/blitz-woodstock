import MainSectionAdmin from "./MainSectionAdmin"
import styles from "src/woodstock/styles/common.module.css"
import StockSection from "src/woodstock/components/stocks/StockSection"
import OrderSection from "../orders/OrderSection"

interface Props {
  currentUserInfos: any
}

export default function MainSection({ currentUserInfos }: Props) {
  const { user, admin, salesreps, orders, suppliers, customers, isAdmin } = currentUserInfos

  return (
    <>
      <div className={styles.sectionContainer}>
        <div className={styles.rightSection}>
          <StockSection admin={admin} />
          {isAdmin && <MainSectionAdmin currentUserInfos={currentUserInfos} />}
        </div>
        <div className={styles.rightSection}>
          <OrderSection customers={customers} user={user} admin={admin} />

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
