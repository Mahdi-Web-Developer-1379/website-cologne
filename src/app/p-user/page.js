import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";
import TicketModel from "../../../models/Ticket";
import CommentModel from "../../../models/Comment";
import WishlistModel from "../../../models/Wishlist";
import OrderModel from "../../../models/Order";

const page =async () => {

  const user = await authUser()

  if (user?.role !== 'USER') {
    return redirect('/login-register')
  }

  
  const tickets = (await TicketModel.find({ user: user._id })
  .sort({ createdAt: -1 })
  .limit(3)
  .populate('department', 'title')
  .lean()) || [];

  const commentsLength=await CommentModel.countDocuments({userID:user._id})

  const wishlistLength=await WishlistModel.countDocuments({user:user._id})

  const Orderlength=await OrderModel.countDocuments({userID:user._id})
  
  const orders = await OrderModel.find({ userID: user._id }).lean()
  .sort({ createdAt: -1 })
  .limit(3)
  .select("finalPrice createdAt name");
    

  // console.log(tickets);

  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={tickets?.length} />
          <Box title="مجموع کامنت ها " value={commentsLength} />
          <Box title="مجموع سفارشات" value={Orderlength} />
          <Box title="مجموع علاقه مندی ها" value={wishlistLength} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={tickets} />
          <Orders orders={orders} />
        </section>
      </main>
    </Layout>
  );
};

export default page;
