import db from "db"

export default async function getActivesCommands(id: string) {
  const commands = await db.command.findMany({
    where: {
      NOT: {
        OR: [{ status: "REFUSED" }, { status: "CANCELED" }],
      },
    },
  })
  console.log(commands)
  return commands
}
