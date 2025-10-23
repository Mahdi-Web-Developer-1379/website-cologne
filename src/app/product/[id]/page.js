import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import connectToDB from "../../../../configs/db";
import { authUser } from "@/utils/authUser";
import ProductModel from "../../../../models/Product";
import NotFound from '@/app/not-found'
import mongoose from "mongoose";





const product = async ({ params }) => {
  await connectToDB()
  const productID = params.id
  const user = await authUser()

  const isValid = mongoose.Types.ObjectId.isValid( productID )
  if (!isValid) {
    return <NotFound/>
  }
  const product = await ProductModel.findOne({ _id: productID }).populate('comments')
  if (!product) {
    return <NotFound/>
  }

  



  return (
    <div className={styles.container}>
      <Navbar isLogin={user} />
      
          <div data-aos="fade-up" className={styles.contents}>
            <div className={styles.main}>
              <Details product={JSON.parse(JSON.stringify(product))} />
              <Gallery img={product.image}/>
            </div>
            <Tabs isLogin={user} product={JSON.parse(JSON.stringify(product))} />
          </div>
  
      
    
      <Footer />
    </div>
  );
};

export default product;