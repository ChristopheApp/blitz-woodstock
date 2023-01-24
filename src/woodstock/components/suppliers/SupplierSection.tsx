import { useEffect, useState } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User, Supplier, Wood } from "@prisma/client"
import UserSuppliersList from "./UserSuppliersList"
import MoreSuppliersList from "./MoreSuppliersList"
import getNotAdminSuppliers from "src/woodstock/suppliers/queries/getNotAdminSuppliers"
import getAdminSuppliers from "src/woodstock/suppliers/queries/getAdminSuppliers"

interface Props {
  admin: User
}

export default function SupplierSection({ admin }: Props) {
  const [userSuppliers, setUserSuppliers] = useState<(Supplier & { stock: Wood[] })[]>([])
  const [moreSuppliers, setMoreSuppliers] = useState<(Supplier & { stock: Wood[] })[]>([])
  const [displayNewSuppliers, setDisplayNewSuppliers] = useState<boolean>(false)

  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliers = await getAdminSuppliers(admin.id)
      setUserSuppliers(suppliers)
    }
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    if (!displayNewSuppliers) {
      const newSuppliers = await getNotAdminSuppliers(admin.id)
      setMoreSuppliers(newSuppliers)
      console.log("new suppliers")
      console.log(newSuppliers)
    }
    setDisplayNewSuppliers(!displayNewSuppliers)
    // newSuppliers.forEach(element => {

    // });
  }

  return (
    <section className={styles.managementSubMenu}>
      {userSuppliers.length <= 0 ? (
        <h3>Vous n'avez pas de fournisseur</h3>
      ) : (
        <UserSuppliersList admin={admin} suppliers={userSuppliers} />
      )}

      <button onClick={fetchSuppliers}>
        {displayNewSuppliers ? "Masquer les fournisseurs" : "Afficher plus de fournisseurs"}
      </button>

      {displayNewSuppliers && <MoreSuppliersList admin={admin} moreSuppliers={moreSuppliers} />}
    </section>
  )
}
