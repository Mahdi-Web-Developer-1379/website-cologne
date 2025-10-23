"use client"

import { useState } from "react";
import styles from "./form.module.css";
import { validateEmail, validatephone } from "@/utils/auth";
import { handleApiErrorContact } from "@/utils/helpers";


const Form = () => {

  const [email, setEmail] = useState('')
  const [phone, setphone] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')

  const submitMessage = async (e) => {
    e.preventDefault()
    const isValidEmail = validateEmail(email)
    const isValidPhone = validatephone(phone)

    if (!email.trim() || !phone.trim() || !name.trim() || !message.trim()) {
      return handleApiErrorContact(404)

    }
    if (!isValidEmail || !isValidPhone) {
      return handleApiErrorContact(400)
    }

    const contact = { email, phone, name, company, message }

    const res = await fetch('/api/contact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    })

    if (res.status === 401) {
      handleApiErrorContact(401)
    } else if (res.status === 400) {
      handleApiErrorContact(400)
    } else if (res.status === 422) {
      handleApiErrorContact(422)
    } else if (res.status === 403) {
      handleApiErrorContact(403)
    } else if (res.status === 201) {
      handleApiErrorContact(201)
      setEmail('')
      setphone('')
      setName('')
      setCompany('')
      setMessage('')
    }
  }



  return (
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input value={name} onChange={e => setName(e.target.value)} type="text" />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          < input value={phone} onChange={e => setphone(e.target.value)} type="text" />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input value={company} onChange={e => setCompany(e.target.value)} type="text" />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        < textarea value={message} onChange={e => setMessage(e.target.value)} name="" id="" cols="30" rows="3"></textarea>
      </div>
      <button onClick={submitMessage}>ارسال</button>
      
    </form>
  );
};

export default Form;
