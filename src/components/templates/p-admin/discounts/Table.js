"use client"
import React from "react";
import styles from "./table.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Table({ discounts, title }) {

  const router = useRouter()


  const deleteDiscount = (discountID) => {
    // console.log(discountID);
    swal({
      title: "آیا از حذف کد تخفیف اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch('/api/discounts', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: discountID })
        })
        // console.log(await res.json());
        if (res.status === 200) {
          toast.success(' حذف کد تخفیف با موفقیت انجام شد باید چند لحظه صبر کنید', {
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
              <th>کد</th>
              <th>درصد</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده شده</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {discounts.slice().reverse().map((discount, index) => (
              <tr key={discount._id}>
                <td
                  className={discount.uses === discount.maxUse ? styles.discount_used : styles.discount_notused}
                >{index + 1}</td>
                <td>{discount.code}</td>
                <td>{discount.percent}</td>
                <td>{discount.maxUse}</td>
                <td>{discount.uses}</td>
                <td>
                  <button
                    type="button" className={styles.delete_btn}
                    onClick={() => deleteDiscount(discount._id)}
                  >
                    حذف
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

export default Table;
