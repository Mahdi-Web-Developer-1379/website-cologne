import styles from "./topbar.module.css";

import { authUser } from "@/utils/authUser";

const Topbar = async() => {

  const user=await authUser()

  return (
    <>
      <div className={styles.topbar}>
        
        <div className={styles.profile}>
          <div>
            <p>{user.name}</p>
            <span>ادمین</span>
          </div>
          <img src="/images/commentuser.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Topbar;
