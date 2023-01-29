import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import styles from "src/woodstock/styles/common.module.css"
import { Wood, Supplier, User } from "@prisma/client"
import newPurchaseOrder from "src/woodstock/mutations/order/newPurchaseOrder"

type ProjectFormValues = FieldValues

interface Props {
  admin: User
  woods: (Wood & {
    supplier: Supplier | null
  })[]
}

export default function FormBuyWood({ woods, admin }: Props) {
  const [selectedWood, setSelectedWood] = useState(woods[0])

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>()

  const watchQuantity = watch("quantity", 0)

  const submitHandler = async (data: any) => {
    const result = await newPurchaseOrder({
      quantity: parseInt(data.quantity),
      unitPrice: selectedWood?.unitPrice,
      woodType: selectedWood?.type,
      adminId: admin.id,
      orderType: "PURCHASE",
      supplierId: selectedWood?.supplierId,
      woodId: selectedWood?.id,
    })
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = woods.find((w) => w.id === event.target.value)
    setSelectedWood(selectedOption)
  }

  if (woods.length > 0) {
    return (
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <label>Type de bois</label>
        <select
          required
          className=""
          id="wood"
          defaultValue={""}
          {...register("wood")}
          onChange={handleSelectChange}
        >
          {woods.map((wood) => (
            <option key={wood.id} style={{ color: "black" }} value={wood.id}>
              {wood.type} - {wood.unitPrice}€/m³ - Max {wood.quantityPurchased}m³
            </option>
          ))}
        </select>
        <label className={styles.description}>
          Vendu par <strong>{selectedWood?.supplier?.name}</strong>
        </label>
        <label>Quantité</label>
        <input
          required
          id="quantity"
          type="number"
          placeholder={"max " + selectedWood?.quantityPurchased}
          {...register("quantity")}
          min={1}
          max={selectedWood?.quantityPurchased}
        />
        <label>Prix total : {watchQuantity * (selectedWood?.unitPrice || 0)}€</label>
        <button type="submit">Commander</button>
      </form>
    )
  } else {
    return <h3 className={styles.description}>Aucun bois disponible</h3>
  }
}
