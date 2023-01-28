import db from "db"

export default async function deleteAllCustomers() {
  const buyer = await db.customer.deleteMany({})

  return buyer
}
