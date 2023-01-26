import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import styles from "src/woodstock/styles/common.module.css"
import { Wood, Supplier, User } from "@prisma/client"
import newBuyCommand from "src/woodstock/mutations/commands/newBuyCommand"

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
    const adminId = admin.id
    console.log(watchQuantity)
    console.log(data)
    const result = await newBuyCommand({
      quantity: parseInt(data.quantity),
      wood: selectedWood,
      adminId: admin.id,
      type: "PURCHASE",
    })
    console.log(result)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = woods.find((w) => w.id === event.target.value)
    console.log(selectedOption)
    setSelectedWood(selectedOption)
  }

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
            {wood.type} - {wood.price}€/m³ - Max {wood.quantity}m³
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
        placeholder={"max " + selectedWood?.quantity}
        {...register("quantity")}
        min={1}
        max={selectedWood?.quantity}
      />
      <label>Prix total : {watchQuantity * selectedWood?.price}€</label>
      <button type="submit">Commander</button>
    </form>
  )
}
