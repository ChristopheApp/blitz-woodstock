import { Supplier } from "@prisma/client"

interface Props {
  suppliers: Supplier[]
}

export default function SuppliersList({ suppliers }: Props) {
  return (
    <div>
      <h3>Mes fournisseurs</h3>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
