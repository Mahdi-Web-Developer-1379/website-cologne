import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useState } from "react";
import { showSwal } from "@/utils/helpers";
const CommentForm = ({ isLogin, productID }) => {
  // console.log(isLogin);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState("")
  const [body, setBody] = useState("")
  const [scores, setScores] = useState(0)

  const setCommentScore = (score) => {
    setScores(score)
  }
    
  const submitComment = async () => {
    // console.log("ok");
    if (!username.trim()||!email.trim()|| !body.trim()) {
     return  showSwal('هرسه کادر را پر کنید','error','ok')
    }
    if (!isLogin) {
     return  showSwal('وارد پنل خود شوید','error','ok')
    } else if (isLogin.name !== username || isLogin.email !== email) {
    return  showSwal('ایمیل یا نام کاربری خود را وارد کنید','error','ok')
    }
    const comment = {
      username,
      email,
      body,
      score: scores,
      productID,
      userID:isLogin._id
    }

    const res = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    })
    if (res.status === 201) {
    return  showSwal('کامنت شما با موفقیت ثبت شد', 'success', 'ok')
    }
  }


  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          <IoMdStar onClick={() => setCommentScore(5)} color={scores >= 5 ? 'gold' : 'gray'} />
          <IoMdStar onClick={() => setCommentScore(4)} color={scores >= 4 ? 'gold' : 'gray'} />
          <IoMdStar onClick={() => setCommentScore(3)} color={scores >= 3 ? 'gold' : 'gray'} />
          <IoMdStar onClick={() => setCommentScore(2)} color={scores >= 2 ? 'gold' : 'gray'} />
          <IoMdStar onClick={() => setCommentScore(1)} color={scores >= 1 ? 'gold' : 'gray'} />
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </div>
     
      <button
        onClick={submitComment}

      >ثبت</button>
    </div>
  );
};

export default CommentForm;
