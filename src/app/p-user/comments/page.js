import DataTable from "@/components/templates/p-user/comments/DataTable";
import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import connectToDB from "../../../../configs/db";
import Commentmodel from "../../../../models/Comment";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";
import styles from "@/styles/p-user/dataTable.module.css"

const page = async () => {
  connectToDB();
  const user = await authUser();
  if (user?.role !== 'USER') {
    return redirect('/login-register')
  }
  // console.log(user._id,"hghth");
  const comments = await Commentmodel.find(
    { userID: user._id },
    "-__v"
  ).populate("productID", "name");

  // console.log(comments,"rrrrrr");

  return (
    <Layout>
      <main>

        {
          comments.length ===0 ? (<p className={styles.empty}>
            کامنتی وجود ندارد
          </p>) : (<DataTable
            comments={JSON.parse(JSON.stringify(comments))}
            title="لیست کامنت‌ها"
          />)
        }




      </main>
    </Layout>
  );
};

export default page;