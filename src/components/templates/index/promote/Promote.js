import Link from "next/link";
import styles from "./promote.module.css";

const Promote = () => {
  return (
    <div className={styles.readable}>
      <div data-aos="fade-up-right" className={styles.container}>
        <main className={styles.main}>
          <section>
            <span>خرید ادکلن ، به سبک حرفه ای ها</span>
            <p>زیبایی امروز رو با ادکلن ما “ست” کنید</p>
            <img data-aos="fade-left" src="/images/eaude3.jpg" alt="" />
          </section>
          <section className={styles.club}>
            <div>
              <span>باشگاه مشتریان رایحه ی خوش</span>
              <p>برای مشتریان وفادار  رایحه خوش</p>
            </div>
          </section>
        </main>
        <main className={styles.main}>
          <img width={660} height={530} src="/images/eaude4.jpg" alt="" />
          <section data-aos="fade-up" className={styles.why_coffee}>
            <img
              className={styles.logo}
              src="/images/eaude.jpg"
              alt=""
            />
            <p className={styles.title}>چرا رایحه خوش</p>
            <p>
              برخورداری از تجربه و قدمت کافی و آگاهی از ذایقه مصرف کنندگان
              راهنمای ما در برآورده ساختن نیاز مشتریان ادکلن تخصصی (موج سوم) است
              .تجربه ای به قدمت دو نسل و ارتباط مستمر با مصرف کنندگان ادکلن
              ضامن این ویژگیها است.
            </p>
            <div>
              <Link href="/about-us">
                <button className={styles.red_btn}>بیشتر بخوانید</button>
              </Link>
              <Link href="/category">
                <button className={styles.gray_btn}>فروشگاه</button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Promote;