import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import TableList from "src/woodstock/components/orders/TableList"
import { SessionContext } from "@blitzjs/auth"
import getCurrentUser from "src/users/queries/getCurrentUser"
import { gSSP } from "src/blitz-server"

type Props = {
  userId: unknown
  publicData: SessionContext["$publicData"]
  userInfos: any
}

export const getServerSideProps = gSSP<Props>(async ({ ctx }) => {
  const { session } = ctx
  const currentUserInfo = await getCurrentUser(null, ctx)

  return {
    props: {
      userId: session.userId,
      publicData: session.$publicData,
      publishedAt: new Date(0),
      userInfos: currentUserInfo,
    },
  }
})

const OrdersPage: BlitzPage = (props: Props) => {
  const currentUserInfo = props.userInfos

  if (!currentUserInfo) {
    return <div>loading...</div>
  } else if (currentUserInfo.isAdmin) {
    return (
      <Layout title="Orders">
        <TableList orders={currentUserInfo.orders} />
      </Layout>
    )
  } else {
    return (
      <Layout title="Orders">
        <h3>Vous n'avez pas accès aux orderes.</h3>
      </Layout>
    )
  }
}

export default OrdersPage
