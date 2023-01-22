import Command from "./command"
import UserInfos from "./UserInfos"

interface Wood {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  commands: Command[]
  stocks: Wood[]
  suppliers: UserInfos[]
  buyers: UserInfos[]
}

export default Wood
