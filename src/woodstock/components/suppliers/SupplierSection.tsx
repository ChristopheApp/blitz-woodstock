import styles from "src/styles/Home.module.css"
import { User, Supplier } from "@prisma/client"

interface Props {
  suppliers?: Supplier[]
  user: User | null
  admin: User | null
}

export default function SupplierSection({ suppliers, user, admin }: Props) {
  return (
    <section className={styles.sections}>
      <h2>Mes fournisseur</h2>
    </section>
  )
}
