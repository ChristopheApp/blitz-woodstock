import { useEffect, useState } from "react"
import styles from "src/woodstock/styles/common.module.css"
import { User, Supplier, Wood } from "@prisma/client"
import UserSuppliersList from "./UserSuppliersList"
import MoreSuppliersList from "./MoreSuppliersList"
import getNotAdminSuppliers from "src/woodstock/suppliers/queries/getNotAdminSuppliers"
import getAdminSuppliers from "src/woodstock/suppliers/queries/getAdminSuppliers"
import addSupplierToAdmin from "src/woodstock/mutations/addSupplierToAdmin"
import removeSupplierFromAdmin from "src/woodstock/mutations/removeSupplierFromAdmin"

interface Props {
  admin: User
}

export default function SupplierSection({ admin }: Props) {
  const adminId = admin.id
  const [userSuppliers, setUserSuppliers] = useState<(Supplier & { stock: Wood[] })[]>([])
  const [moreSuppliers, setMoreSuppliers] = useState<(Supplier & { stock: Wood[] })[]>([])
  const [displayNewSuppliers, setDisplayNewSuppliers] = useState<boolean>(false)

  useEffect(() => {
    fetchUserSuppliers()
  }, [])

  const fetchUserSuppliers = async () => {
    const suppliers = await getAdminSuppliers(admin.id)
    setUserSuppliers(suppliers)
  }

  const fetchMoreSuppliers = async () => {
    if (!displayNewSuppliers) {
      const newSuppliers = await getNotAdminSuppliers(admin.id)
      setMoreSuppliers(newSuppliers)
    }
    setDisplayNewSuppliers(!displayNewSuppliers)
  }

  const addSupplier = async (supplierId: string) => {
    const result = await addSupplierToAdmin({ supplierId, adminId })
    setUserSuppliers(result.suppliers)
    fetchMoreSuppliers()
  }

  const removeSupplier = async (supplierId: string) => {
    removeSupplierFromAdmin({ supplierId, adminId }).then(fetchMoreSuppliers)
    fetchUserSuppliers()
  }

  return (
    <section className={styles.managementSubMenu}>
      {userSuppliers.length <= 0 ? (
        <h3>Vous n'avez pas de fournisseur</h3>
      ) : (
        <UserSuppliersList
          handleRemoveSupplier={removeSupplier}
          admin={admin}
          suppliers={userSuppliers}
        />
      )}

      <button onClick={fetchMoreSuppliers}>
        {displayNewSuppliers ? "Masquer les fournisseurs" : "Afficher plus de fournisseurs"}
      </button>

      {displayNewSuppliers && (
        <MoreSuppliersList
          handleAddSupplier={addSupplier}
          admin={admin}
          moreSuppliers={moreSuppliers}
        />
      )}
    </section>
  )
}
