export default function formatCommandStatus(status: string) {
  switch (status) {
    case "CREATED":
      return "Créée"
    case "ACCEPTED":
      return "Validée"
    case "DELIVERED":
      return "Livrée"
    case "PAID":
      return "Payée"
    case "CANCELED":
      return "Annulée"
    case "REFUSED":
      return "Refusée"
    default:
      return "Statut de commande inconnu"
  }
}
