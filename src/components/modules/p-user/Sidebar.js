"use client";

import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag } from "react-icons/fa";
import { MdSms, MdLogout } from "react-icons/md";

import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import swal from "sweetalert";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";
import { useState } from "react";
const Sidebar = () => {
  
  const route=useRouter()

  const [isOpen, setIsOpen] = useState(false);


  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async(result) => {
      if (result) {
        const res=await fetch('/api/auth/signout',{
          method:"POST"
        })
        if (res.status===200) {
          toast.success('از اکانت خود خارج شدید',{
            onClose:()=>{
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
            <Link href={"/p-user"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>
            <Link href={"/p-user/orders"}>
              <FaShoppingBag />
              سفارش ها
            </Link>
            <Link href={"/p-user/tickets"}>
              <MdSms />
              تیکت های پشتیبانی
            </Link>
            <Link href={"/p-user/comments"}>
              <FaComments />
              کامنت ها
            </Link>
            <Link href={"/p-user/wishlist"}>
              <FaHeart />
              علاقه مندی
            </Link>
            <Link href={"/p-user/account-details"}>
              <TbListDetails />
              جزئیات اکانت
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
