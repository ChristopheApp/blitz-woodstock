import db from "db"

export default async function acceptCommand(id: string) {
  const command = await db.command.update({
    where: { id },
    data: { status: "ACCEPTED" },
  })
  return command
}
