import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import  ContactUsClient from '@/components/templates/contact-us/ContactUsClient'
import { authUser } from "@/utils/authUser";



const page = async () => {
  const user = await authUser();
  const isLogin = Boolean(user);

  return (
    <>
      <Navbar isLogin={isLogin} />
      <Breadcrumb route={"تماس با ما"} />
      <ContactUsClient/>
      <Footer />
    </>
  );
};

export default page;
