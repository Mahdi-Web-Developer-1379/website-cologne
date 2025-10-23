import Layout from "@/components/layouts/UserPanelLayout";
import AccountDetails from "@/components/templates/details/AccountDetails";
import { authUser } from "@/utils/authUser";
import { redirect } from "next/navigation";

const page = async() => {

  const user = await authUser()

  if (user?.role !== 'USER') {
    return redirect('/login-register')
  }

  return (
    <Layout>
      <AccountDetails />
    </Layout>
  );
};

export default page;
