'use client'
import React, { useEffect, useState } from "react";
import styles from "./table.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
export default function DataTable({ title }) {


  const router = useRouter()
  const [users,setUsers]=useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/user", { cache: "no-store" });
      const data = await res.json();
      setUsers(data)
    }
    fetchData()
  }, [])



  const changeRole = async (userID) => {

    swal({
      title: "آیا از تغییر نقش اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch('/api/user/role', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: userID })
        })
        if (res.status === 200) {
          toast.success('نقش کاربر با موفقیت عوض شد باید چند لحظه صبر کنید', {
            onClose: () => {
              router.refresh()
              return router.push('/p-admin')
            }
          })
        } else {
          toast.error('خطایی از سرور')
        }
      }
    })
  }

  const removeUser = async (userID) => {
    swal({
      title: "آیا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch('/api/user', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: userID })
        })
        if (res.status === 200) {
          toast.success(' حذف کاربر با موفقیت انجام شد باید چند لحظه صبر کنید', {
            onClose: () => {
              router.refresh()
              return router.push('/p-admin')
            }
          })
        } else {
          toast.error('خطایی از سرور')
        }
      }
    })

  }

  const banedUser=async(email,phone)=>{
    swal({
      title: "آیا از بن کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch('/api/user/ban', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email,phone })
        })
        if (res.status === 200) {
          toast.success(' بن کاربر با موفقیت انجام شد باید چند لحظه صبر کنید', {
            onClose: () => {
              router.refresh()
              
            }
          })
        } else {
          toast.error('خطایی از سرور')
        }
      }
    })
  }

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              
              <tr key={user._doc._id}>
                <td>{index + 1}</td>
                <td>{user._doc.name}</td>
                <td>{user._doc.email ? user._doc.email : "ایمیل یافت نشد"}</td>
                <td>{user._doc.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
          
                <td>
                  <button type="button" className={styles.edit_btn} onClick={() => changeRole(user._id)}>
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn} onClick={() => removeUser(user._id)}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn} 
                  onClick={() => banedUser(user._doc.email,user._doc.phone)} >
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


