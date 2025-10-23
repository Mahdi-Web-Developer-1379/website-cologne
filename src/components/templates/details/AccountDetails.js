"use client";
import React, { useEffect } from "react";
import styles from "@/styles/p-user/accountDetails.module.css"
import { useState } from "react";
import { validateEmail, validatephone, validatePassword } from "@/utils/auth";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";

function AccountDetails() {

    const route = useRouter()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    // const [password, setPassword] = useState('')
    const isValidEmail = validateEmail(email)
    const isVslidPhone = validatephone(phone)
    // const isValidPassword = validatePassword(password)


    useEffect(() => {
        const getUser = async () => {
            const res = await fetch('/api/auth/me')
            const data = await res.json()
            const userData = data.user

            setName(userData.name)
            setEmail(userData.email)
            setPhone(userData.phone)
        }
        getUser()
    }, [])


    const updateUser = async () => {
        const newUserDate = { name, email, phone }
        const res = await fetch('/api/user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserDate)
        })

        if (res.status === 200) {
            toast.success('اطلاعات تغییر کرد، لطفا دوباره لاگین کنید', {
                onClose: () => {
                    fetch('/api/auth/signout', { method: "POST" })
                                route.replace('/login-register')       
                }
            })
        } else {
            toast.warning('خطایی در سرور رخ داده است')
        }
    }

    return (
        <main>
            <div className={styles.details}>
                <h1 className={styles.title}>
                    <span> جزئیات اکانت</span>
                </h1>
                <div className={styles.details_main}>
                    <section>
                        <div>
                            <label>نام کاربری</label>
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="لطفا نام کاربری خود را وارد کنید"
                                type="text"
                            />
                        </div>
                        <div>
                            <label>ایمیل</label>
                            <input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="لطفا ایمیل خود را وارد کنید"
                                type="text"
                            />
                        </div>
                        <div>
                            <label>شماره تماس</label>
                            <input
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                placeholder="لطفا شماره تماس خود را وارد کنید"
                                type="number"
                            />
                        </div>
                    </section>
                    <section>
                        <div className={styles.uploader}>
                            <img src="/images/commentuser.png" alt="" />
                        </div>
                    </section>
                </div>
                <button
                    type="submit"
                    onClick={updateUser}
                    className={styles.submit_btn}
                    disabled={isValidEmail && isVslidPhone && name.trim() ? false : true}
                >
                    ثبت تغییرات
                </button>
            </div>
        </main>
    );

}

export default AccountDetails;
