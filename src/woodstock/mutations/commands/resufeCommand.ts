import db from "db"

export default async function refuseCommand(id: string) {
  const command = await db.command.update({
    where: { id },
    data: { status: "REFUSED" },
  })
  return command
}
