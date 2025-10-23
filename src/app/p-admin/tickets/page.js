export const dynamic = "force-dynamic";
import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/tickets/table.module.css";
import Table from "@/components/templates/p-admin/tickets/Table";
import connectToDB from "../../../../configs/db";
import TicketModel from "../../../../models/Ticket";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";



const page = async () => {
    connectToDB();

    const user = await authUser()

    if (user?.role !== 'ADMIN') {
        return redirect('/login-register')
    }

    const userTickets = await TicketModel.find({isAnswer:false})
        .populate('user')
        .populate("department")
        .lean()

    const adminTickets = await TicketModel.find({ isAnswer: true })
        .populate('user')
        .populate("department")
        .populate("mainTicket","body")
        .lean()
     
        
    // const ticketUsers = await TicketModel.countDocuments();
    return (
        <Layout>
            <main>
                {(adminTickets.length===0 && userTickets.length === 0) ? (
                    <p className={styles.empty}>تیکتی وجود ندارد</p>
                ) : (
                    <>
                        <Table
                            tickets={JSON.parse(JSON.stringify(userTickets))}
                            title="لیست تیکت های کاربران"
                        />
                        <Table
                            tickets={JSON.parse(JSON.stringify(adminTickets))}
                            title="لیست تیکت های ادمین"
                        />
                    </>


                )}
            </main>
        </Layout>
    );
};

export default page;