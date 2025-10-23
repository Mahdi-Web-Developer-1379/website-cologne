export const dynamic = "force-dynamic";
import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import Table from "@/components/templates/p-admin/discounts/Table";
import connectToDB from "../../../../configs/db";
import DiscountModel from "../../../../models/Discounts";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";
import AddDiscount from "@/components/templates/p-admin/discounts/AddDiscount";

const page = async () => {
    connectToDB();

    const user = await authUser()

    if (user?.role !== 'ADMIN') {
        return redirect('/login-register')
    }

    const discounts = await DiscountModel.find().lean()
    //   const totalUsers = await UserModel.countDocuments();
    return (
        <Layout>
            <main>
                <AddDiscount/>

                {discounts.length === 0 ? (
                    <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
                ) : (
                    <Table
                        discounts={JSON.parse(JSON.stringify(discounts))}
                        title="لیست تخفیفات"
                    />
                )}
            </main>
        </Layout>
    );
};

export default page;