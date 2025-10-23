'use client'
import React from "react";
import styles from "./table.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";
export default function DataTable({ comments, title }) {


  const router = useRouter()

  const showCommentBody = (body) => {
    showSwal(body, undefined, 'بستن')
  }

  const acceptRejectComment=async(commentID)=>{
    const res=await fetch('/api/comments/acceptreject',{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:commentID})
    })
    // console.log(await res.json());
    if (res.status===200) {
      toast.success('عملیات با موفقیت انجام شد')
    }else{
      toast.warn('خطای سرور')
    }
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
              <th>کاربر</th>
              <th>ایمیل</th>
              <th>نام محصول</th>
              <th>امتیاز</th>
              <th>تاریخ ثبت</th>
              <th>مشاهده</th>
              <th>تایید/رد</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (

              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td>{comment.productID.name}</td>
                <td>{comment.score}</td>
                <td>{new Date(comment.date).toLocaleDateString('fa-IR')}</td>
                <td>
                  <button type="button" className={styles.edit_btn}
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  {
                    comment.isAccept ? (
                      <button type="button" className={styles.delete_btn}
                        onClick={() => acceptRejectComment(comment._id)} >
                        رد
                      </button>
                    ) : (
                      <button type="button" className={styles.delete_btn}
                        onClick={() => acceptRejectComment(comment._id)} >
                        تایید
                      </button>
                    )
                  }

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


