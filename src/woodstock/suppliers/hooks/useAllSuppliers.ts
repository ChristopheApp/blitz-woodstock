import { useQuery } from "@blitzjs/rpc"
import getSuppliers from "src/woodstock/suppliers/queries/getSuppliers"

export const useAllSuppliers = () => {
  const [suppliers] = useQuery(getSuppliers, null)
  return suppliers
}
