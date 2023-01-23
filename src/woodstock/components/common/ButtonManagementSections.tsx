import styles from "src/styles/Home.module.css"
interface Props {
  children?: React.ReactNode
  onClick: () => void
  text: string
}
export default function ButtonManagementSections({ onClick, text, children }: Props) {
  return (
    <>
      <button className={styles.buttonManagement} onClick={onClick}>
        <p className={styles.textManagement}>{text}</p>
      </button>
      {children}
    </>
  )
}
