"use client";
import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms, MdLogout } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import swal from "sweetalert";
import { useState } from "react";
import { toast } from "react-toastify";

const Sidebar = () => {
  const path = usePathname();
  const route = useRouter()


  const [isOpen, setIsOpen] = useState(false);


  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch('/api/auth/signout', {
          method: "POST"
        })
        if (res.status === 200) {
          toast.success('از اکانت خود خارج شدید', {
            onClose: () => {
              route.replace('/')
            }
          })
        }
      }

    });
  };




  return (
    <>

      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>


      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebar_header}>
          <p>خوش اومدی  </p>
        </div>
        <ul className={styles.sidebar_main}>

          <>
            <Link href={"/p-admin"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>

            <Link href={"/p-admin/products"}>
              <FaShoppingBag />
              محصولات
            </Link>
            <Link href={"/p-admin/users"}>
              <FaUsers />
              کاربران
            </Link>
            <Link href={"/p-admin/comments"}>
              <FaComments />
              کامنت ها
            </Link>

            <Link href={"/p-admin/tickets"}>
              <MdSms />
              تیکت ها
            </Link>
            <Link href={"/p-admin/discounts"}>
              <MdOutlineAttachMoney />
              تخفیفات
            </Link>
            <Link href={"/p-admin/orders"}>
              <FaShoppingBag />
              سفارشات
            </Link>
            <Link href={"/p-admin/contact"}>
              <FaUsers />
              ارتباط با مدیریت
            </Link>
          </>

        </ul>
        <div className={styles.logout} onClick={logoutHandler}>
          <MdLogout />
          خروج
        </div>
      </aside>
    </>

  );
};

export default Sidebar;
