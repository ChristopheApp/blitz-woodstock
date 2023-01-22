import { User } from "@prisma/client"

interface Props {
  commercials: User[]
}

export default function CommercialsList({ commercials }: Props) {
  return (
    <div>
      <h1>Commercials</h1>
      <ul>
        {commercials.map((commercial) => (
          <li key={commercial.id}>
            {commercial.name} - {commercial.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
