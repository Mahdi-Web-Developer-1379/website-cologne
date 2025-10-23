"use state"
import { useRouter } from "next/navigation";
import styles from "./sms.module.css";
import { toast } from "react-toastify";
import { useState } from "react";


const Sms = ({ hideOtpForm }) => {


  const route = useRouter()

  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)

  const sendOtp = async () => {
    

    const res = await fetch('/api/auth/sms', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone })
    })
    
    if (res.status === 200) {
      toast.success('کد با موفقیت ارسال شد')
      setIsCodeSent(true)
    } else if (res.status === 400) {
      toast.warn('شماره تلفن اشتباه است')
    } else {
      toast.error('خطای سرور')
    }
  }

  const verifyCode = async () => {
    const res = await fetch('/api/auth/sms/verify', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code,phone })
    })
    
    if (res.status === 404) {
      toast.warn("کدی یافت نشد")
    } else if (res.status === 410) {
      toast.warn("کد منقضی شده")
    } else if(res.status === 403){
      toast.warn("کد به خاطر تلاش بیش از حد باطل شد")
    }else if(res.status === 409){
      toast.warn("کد اشتباه است")
    }else if(res.status === 200){
      toast.success('کد صحیح است شما وارد سایت شدید')
      return route.push('/')
    }else{
      toast.error('خطای سرور')
    }



  }

  return (
    <>

      <div className={styles.form}>
        {
          !isCodeSent ? <>
            <span className={styles.code_title}>
              لطفا شماره تلفن را وارد کنید
            </span>
            <input
              className={styles.input} type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <button
              style={{ marginTop: "1rem" }}
              className={styles.btn}
              onClick={sendOtp}
            >
              ارسال شماره تلفن
            </button>
          </> : <>
            <span className={styles.code_title}>
              لطفاً کد تأیید ارسال شده را تایپ کنید
            </span>
            <input
              className={styles.input} type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <button
              style={{ marginTop: "1rem" }}
              className={styles.btn}
              onClick={verifyCode}
            >
              ثبت کد تایید
            </button>
          </>
        }

      </div>

      <p className={styles.redirect_to_home} onClick={hideOtpForm} >لغو</p>
    </>
  );
};

export default Sms;
