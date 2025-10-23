import Navbar from "@/components/modules/navbar/Navbar"
import Footer from "@/components/modules/footer/Footer"
import styles from "@/styles/cart.module.css";
import Table from "@/components/templates/cart/Table";
import Stepper from "@/components/modules/stepper/Stepper";
import { authUser } from "@/utils/authUser";




const page =async () => {

    const user=await authUser()

    return (
        <>
            <Navbar isLogin={user}/>
            <Stepper step='cart' />
            <main className={styles.cart} data-aos="fade-up">
                <Table />
            </main>


            <Footer />


        </>
    )
}

export default page