"use client";
import styles from "./topbar.module.css";

const Topbar = async() => {
  
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div>
            <p> </p>
            <span>کاربر</span>
          </div>
          <img src="/images/commentuser.png" alt="" />
        </div>
      </div>

      
    </>
  );
};

export default Topbar;
