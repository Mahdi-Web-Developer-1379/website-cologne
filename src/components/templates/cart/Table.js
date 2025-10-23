"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import { toast } from "react-toastify";
import { useCart } from "@/contexts/CartContext"; 

import stateData from "@/utils/stateData";
import { useState } from "react";
const stateOptions = stateData();

const Table = () => {
  const {
    cart,
    setCart,
    discount,
    setDiscount,
    appliedDiscount,
    setAppliedDiscount,
    stateSelectedOption,
    setStateSelectedOption,
    calcTotalPrice,
    calcShippingPrice,
    getFinalTotal
  } = useCart();

  const [changeAddress, setChangeAddress] = useState(false);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateCount = (id, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (action === "increment") return { ...item, count: item.count + 1 };
        if (action === "decrement") return { ...item, count: Math.max(1, item.count - 1) };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const doDiscount = async () => {
    const res = await fetch("/api/discounts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: discount }),
    });

    if (res.status === 400 || res.status === 404) {
      return toast.warn("این کد اعتبار ندارد");
    } else if (res.status === 200) {
      const discountCode = await res.json();
      setAppliedDiscount(discountCode);
      return toast.success("این کد با موفقیت اعمال شد");
    } else {
      return toast.error("با خطای سرور مواجه شدید");
    }
  };

  return (
    <>
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>جمع</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{(item.count * item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span onClick={() => updateCount(item.id, "decrement")}>-</span>
                    <p>{item.count}</p>
                    <span onClick={() => updateCount(item.id, "increment")}>+</span>
                  </div>
                </td>
                <td className={styles.price}>{item.price.toLocaleString()} تومان</td>
                <td className={styles.product}>
                  <img src={item.image} alt="" />
                  <Link href={"/"}>{item.name}</Link>
                </td>
                <td>
                  <IoMdClose
                    className={styles.delete_icon}
                    onClick={() => removeFromCart(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section>
          <button className={styles.update_btn}>بروزرسانی سبد خرید</button>
          <div>
            <button className={styles.set_off_btn} onClick={doDiscount}>
              اعمال کوپن
            </button>
            <input
              type="text"
              placeholder="کد تخفیف"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </section>
      </div>

      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>
        <div className={totalStyles.subtotal}>
          <p>جمع جزء</p>
          <p>{calcTotalPrice().toLocaleString()} تومان</p>
        </div>
        <p className={totalStyles.motor}>
          هزینه پست: <strong>{calcShippingPrice()}</strong>
        </p>
        <div className={totalStyles.address}>
          <p>حمل و نقل</p>
          <span>حمل و نقل به سراسر کشور</span>
        </div>

        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
            />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{getFinalTotal().toLocaleString()} تومان</p>
        </div>
        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
