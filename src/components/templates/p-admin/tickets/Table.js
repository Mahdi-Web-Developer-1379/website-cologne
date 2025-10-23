'use client'
import React from "react";
import styles from "./table.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { showSwal } from "@/utils/helpers";
export default function DataTable({ tickets, title }) {

  // console.log(tickets);

  const router = useRouter()

  const showTicket = (body) => {
    showSwal(body, undefined, 'بستن')
  }

  const showAnswerdTo=(body)=>{
    showSwal(body, undefined, 'بستن')
  }

  const answerToTicket = async (ticket) => {
    swal({
      title: "لطفا پاسخ مورد نظر را وارد نمایید",
      content: "input",
      buttons: "ثبت پاسخ"
    }).then(async (answered) => {
      if (answered?.trim()) {

        const answer = {
          // ...ticket,
          title: ticket.title,
          body: answered,
          department: ticket.department._id,
          subDepartment: ticket.subDepartment,
          priority: ticket.priority,
          user: ticket.user._id,
          ticketID: ticket._id,
        }
       

        const res = await fetch('/api/tickets/answer', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(answer)
        })
        console.log(res);
        if (res.status === 201) {
          toast.success('پاسخ تیکت با موفقیت ثبت شد')
        } else {
          toast.warn('خطای سرور')
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
              <th>کاربران</th>
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (

              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user.role === "ADMIN" ? "admin" : ticket.user.name}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>
                <td>
                  <button type="button" className={styles.edit_btn}
                    onClick={() => showTicket(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  {
                    ticket.user.role === "ADMIN" ? (
                    <button type="button" className={styles.delete_btn} onClick={()=>{showAnswerdTo(ticket.mainTicket.body)}}>
                      پاسخ ادمین به
                    </button>) : (
                    <button type="button" className={styles.delete_btn} onClick={() => {!ticket.hasAnswer && answerToTicket(ticket) }}>
                  {ticket.hasAnswer?"پاسخ داده اید":"پاسخ میدهید"}
                    </button>)
                  }

                </td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


