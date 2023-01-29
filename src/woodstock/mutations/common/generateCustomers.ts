import db from "db"
import randomBuyer from "../../utils/randomCustomer"

export default async function generateCustomers() {
  const maxCustomers = Math.floor(Math.random() * (9 - 3) + 3)
  let customers: any = []

  for (let i = 0; i < maxCustomers; i++) {
    const data = randomBuyer()
    const customer = await db.customer.upsert({
      where: {
        firstname_lastname: { firstname: data.firstname, lastname: data.lastname },
      },
      update: { company: data?.company },
      create: {
        firstname: data.firstname,
        lastname: data.lastname,
        company: data?.company,
        email: data.email,
        phone: data.phone,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        company: true,
      },
    })
    customers.push(customer)
  }
  return customers
}
