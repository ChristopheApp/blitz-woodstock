import React, { useState, useEffect } from "react"
import { FieldValues, useForm } from "react-hook-form"
import styles from "src/woodstock/styles/common.module.css"
import { User, Wood, Supplier, Customer } from "@prisma/client"
import newSaleCommand from "src/woodstock/mutations/order/newSaleOrder"
import type Stocks from "src/woodstock/types/stocks"
import getAllValidCommands from "src/woodstock/orders/queries/getAllValidOrders"
import createStocks from "src/woodstock/utils/createStocks"

type ProjectFormValues = FieldValues

interface Props {
  admin: User
  customers: Customer[]
}

export default function FormSellWood({ admin, customers }: Props) {
  const [stocks, setStocks] = useState<Stocks[]>([])
  const [selectedWood, setSelectedWood] = useState<Stocks>()

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {
    const result = await getAllValidCommands(admin.id)
    console.log("result : ", result)

    const { purchaseCommands, saleCommands } = result

    let stocks: Stocks[] = createStocks(purchaseCommands, saleCommands)

    console.log("stocks : ", stocks)
    setStocks(stocks)
    setSelectedWood(stocks[0])
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
    console.log(data)
    const result = await newSaleCommand({
      quantity: parseInt(data.quantity),
      unitPrice: parseInt(data.price),
      wood: selectedWood,
      adminId: admin.id,
      type: "SALE",
      customerId: data.customer,
    })
    console.log(result)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = stocks.find((w) => w.woodType === event.target.value)
    console.log(selectedOption)
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
          defaultValue={selectedWood?.woodType}
          {...register("wood")}
          onChange={handleSelectChange}
        >
          {stocks.map((stock) => (
            <option key={stock.woodType} style={{ color: "black" }} value={stock.woodType}>
              {stock.woodType} - Prix d'achat moyen : {stock.avgPrice}€/m³
            </option>
          ))}
        </select>
        <div className={styles.formWrapperInputs}>
          <div className={styles.formInputs}>
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
          </div>

          <div className={styles.formInputs}>
            <label>Prix au m³</label>
            <input
              required
              id="price"
              type="number"
              placeholder={"min " + selectedWood?.avgPrice}
              {...register("price")}
              min={selectedWood?.avgPrice}
            />
          </div>
        </div>

        <label>Prix total : {watchQuantity * watchPrice}€</label>
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
