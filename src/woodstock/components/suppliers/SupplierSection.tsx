import { useEffect, useState } from "react"
import styles from "src/styles/Home.module.css"
import { User, Supplier, Wood } from "@prisma/client"
import UserSuppliersList from "./UserSuppliersList"
import getAllSuppliers from "src/woodstock/suppliers/queries/getSuppliers"
import addSupplierToAdmin from "src/woodstock/mutations/addSupplierToAdmin"
import MoreSuppliersList from "./MoreSuppliersList"
import getNotAdminSuppliers from "src/woodstock/suppliers/queries/getNotAdminSuppliers"
import getAdminSuppliers from "src/woodstock/suppliers/queries/getAdminSuppliers"

interface Props {
  suppliers: Supplier[]
  user: User | null
  admin: User
}

export default function SupplierSection({ suppliers, user, admin }: Props) {
  console.log(suppliers)

  const [userSuppliers, setUserSuppliers] = useState<(Supplier & { stock: Wood[] })[]>()
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
      {!userSuppliers ? (
        <h3>Vous navez pas de fournisseur</h3>
      ) : (
        <UserSuppliersList admin={admin} suppliers={userSuppliers} />
      )}

      <button onClick={fetchSuppliers}>
        {displayNewSuppliers ? "Masquer les fournisseurs" : "Afficher plus de fournisseurs"}
      </button>

      {displayNewSuppliers && (
        <MoreSuppliersList admin={admin} suppliers={suppliers} moreSuppliers={moreSuppliers} />
      )}
    </section>
  )
}
