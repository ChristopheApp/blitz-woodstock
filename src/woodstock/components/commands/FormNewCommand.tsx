import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import styles from "src/woodstock/styles/common.module.css"
import addCommercial from "../../mutations/addCommercial"
import { AddCommercial } from "../../validations"
import { useMutation } from "@blitzjs/rpc"
import { Wood, Supplier, User } from "@prisma/client"
import newCommand from "src/woodstock/mutations/commands/newCommand"
import { addMinutes } from "blitz"

type ProjectFormValues = FieldValues

interface Props {
  admin: User
  woods: (Wood & {
    supplier: Supplier | null
  })[]
}

export default function FormNewCommand({ woods, admin }: Props) {
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
    const result = await newCommand({
      quantity: parseInt(data.quantity),
      wood: selectedWood,
      adminId: admin.id,
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
      <h3>Acheter du bois</h3>
      <label>Type de bois</label>
      <select
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
