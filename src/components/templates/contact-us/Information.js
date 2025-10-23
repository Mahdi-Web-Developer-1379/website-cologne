import {
    
    FaInternetExplorer,
    FaPhone,
    FaTelegramPlane,
  } from "react-icons/fa";
  import { GiPerfumeBottle } from "react-icons/gi";
  import styles from "./information.module.css";
  import { BiSolidContact } from "react-icons/bi";
  
  
  const Information = () => {
    return (
      <section className={styles.Information}>
        <span>تماس با ما</span>
        <p>اطلاعات تماس</p>
        <div>
        <GiPerfumeBottle/>
          <p>شرکت   رایحه ی خوش</p>
        </div>
        <div>
          <FaInternetExplorer />
          <p>rayehaye-khosh.com</p>
        </div>
        <div>
          <BiSolidContact />
          <p>
          اردبیل ، میدان جانبازان به طرف 13 آبان ،جنب فروشگاه افق کوروش
          </p>
        </div>
        <div>
          <FaPhone />
          <p>045-33515100</p>
        </div>
       
        <div>
          <FaTelegramPlane />
          <p>تماس با مدیریت از طریق واتساپ و یا تلگرام : 09011435676</p>
        </div>
      </section>
    );
  };
  
  export default Information;
  