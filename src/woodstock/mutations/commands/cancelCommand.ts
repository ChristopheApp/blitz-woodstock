import db from "db"

export default async function cancelCommand(id: string) {
  const command = await db.command.update({
    where: { id },
    data: { status: "CANCELED" },
  })

  // If status was delivered, need to rechange stocks

  return command
}
