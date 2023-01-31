import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import addSalesrep from "../../mutations/addSalesrep"
import { AddSalesrep } from "../../validations"
import { useMutation } from "@blitzjs/rpc"
import styles from "src/woodstock/styles/common.module.css"
import { User } from "@prisma/client"

type AddSalesrepFormProps = {
  onSuccess?: (salesreps: User[]) => void
  adminId: string
  onCallback?: (salesreps: User[]) => void
}

export const AddSalesrepForm = (props: AddSalesrepFormProps) => {
  const [addSalesrepMutation] = useMutation(addSalesrep)
  return (
    <div>
      <h3>Ajouter un commercial</h3>
      <p className={styles.description}>
        Vous pouvez créer des comptes pour vos commerciaux. Il faut une addresse mail et un mot de
        passe.
      </p>

      <Form
        submitText="Ajouter"
        schema={AddSalesrep}
        initialValues={{ email: "", password: "", adminId: props.adminId }}
        onSubmit={async (values) => {
          try {
            const result = await addSalesrepMutation(values)
            props.onSuccess?.(result.salesreps)
            // props.onCallback?.(result.salesreps)
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}

export default AddSalesrepForm
