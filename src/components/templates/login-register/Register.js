"use client"
import { useState } from "react";
import styles from "./register.module.css";
import { showSwal } from "@/utils/helpers";
import { validateEmail, validatePassword, validatephone } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Register = ({ showLoginForm }) => {
  const router = useRouter()


  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false)



  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')


  const signUp = async () => {

    if (!name.trim()) {
      return showSwal("نام را وارد کنید", "error", "تلاش مجدد")
    }

    const isValidPhone = validatephone(phone)
    if (!isValidPhone) {
      return showSwal("تلفن شما معتبر نیست", "error", "تلاش مجدد")
    }

    if (email.trim()) {
      const isValidEmail = validateEmail(email)
      if (!isValidEmail) {
        return showSwal("ایمیل شما معتبر نیست", "error", "تلاش مجدد")
      }
    }

    const isValidPassword = validatePassword(password)
    if (!isValidPassword) {
      return showSwal("پسورد شما مطمعن نیست", "error", "تلاش مجدد")
    }


    const user = { name, phone, password, email }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    // console.log(res.json());
    if (res.status === 201) {
      showSwal("ثبت نام شما با موفقیت انجام شد", "success", "ورود به پنل کاربری")
      return router.push('/')
    } else if (res.status === 422) {
      showSwal("کاربری با این مشخصات وجود دارد", "error", "تلاش مجدد")
    }
  }



  return (
    <>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text" placeholder="نام"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="شماره موبایل  "
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <input
          className={styles.input}
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {isRegisterWithPass && (
          <input
            className={styles.input}
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        )}

        <button style={{ marginTop: ".7rem" }} className={styles.btn}
          onClick={() => {
            if (isRegisterWithPass) {
              signUp()
            } else {
              setIsRegisterWithPass(true)
            }
          }}>
          ثبت نام با رمزعبور
        </button>
        <p className={styles.back_to_login} onClick={showLoginForm}>برگشت به ورود</p>
      </div>
    </>
  );
};

export default Register;
