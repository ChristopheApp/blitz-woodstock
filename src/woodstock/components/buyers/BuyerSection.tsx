import styles from "src/styles/Home.module.css"
import { User, Buyer } from "@prisma/client"

interface Props {
  buyers?: Buyer[]
  user: User | null
  admin: User | null
}

export default function BuyerSection({ buyers, user, admin }: Props) {
  return (
    <section className={styles.sections}>
      <h2>Mes clients</h2>
    </section>
  )
}
