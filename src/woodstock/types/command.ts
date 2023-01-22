import UserInfos from "./UserInfos"
import Wood from "./wood"

interface Command {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  user: UserInfos
  wood: Wood
  quantity: number
  price: number
  status: string
}

export default Command
