import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "src/users/queries/getCurrentUser"
import getSuppliers from "src/woodstock/suppliers/queries/getSuppliers"

import getAdmin from "src/users/queries/getAdmin"
import getCommercials from "src/users/queries/getCommercials"

export const useAllSuppliers = () => {
  const [suppliers] = useQuery(getSuppliers, null)
  return suppliers
}
