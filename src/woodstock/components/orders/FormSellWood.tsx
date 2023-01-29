import React, { useState, useEffect } from "react"
import { FieldValues, useForm } from "react-hook-form"
import styles from "src/woodstock/styles/common.module.css"
import { User, Wood, Customer } from "@prisma/client"
import newSaleCommand from "src/woodstock/mutations/order/newSaleOrder"
import getUserStock from "../../wood/queries/getUserStock"

type ProjectFormValues = FieldValues

interface Props {
  admin: User
  customers: Customer[]
}

export default function FormSellWood({ admin, customers }: Props) {
  const [stocks, setStocks] = useState<Wood[]>([])
  const [selectedWood, setSelectedWood] = useState<Wood>()

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {
    const result = await getUserStock(admin.id)
    const stock = result?.stock

    if (stock) {
      setStocks(stock)
      setSelectedWood(stock[0])
    }
  }
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>()

  const watchQuantity = watch("quantity", 0)
  const watchPrice = watch("price", 0)

  const submitHandler = async (data: any) => {
    const result = await newSaleCommand({
      quantity: parseInt(data.quantity),
      unitPrice: parseInt(data.price),
      woodType: data.wood,
      adminId: admin.id,
      orderType: "SALE",
      customerId: data.customer,
    })
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = stocks.find((w) => w.type === event.target.value)
    setSelectedWood(selectedOption)
  }

  if (selectedWood && customers.length > 0) {
    return (
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <label>Type de bois</label>
        <select
          required
          className=""
          id="wood"
          defaultValue={selectedWood?.type}
          {...register("wood")}
          onChange={handleSelectChange}
        >
          {stocks.map((stock) => (
            <option key={stock.type} style={{ color: "black" }} value={stock.type}>
              {stock.type} - Prix d'achat moyen :{" "}
              {Math.ceil(stock.totalPurchasedPrice / stock.quantityPurchased)} €/m³
            </option>
          ))}
        </select>
        <div className={styles.formWrapperInputs}>
          <div className={styles.formInputs}>
            <label>Quantité (m³)</label>
            <input
              required
              id="quantity"
              type="number"
              placeholder={"max " + (selectedWood.quantityPurchased - selectedWood.quantitySold)}
              {...register("quantity")}
              min={1}
              max={selectedWood.quantityPurchased - selectedWood.quantitySold}
            />
          </div>

          <div className={styles.formInputs}>
            <label>Prix de vente (€/m³)</label>
            <input
              required
              id="price"
              type="number"
              placeholder={
                "min " +
                Math.ceil(selectedWood.totalPurchasedPrice / selectedWood.quantityPurchased)
              }
              {...register("price")}
              min={Math.ceil(selectedWood.totalPurchasedPrice / selectedWood.quantityPurchased)}
            />
          </div>
        </div>

        <label>Prix total : {watchQuantity * watchPrice} €</label>
        <label>Sélectionner un acheteur</label>
        <select required className="" id="customer" defaultValue={""} {...register("customer")}>
          {customers.map((customer) => (
            <option key={customer.id} style={{ color: "black" }} value={customer.id}>
              {customer.firstname} {customer.lastname}{" "}
              {customer.company && ` - ${customer.company}`}
            </option>
          ))}
        </select>
        <button type="submit">Créer un devis</button>
      </form>
    )
  } else {
    return (
      <>
        {customers.length === 0 ? <div>Vous n'avez pas de client.</div> : <div>Chargement...</div>}
      </>
    )
  }
}
