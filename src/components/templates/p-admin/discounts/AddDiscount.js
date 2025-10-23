"use client"
import React, { useState } from "react";
import styles from "./table.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function AddDiscount() {

    const router = useRouter()

    const [code, setCode] = useState("")
    const [percent, setPercent] = useState()
    const [maxUse, setMaxUse] = useState()


    const addDiscount = async () => {

        const discount = {
            code,
            percent,
            maxUse
        }
        const res = await fetch('/api/discounts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(discount)
        })
        if (res.status === 200) {
            toast.success('ثبت کد تخفیف با موفقیت انجام شد باید چند لحظه صبر کنید', {
                onClose: () => {
                  return  router.push('/p-admin')
                }
            })



        } else if (res.status === 400) {
            toast.warn('لطفا فیلد ها رو درست پر کنید')
        } else {
            toast.error('خطای سرور')
        }

    }

    

    return (
        <section className={styles.discount}>
            <p>افزودن کد تخفیف جدید</p>
            <div className={styles.discount_main}>
                <div>
                    <label>شناسه تخفیف</label>
                    <input placeholder="لطفا شناسه تخفیف را وارد کنید" type="text"
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div>
                    <label>درصد تخفیف</label>
                    <input placeholder="لطفا درصد تخفیف را وارد کنید" type="number"
                        onChange={(e) => setPercent(e.target.value)}
                    />
                </div>
                <div>
                    <label>حداکثر استفاده</label>
                    <input placeholder="حداکثر استفاده از کد تخفیف" type="number"
                        onChange={(e) => setMaxUse(e.target.value)}
                    />
                </div>
                <div>
                </div>
            </div>
            <button onClick={addDiscount} >افزودن</button>
        </section>
    )


}

export default AddDiscount