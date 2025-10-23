import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/orders.module.css";
import connectToDB from "../../../../configs/db";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";
import OrderModel from "../../../../models/Order";
import Order from "@/components/templates/p-user/orders/Order";

const page = async () => {

  connectToDB();
  const user = await authUser();
  if (user?.role !== 'USER') {
    return redirect('/login-register')
  }

  const orders = await OrderModel.find({ userID: user._id }).lean()




  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>سفارش های من </span>

        </h1>

        {
          orders.length === 0 ? (
            <>
              <p className={styles.empty}>سفارشی وجود ندارد</p>
            </>
          ) : (
            <div className={styles.ordercontainer}> 
              {
                orders?.map(order => {
                  return <Order {...order} />
                })
              }

            </div>
          )
        }



      </main>
    </Layout >
  );
};

export default page;