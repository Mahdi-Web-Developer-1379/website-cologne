import { FaRegStar, FaStar } from "react-icons/fa";

import styles from "./comment.module.css";
const Comment = (comment) => {
  // console.log(comment,"comment");
  return (
    <section className={styles.comment}>
      <img src="/images/commentuser.png" className={styles.avatar} alt="" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{comment.username}</strong>
            <p>{new Date(comment.date).toLocaleDateString('fa-IR')}</p>
          </div>
          <div className={styles.stars}>
          {
            new Array(comment.score).fill(0).map((item, index) => {
              return <FaStar key={index} />
            })
          }
          
          {
            new Array(5 - comment.score).fill(0).map((item, index) => {
              return <FaRegStar key={index} />
            })
          }
          </div>
        </div>
        <p>
          {
            comment.body
          }
        </p>
      </div>
    </section>
  );
};

export default Comment;
