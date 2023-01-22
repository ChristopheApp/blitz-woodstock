import styles from "src/styles/Home.module.css"
import { User, Command } from "@prisma/client"

interface Props {
  commands?: Command[]
  user: User | null
  admin: User | null
}

export default function CommandlSection({ commands, user, admin }: Props) {
  return (
    <section className={styles.sections}>
      <h2>commandes</h2>
    </section>
  )
}
