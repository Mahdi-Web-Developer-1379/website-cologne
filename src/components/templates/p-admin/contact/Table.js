'use client'
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";

import { showSwal } from "@/utils/helpers";
export default function DataTable({contactAdmin}) {


  const router = useRouter()

  const showContactBody = (body) => {
    showSwal(body, undefined, 'بستن')
  }

  return (
    <div>
      
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>ایمیل</th>
              <th>شماره تلفن</th>
              <th>مشاهده</th>
            </tr>
          </thead>
          <tbody>
            {contactAdmin.map((contact, index) => (

              <tr key={contact._id}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button type="button" className={styles.edit_btn}
                    onClick={() => showContactBody(contact.message)}
                  >
                    مشاهده
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


