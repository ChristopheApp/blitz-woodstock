import styles from "src/styles/Home.module.css"
import { User, Wood } from "@prisma/client"

interface Props {
  stocks?: Wood[]
  user: User | null
  admin: User | null
}

export default function StockSection({ stocks, user, admin }: Props) {
  return (
    <section className={styles.sections}>
      <h2>Stocks</h2>
    </section>
  )
}
