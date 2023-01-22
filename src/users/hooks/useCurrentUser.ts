import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "src/users/queries/getCurrentUser"
import getAdmin from "src/users/queries/getAdmin"
import getCommercials from "src/users/queries/getCommercials"

export const useCurrentUser = () => {
  const [userInfo] = useQuery(getCurrentUser, null)
  return userInfo
}

export const useUserAdmin = (userId) => {
  const [admin] = useQuery(getAdmin, userId)
  return admin
}

export const useUserCommercials = (userId) => {
  const [commercials] = useQuery(getCommercials, userId)
  return commercials
}
