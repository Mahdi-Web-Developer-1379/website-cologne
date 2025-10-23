export const dynamic = "force-dynamic";
import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/users/table.module.css";
import Table from "@/components/templates/p-admin/users/Table";
import connectToDB from "../../../../configs/db";
import UserModel from "../../../../models/User";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";



const page = async () => {
  connectToDB();

  const user = await authUser()

  if (user?.role !== 'ADMIN') {
    return redirect('/login-register')
  }



  // const users = await UserModel.find().lean()
  const totalUsers = await UserModel.countDocuments();
  return (
    <Layout>
      <main>
        {totalUsers === 0 ? (
          <p className={styles.empty}>کاربری وجود ندارد</p>
        ) : (

          <Table
            // users={users}
            title="لیست کاربران"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;