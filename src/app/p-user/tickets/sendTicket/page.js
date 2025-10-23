import Layout from "@/components/layouts/UserPanelLayout";
import SendTicket from "@/components/templates/p-user/tickets/sendTickets";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";

const page = async() => {

  const user = await authUser()


  if (user?.role !== 'USER') {
    return redirect('/login-register')
  }

  return (
    <Layout>
      <SendTicket/>
    </Layout>
  );
};

export default page;
