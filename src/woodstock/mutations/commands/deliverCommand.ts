import db from "db"

export default async function deliverCommand(id: string) {
  const command = await db.command.update({
    where: { id },
    data: { status: "DELIVERED" },
  })

  // Change stocks

  return command
}
