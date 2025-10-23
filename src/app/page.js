import Navbar from '@/components/modules/navbar/Navbar'
import Banner from "@/components/templates/index/banner/Banner"
import Latest from '@/components/templates/index/latest/Latest'
import Promote from '@/components/templates/index/promote/Promote'
import Footer from '@/components/modules/footer/Footer'
import { authUser } from '@/utils/authUser'
import ProductModel from '../../models/Product'


export default async function Home() {

  const user = await authUser()

  const products = await ProductModel.find({}).sort({ _id: -1 }).limit(4)

  return (
    <>
      <Navbar isLogin={user} />
      <Banner />
      <Latest products={JSON.parse(JSON.stringify(products))} />
      <Promote />
      <Footer />
    </>
  )
}
