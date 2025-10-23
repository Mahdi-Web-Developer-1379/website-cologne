
import './globals.css'
// import { Inter } from 'next/font/google'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AOSInit from '@/utils/aos'
import ScrollToTop from '@/utils/ScrollToTop'
// const inter = Inter({ subsets: ['latin'], display: 'swap', })
// import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from "@/contexts/CartContext";


export const metadata = {
  title: 'فروشگاه اینترنتی ادکلن',
  description: 'project eau de',

}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" >
      {/* className={inter.className} */}
      <body >
        <CartProvider>

          <AOSInit />
          {children}
          <ScrollToTop />
          <ToastContainer position="top-center" rtl />
          </CartProvider>
        
      </body>
    </html>
  )
}
