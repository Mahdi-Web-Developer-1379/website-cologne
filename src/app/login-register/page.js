"use client";
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import styles from "@/styles/login-register.module.css";
import { useState } from "react";
import { authTypes } from "@/utils/constants";


const login_register = () => {

  const [authType, setAuthType] = useState(authTypes.LOGIN)

  const showLoginForm=()=>setAuthType(authTypes.LOGIN)
  const showRegisterForm=()=>setAuthType(authTypes.REGISTER)

  return (
    <div className={styles.login_register}>
      <div className={styles.form_bg} data-aos="fade-up">
        {
          authType === authTypes.LOGIN ? (
            <Login showRegisterForm={showRegisterForm} />
          ) : (
            <Register showLoginForm={showLoginForm}/>
          )
        }
      </div>
      <section>
        <img
          src="/images/eaude4.jpg"
          alt=""
        />
      </section>
    </div>
  );
};

export default login_register;
