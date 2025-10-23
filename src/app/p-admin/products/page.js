export const dynamic = "force-dynamic";
import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/products/table.module.css";
import Table from "@/components/templates/p-admin/products/Table";
import connectToDB from "../../../../configs/db";
import ProductModel from "../../../../models/Product";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";
import AddProduct from "@/components/templates/p-admin/products/AddProduct"


const page = async () => {
    connectToDB();

    const user = await authUser()

    if (user?.role !== 'ADMIN') {
        return redirect('/login-register')
    }


    const products = await ProductModel.find()
    
    return (
        <Layout>
            <main>
         <AddProduct/>

                {products.length === 0 ? (
                    <p className={styles.empty}>محصولی وجود ندارد</p>
                ) : (
                    <Table
                        products={products}
                        title="لیست محصولات"
                    />
                )}
            </main>
        </Layout>
    );
};

export default page;