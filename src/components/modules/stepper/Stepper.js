import Link from "next/link";
import styles from "./stepper.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
const Stepper = ({ step }) => {
  return (
    <div className={styles.stepper_bg}>
      <div className={styles.stepper}>
        <Link className={step == "cart" && styles.active_step} href={"/cart"}>
          سبد خرید
        </Link>
        <FaArrowLeftLong />
        {step === "checkout" || step === "complate" ? (
          <Link
            className={step == "checkout" && styles.active_step}
            href={"/checkout"}
          >
            پرداخت
          </Link>
        ) : (
          <p>پرداخت</p>
        )}
      
      </div>
    </div>
  );
};

export default Stepper;
