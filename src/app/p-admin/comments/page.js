export const dynamic = "force-dynamic";
import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/comments/table.module.css";
import Table from "@/components/templates/p-admin/comments/Table";
import connectToDB from "../../../../configs/db";
import CommentModel from "../../../../models/Comment";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";



const page = async () => {
    connectToDB();

    const user = await authUser()

    if (user?.role !== 'ADMIN') {
        return redirect('/login-register')
    }



    const comments = await CommentModel.find()
    .populate('productID',"name").lean()
    return (
        <Layout>
            <main>
                {comments.length === 0 ? (
                    <p className={styles.empty}>کامنتی وجود ندارد</p>
                ) : (
                    <Table
                        comments={comments}
                        title="لیست کامنت ها"
                    />
                )}
            </main>
        </Layout>
    );
};

export default page;