// Randomly generate a buyer object
// List of buyers
const buyers = [
  { firstname: "John", lastname: "Doe", company: "Acme Inc." },
  { firstname: "Jane", lastname: "Smith", company: "Beta Corp." },
  { firstname: "Bob", lastname: "Johnson" },
  { firstname: "Amy", lastname: "Williams" },
  { firstname: "Michael", lastname: "Brown", company: "Gotaga Inc." },
  { firstname: "Emily", lastname: "Jones" },
  { firstname: "Matthew", lastname: "Miller", company: "Karmine Corp." },
  { firstname: "Lauren", lastname: "Davis" },
  { firstname: "Joshua", lastname: "Garcia" },
  { firstname: "Ashley", lastname: "Rodriguez", company: "Solary Inc." },
  { firstname: "Andrew", lastname: "Martinez" },
  { firstname: "Brian", lastname: "Hernandez", company: "Rogue Inc." },
  { firstname: "Brandon", lastname: "Lopez" },
  { firstname: "Emily", lastname: "Gonzalez" },
  { firstname: "Matthew", lastname: "Wilson", company: "G2 Inc." },
  { firstname: "Lauren", lastname: "Anderson" },
  { firstname: "Joshua", lastname: "Thomas" },
  { firstname: "Ashley", lastname: "Jackson", company: "Fnatic Inc." },
  { firstname: "Andrew", lastname: "White" },
  { firstname: "Brian", lastname: "Harris" },
  { firstname: "Brandon", lastname: "Martin" },
  { firstname: "Emily", lastname: "Thompson", company: "Aegis Corp." },
  { firstname: "Matthew", lastname: "Garcia", company: "Kinay Corp." },
  { firstname: "Lauren", lastname: "Martinez", company: "Skill Corp." },
  { firstname: "Joshua", lastname: "Robinson" },
  { firstname: "Ashley", lastname: "Clark" },
  { firstname: "Andrew", lastname: "Rodriguez" },
  { firstname: "Brian", lastname: "Lewis" },
  { firstname: "Brandon", lastname: "Lee" },
  { firstname: "Emily", lastname: "Walker" },
  { firstname: "Matthew", lastname: "Hall", company: "Madlions Corp." },
  { firstname: "Lauren", lastname: "Allen" },
  { firstname: "Joshua", lastname: "Young" },
  { firstname: "Ashley", lastname: "Hernandez" },
  { firstname: "Andrew", lastname: "King" },
  { firstname: "Brian", lastname: "Wright" },
  { firstname: "Brandon", lastname: "Lopez" },
]

export default function randomBuyer() {
  let buyer: any
  do {
    const index = Math.floor(Math.random() * buyers.length)
    buyer = buyers[index] || ""
  } while (!buyer)

  // const buyer = buyers[Math.floor(Math.random() * buyers.length)]
  const result = {
    firstname: buyer.firstname,
    lastname: buyer.lastname,
    company: buyer?.company,
    email: `randomemail@buyer.com`,
    phone: `9876543210`,
    // stock: [],
  }
  return result
}
