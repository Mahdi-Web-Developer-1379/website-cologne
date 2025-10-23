"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/styles/p-user/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify"

export default function sendTicket() {

    const [title, setTitle] = useState('')
    const [mybody, setmyBody] = useState('')
    const [departments, setDepartments] = useState([])
    const [departmentID, setDepartmentID] = useState("")
    const [subDepartments, setSubDepartments] = useState([])
    const [subDepartmentID, setSubDepartmentID] = useState("")
    const [priority, setPriority] = useState(null)


    useEffect(() => {
        const getDepartments = async () => {
            const res = await fetch('/api/departments')
            const data = await res.json()
            // console.log(data);
            setDepartments([...data])

        }
        getDepartments()
    }, [])

    useEffect(() => {
        const getSubDepartments = async () => {
            const res = await fetch(`/api/departments/sub/${departmentID}`)
            if (res.status === 200) {
                const data = await res.json()
                setSubDepartments([...data])
            }
        }
        getSubDepartments()
    }, [departmentID])


    const sendTickets = async () => {


        const ticket = {
            title,
            body:mybody,
            department: departmentID,
            subDepartment: subDepartmentID,
            priority:Number(priority),
        }

        // console.log(ticket);
        const res = await fetch('/api/tickets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
        // console.log(await res.json());
        if (res.status === 400) {
            return toast.warning('فیلد ها رو درست پر کنید')
        } else if (res.status === 404) {
            return toast.warning('دپارتمان یا تیکت ها رو درست انتخاب کنید')
        } else if (res.status === 201) {
            return toast.success('تیکت با موفقیت ارسال شد', {
                onClose: () => {
                    location.replace('/p-user/tickets')
                }
            })
        } else {
            return toast.error('خطایی در سرور')
        }

    }


    return (
        <main className={styles.container}>
            <h1 className={styles.title}>
                <span>ارسال تیکت جدید</span>
                <Link href="/p-user/tickets"> همه تیکت ها</Link>
            </h1>

            <div className={styles.content}>
                <div className={styles.group}>
                    <label>دپارتمان را انتخاب کنید:</label>
                    <select onChange={event => setDepartmentID(event.target.value)}>
                        <option value={-1}>لطفا  دپارتمان را انتخاب نمایید.</option>
                        {
                            departments?.map((department, index) => {
                                return <option key={index} value={department._id}>{department.title}</option>
                            })
                        }

                    </select>
                </div>
                <div className={styles.group}>
                    <label>نوع تیکت را انتخاب کنید:</label>
                    <select onChange={e => setSubDepartmentID(e.target.value)}>
                        <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
                        {
                            subDepartments.map((subDepartment, index) => {
                                return <option key={index} value={subDepartment._id}>{subDepartment.title} </option>


                            })
                        }
                    </select>
                </div>
                <div className={styles.group}>
                    <label>عنوان تیکت را وارد کنید:</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="عنوان..." type="text" />
                </div>
                <div className={styles.group}>
                    <label>سطح اولویت تیکت را انتخاب کنید:</label>
                    <select onChange={e => setPriority(e.target.value)}>
                        <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
                        <option value={1}>کم</option>
                        <option value={2}>متوسط</option>
                        <option value={3}>بالا</option>
                    </select>
                </div>
            </div>
            <div className={styles.group}>
                <label>محتوای تیکت را وارد نمایید:</label>
                <textarea value={mybody} onChange={e => setmyBody(e.target.value)} rows={10}></textarea>
            </div>
            

            <button className={styles.btn} onClick={sendTickets}>
                <IoIosSend />
                ارسال تیکت
            </button>
        </main>
    )
}
