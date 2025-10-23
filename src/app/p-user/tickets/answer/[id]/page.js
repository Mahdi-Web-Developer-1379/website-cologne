import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";
import connectToDB from "../../../../../../configs/db";
import TicketModel from "../../../../../../models/Ticket";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";
import NotFound from '@/app/not-found'
import mongoose from "mongoose";


const page = async ({ params }) => {
  const ticketID = params.id;
  connectToDB();
  const user = await authUser();
  if (user?.role !== 'USER') {
    return redirect('/login-register')
  }
  const isValid = mongoose.Types.ObjectId.isValid( ticketID )
  if (!isValid) {
    return <NotFound/>
  }
  const ticket = await TicketModel.findOne({ _id: ticketID })
  if (!ticket) {
    return <NotFound/>
  }

  const answerTicket = await TicketModel.findOne({ mainTicket: ticket._id })
  

    

  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>تیکت </span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>

        <div>
          <Answer type="user" ticket={ticket} name={user.name}/> 
          {
            answerTicket &&  
            <Answer type="admin" ticket={answerTicket}/>
          }

          {
            !answerTicket && <div className={styles.empty}>
              <p>هنوز پاسخی دریافت نکردید</p>
            </div>
          }


        </div>
      </main>
    </Layout>
  );
};

export default page;