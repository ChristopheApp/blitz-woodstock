import styles from "src/woodstock/styles/common.module.css"
import { User, Command } from "@prisma/client"

interface Props {
  commands: Command[]
  user: User | null
  admin: User | null
}

export default function CommandlSection({ commands, user, admin }: Props) {
  return (
    <section className={styles.managementSection}>
      <h2 className={styles.managementTitle}>commandes</h2>
    </section>
  )
}
