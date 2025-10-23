import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb"
import Footer from "@/components/modules/footer/Footer"
import Navbar from "@/components/modules/navbar/Navbar"
import Products from "@/components/templates/category/products/Products"
import styles from '@/styles/category.module.css'
import { authUser } from "@/utils/authUser"
import ProductModel from "../../../models/Product"

const page = async() => {

    const user=await authUser()
    const products=await ProductModel.find({})
     
    return (
        <>
            <Navbar isLogin={user} />
            <Breadcrumb route={'فروشگاه'} />
            <main className={styles.container} data-aos="fade-up">
                
                    <Products products={products} />
                    
            </main> 
            <Footer />
        </>
    )
}

export default page