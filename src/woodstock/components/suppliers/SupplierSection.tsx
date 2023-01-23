import { useState } from "react"
import styles from "src/styles/Home.module.css"
import { User, Supplier } from "@prisma/client"
import SuppliersList from "./SuppliersList"
import getAllSuppliers from "src/woodstock/suppliers/queries/getSuppliers"
import addSupplierToAdmin from "src/woodstock/mutations/addSupplierToAdmin"

interface Props {
  suppliers: Supplier[]
  user: User | null
  admin: User
}

export default function SupplierSection({ suppliers, user, admin }: Props) {
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([])

  if (suppliers) {
    console.log("suppliers exist")

    if (suppliers.length === 0) {
      console.log("aucun suppliers")
    }
  }

  const fetchSuppliers = async () => {
    const newSuppliers = await getAllSuppliers()
    console.log(newSuppliers)
    setAllSuppliers(newSuppliers)
    // newSuppliers.forEach(element => {

    // });
  }

  const addSupplier = async (supplier: Supplier) => {
    console.log(supplier)
    const adminId = admin.id
    const result = await addSupplierToAdmin({ supplier, adminId })
    console.log(result)
  }

  return (
    <section className={styles.managementSubMenu}>
      {suppliers.length === 0 ? (
        <h3>Vous n'avez pas de fournisseur</h3>
      ) : (
        <SuppliersList suppliers={suppliers} />
      )}

      <button onClick={fetchSuppliers}>Ajouter des fournisseurs</button>

      {allSuppliers.length > 0 &&
        allSuppliers.map((supplier) => (
          <div onClick={() => addSupplier(supplier)} key={supplier.id}>
            <p>{supplier.name}</p>
            <p>{supplier.email}</p>
          </div>
        ))}
    </section>
  )
}
