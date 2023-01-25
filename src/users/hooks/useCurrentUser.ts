import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "src/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  const [userInfo] = useQuery(getCurrentUser, null)
  return userInfo
}
