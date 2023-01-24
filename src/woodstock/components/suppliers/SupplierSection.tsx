import { useState } from "react"
import styles from "src/styles/Home.module.css"
import { User, Supplier } from "@prisma/client"
import UserSuppliersList from "./UserSuppliersList"
import getAllSuppliers from "src/woodstock/suppliers/queries/getSuppliers"
import addSupplierToAdmin from "src/woodstock/mutations/addSupplierToAdmin"
import SuppliersList from "./SuppliersList"

interface Props {
  suppliers: Supplier[]
  user: User | null
  admin: User
}

export default function SupplierSection({ suppliers, user, admin }: Props) {
  console.log(suppliers)
  const [userSuppliers, setUserSuppliers] = useState<Supplier[]>(suppliers)
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([])
  const [displayNewSuppliers, setDisplayNewSuppliers] = useState<boolean>(false)

  const fetchSuppliers = async () => {
    if (!displayNewSuppliers) {
      const newSuppliers = await getAllSuppliers()
      setAllSuppliers(newSuppliers)
      console.log(newSuppliers)
    }
    setDisplayNewSuppliers(!displayNewSuppliers)
    // newSuppliers.forEach(element => {

    // });
  }

  const addSupplier = async (supplier: Supplier) => {
    const adminId = admin.id
    const result = await addSupplierToAdmin({ supplier, adminId })
    setUserSuppliers(result.suppliers)
  }

  return (
    <section className={styles.managementSubMenu}>
      {userSuppliers.length === 0 ? (
        <h3>Vous navez pas de fournisseur</h3>
      ) : (
        <UserSuppliersList admin={admin} suppliers={userSuppliers} />
      )}

      <button onClick={fetchSuppliers}>
        {displayNewSuppliers ? "Masquer les fournisseurs" : "Afficher plus de fournisseurs"}
      </button>

      {displayNewSuppliers && (
        <SuppliersList admin={admin} suppliers={suppliers} allSuppliers={allSuppliers} />
      )}
    </section>
  )
}
