export default function formatCommandType(status: string) {
  switch (status) {
    case "PURCHASE":
      return "Achat"
    case "SALE":
      return "Vente"
    default:
      return "Type de commande inconnu"
  }
}
