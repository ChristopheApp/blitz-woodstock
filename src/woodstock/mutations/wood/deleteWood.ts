import db from "db"

export default async function deleteWood(id: string) {
  const wood = await db.wood.delete({
    where: { id: id },
  })
  return wood
}
