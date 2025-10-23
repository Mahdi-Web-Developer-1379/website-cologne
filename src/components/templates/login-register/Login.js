import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import { validateEmail, validatePassword, validatephone } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Login = ({ showRegisterForm }) => {

  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false)
  const [phoneORemail, setphoneORemail] = useState("")
  const [password, setPassword] = useState('')

  const router=useRouter()

  const loginWithPassword = async () => {
    if (!phoneORemail.trim()) {
      return showSwal('تلفن یا ایمیل را وارد کنید', "error", "تلاش مجدد")
    }
    if (!password.trim()) {
      return showSwal('پسورد را وارد کنید', "error", "تلاش مجدد")
    }

    const isValidEmail = validateEmail(phoneORemail)
    const isValidPhone = validatephone(phoneORemail)
    const isValidPassword = validatePassword(password)

    if (!isValidEmail && !isValidPhone) {
      return showSwal('تلفن یا ایمیل نامعتبر است ', "error", "تلاش مجدد")
    }
    if (!isValidPassword) {
      return showSwal('  پسورد نامعتبر است ', "error", "تلاش مجدد")
    }
    // console.log("ok");

    const user = { identifier: phoneORemail, password }

    const res = await fetch('/api/auth/signin', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    // console.log(await res.json());
    if (res.status === 200) {
      setPassword('')
      setphoneORemail('')
      showSwal('با موفقیت وارد شدید', "success", "ورود به پنل کاربری")
      router.replace('/')
      router.refresh()
    } else if (res.status === 422) {
      return showSwal("کاربر یافت نشد", "error", "تلاش دوباره")
    } else if (res.status === 401) {
      return showSwal('تلفن ,ایمیل یا پسورد نامعتبر است ', "error", "تلاش مجدد")
    }else if (res.status === 400) {
      return showSwal('تلفن ,ایمیل یا پسورد نامعتبر است ', "error", "تلاش مجدد")
    }

  }

  const hideOtpForm = () => setIsLoginWithOtp(false)

  return (
    <>
      {
        !isLoginWithOtp ? (
          <>
            <div className={styles.form}>
              <input
                className={styles.input}
                type="text"
                placeholder="ایمیل/شماره موبایل"
                value={phoneORemail}
                onChange={e => setphoneORemail(e.target.value)}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
           
              <button className={styles.btn} onClick={loginWithPassword}>ورود</button>
              
              <button className={styles.btn} onClick={() => setIsLoginWithOtp(true)}>ورود با کد یکبار مصرف</button>
              <span>ایا حساب کاربری ندارید؟</span>
              <button className={styles.btn_light} onClick={showRegisterForm} >ثبت نام</button>
            </div>
            <Link href={"/"} className={styles.redirect_to_home}>
              لغو
            </Link>
          </>
        ) : (
          <Sms hideOtpForm={hideOtpForm} />
        )
      }


    </>
  );
};

export default Login;