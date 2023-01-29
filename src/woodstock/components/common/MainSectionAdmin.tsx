import { useState } from "react"
import stylesCommon from "src/woodstock/styles/common.module.css"
import { User, Wood } from "db"
import CommercialSection from "../salesreps/SalesrepSection"
import CustomerSection from "../customer/CustomerSection"
import SupplierSection from "../suppliers/SupplierSection"
import ButtonManagementSections from "./ButtonManagementSections"

interface Props {
  currentUserInfos: any
  user?: User | null
  admin?: User | null
  stocks?: Wood[]
}

export default function MainSection({ currentUserInfos }: Props) {
  const { user, admin, salesreps, orders, stocks, suppliers, customers } = currentUserInfos

  const [showSuppliers, setShowSuppliers] = useState(false)
  const [showCustomers, setShowCustomers] = useState(false)
  const [showOrders, setShowOrders] = useState(false)
  const [showSalesreps, setShowSalesreps] = useState(false)

  return (
    <>
      <div className={stylesCommon.managementSection}>
        <h2>Administration</h2>
        <ButtonManagementSections
          onClick={() => setShowSuppliers(!showSuppliers)}
          text="Liste des fournisseurs"
        />
        {showSuppliers && <SupplierSection admin={admin} />}

        <ButtonManagementSections
          onClick={() => setShowCustomers(!showCustomers)}
          text="Liste des clients"
        />
        {showCustomers && <CustomerSection admin={admin} customers={customers} />}

        {/* <ButtonManagementSections
          onClick={() => setShowOrders(!showOrders)}
          text="Liste des orderes"
        /> */}
        {/* {showOrders && <OrderSection user={user} admin={admin} />} */}

        <ButtonManagementSections
          onClick={() => setShowSalesreps(!showSalesreps)}
          text="Liste des commerciaux"
        >
          {showSalesreps && <CommercialSection user={user} admin={admin} salesreps={salesreps} />}
        </ButtonManagementSections>
      </div>
    </>
  )
}
