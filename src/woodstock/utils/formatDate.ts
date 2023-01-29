export default function formatDate(date: Date): string {
  let day = date.getDate()
  let month = date.getMonth() + 1 // January is 0
  let year = date.getFullYear()

  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
}
