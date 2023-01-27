import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import addCommercial from "../../mutations/addCommercial"
import { AddCommercial } from "../../validations"
import { useMutation } from "@blitzjs/rpc"
import styles from "src/woodstock/styles/common.module.css"
import { User } from "@prisma/client"

type AddCommercialFormProps = {
  onSuccess?: () => void
  adminId: string
  onCallback?: (commercials: User[]) => void
}

export const AddCommercialForm = (props: AddCommercialFormProps) => {
  const [addCommercialMutation] = useMutation(addCommercial)
  return (
    <div>
      <h3>Ajouter un Commercial</h3>
      <p className={styles.description}>
        Vous pouvez créer des comptes pour vos commerciaux. Il faut une addresse mail et un mot de
        passe.
      </p>

      <Form
        submitText="Ajouter"
        schema={AddCommercial}
        initialValues={{ email: "", password: "", adminId: props.adminId }}
        onSubmit={async (values) => {
          try {
            const result = await addCommercialMutation(values)
            props.onSuccess?.()
            props.onCallback?.(result.commercials)
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

export default AddCommercialForm
