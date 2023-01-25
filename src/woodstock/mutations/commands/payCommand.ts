import db from "db"

export default async function payCommand(id: string) {
  const command = await db.command.update({
    where: { id },
    data: { status: "PAID" },
  })
  return command
}
