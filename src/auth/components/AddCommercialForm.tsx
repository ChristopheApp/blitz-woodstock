import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import addCommercial from "../mutations/addCommercial"
import { AddCommercial } from "src/auth/validations"
import { useMutation } from "@blitzjs/rpc"

type AddCommercialFormProps = {
  onSuccess?: () => void
  adminId: string
}

export const AddCommercialForm = (props: AddCommercialFormProps) => {
  const [addCommercialMutation] = useMutation(addCommercial)
  return (
    <div>
      <h1>Add Commercial</h1>

      <Form
        submitText="Add Commercial"
        schema={AddCommercial}
        initialValues={{ email: "", password: "", adminId: props.adminId }}
        onSubmit={async (values) => {
          try {
            await addCommercialMutation(values)
            props.onSuccess?.()
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
