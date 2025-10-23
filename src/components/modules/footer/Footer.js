import styles from "./footer.module.css";
import { MdOutlineCopyright } from "react-icons/md";

import { FaTelegram } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className={styles.footer}>
    <div className={styles.container}>
      
      <section className={styles.descriptions}>
        <p className={styles.descriptions_title}>
          شرکت   رایحه ی خوش ، فروشگاه اینترنتی  رایحه ی خوش
        </p>
        <div className={styles.description}>
          <p>اردبیل ، میدان جانبازان به طرف 13 آبان ،جنب فروشگاه افق کوروش</p>
        </div>
        <div className={styles.description}><FaPhone /> 
          <p>پیگیری سفارشات: 04533515100</p>
        </div>
        <div className={styles.description}><FaEnvelope /> 
          <p>support [at] rayehaye-khosh.com</p>
        </div>
      </section>

     
 

      
      <ul className={styles.links}>
        <div>
          <h4>منوی فوتر</h4>
          <li><Link href={"/contact-us"}>تماس با ما</Link></li>
          <li><Link href={"/about-us"}>درباره ما</Link></li>
          <li><Link href={"/rules"}>قوانین</Link></li>
        </div>
        <div>
          <h4>دسترسی سریع</h4>
          <li><Link href={"/category"}>فروشگاه</Link></li>
          <li><Link href={"/cart"}>سبد خرید</Link></li>
          <li><Link href={"/wishlist"}>علاقه‌مندی‌ها</Link></li>
        </div>
      </ul>

   
      <div className={styles.licenses}>
        <img src="/images/license4.htm" width={76} height={76} alt="license" />
        <img src="/images/license1.png" width={85} height={85} alt="license" />
        <img src="/images/license3.png" width={85} height={85} alt="license" />
        <img src="/images/license2.svg" width={62} height={95} alt="license" />
      </div>
    </div>

    <hr />

    
    <div className={styles.copyRightContainer}>
      <p className={styles.copyRight}>
        2025 <MdOutlineCopyright /> تمام حقوق متعلق به <strong>رایحه ی خوش</strong> | طراحی و اجرا <strong>مهدی علوی</strong>
      </p>
    </div>
  </footer>
  );
};

export default Footer;
