import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/p-admin/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";
import TicketModel from "../../../models/Ticket";
import UserModel from "../../../models/User";
import ProductModel from "../../../models/Product";
import connectToDB from "../../../configs/db";
import SaleChart from "@/components/templates/p-admin/Index/SaleChart";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";
import OrderModel from "../../../models/Order";


async function AdminHomePage() {
  connectToDB();

  const user = await authUser()

  if (user?.role !== 'ADMIN') {
    return redirect('/')
  }


  const tickets = await TicketModel.find({}).lean();
  const users = await UserModel.find({}).lean();
  const products = await ProductModel.find({}).lean();
  const orders=await OrderModel.find({}).lean()

  return (
    <AdminPanelLayout>
      <main>
        <section className={styles.dashboard_contents}>
          <Box title="مجموع تیکت های دریافتی" value={tickets.length} />
          <Box title="مجموع محصولات سایت" value={products.length} />
          <Box title="مجموع سفارشات" value={orders.length} />
          <Box title="مجموع کاربر های سایت" value={users.length} />
        </section>{" "}
        <div className={styles.dashboard_charts}>
          <section>
            <p>آمار فروش</p>
            <SaleChart/>
          </section>
          
        </div>
      </main>
    </AdminPanelLayout>
  );
}

export default AdminHomePage;
