import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import connectToDB from "../../../../configs/db";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";
import ContactModel from "../../../../models/Contact";
import Table from "@/components/templates/p-admin/contact/Table"

const page = async () => {

  connectToDB();

  const user = await authUser()

  if (user?.role !== 'ADMIN') {
    return redirect('/login-register')
  }
  
  const contactAdmin=await ContactModel.find({}).lean()




  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>پیام کاربران به مدیریت</span>
        </h1>

        {
          contactAdmin.length === 0 ? (
            <>
              <p className={styles.empty}>سفارشی وجود ندارد</p>
            </>
          ) : (
            <div>
             
               
                   <Table contactAdmin={contactAdmin} />
              

            </div>
          )
        }
       
      </main>
    </Layout>
  );
};

export default page;