import db from "db"
import randomBuyer from "../../utils/randomBuyer"

export default async function generateBuyers() {
  const maxBuyers = Math.floor(Math.random() * (9 - 3) + 3)
  let buyers: any = []

  for (let i = 0; i < maxBuyers; i++) {
    const data = randomBuyer()
    const buyer = await db.buyer.upsert({
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
    buyers.push(buyer)
  }
  return buyers
}
