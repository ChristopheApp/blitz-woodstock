import Command from "./command"
import Wood from "./wood"
import Buyer from "./buyer"
import Supplier from "./supplier"
import User from "db"

interface UserInfos {
  id: string
  name?: string
  email: string
  role: string
  adminId: string
  createdAt: Date
  updatedAt: Date
  commercials: UserInfos[]
  commands: Command[]
  stocks: Wood[]
  suppliers: Supplier[]
  buyers: Buyer[]
}

export default UserInfos
