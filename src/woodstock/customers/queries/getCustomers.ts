import db from "db"

const getCustomers = async (_ = null) => {
  const customers = await db.customer.findMany()
  return customers
}
export default getCustomers
