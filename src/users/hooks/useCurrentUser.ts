import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "src/users/queries/getCurrentUser"
import getAdmin from "src/users/queries/getAdmin"
import getCommercials from "src/users/queries/getCommercials"

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null)
  return user
}

export const useUserAdmin = (userId) => {
  const [admin] = useQuery(getAdmin, userId)
  return admin
}

export const useUserCommercials = (userId) => {
  const [commercials] = useQuery(getCommercials, userId)
  return commercials
}
