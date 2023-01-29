import db from "db"

export default async function decSupplierWood(data: any) {
  const { quantity, supplierId, woodId } = data

  const supplier = await db.supplier.update({
    where: { id: supplierId },
    data: {
      stock: {
        update: {
          where: { id: woodId },
          data: {
            quantityPurchased: { decrement: quantity },
          },
        },
      },
    },
    include: { stock: true },
  })

  return supplier
}
