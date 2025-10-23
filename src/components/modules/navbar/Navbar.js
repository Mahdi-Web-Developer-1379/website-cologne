"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi"; 

function Navbar({ isLogin }) {
  const [fixTop, setFixTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fixNavbarToTop = () => {
      if (window.scrollY > 0) {
        setFixTop(true);
      } else {
        setFixTop(false);
      }
    };

    window.addEventListener("scroll", fixNavbarToTop);
    return () => window.removeEventListener("scroll", fixNavbarToTop);
  }, []);

  return (
    <nav className={fixTop ? styles.navbar_fixed : styles.navbar}>
      <main>

        <ul className={`${styles.links} ${menuOpen ? styles.active : ""}`}>
          <li><Link href="/">صفحه اصلی</Link></li>
          <li><Link href="/category">فروشگاه</Link></li>
          <li><Link href="/contact-us">تماس با ما</Link></li>
          <li><Link href="/about-us">درباره ما</Link></li>
          <li><Link href="/rules">قوانین</Link></li>

          {!isLogin ? (
            <li><Link href="/login-register">ورود / عضویت</Link></li>
          ) : (
            <div className={styles.dropdown}>
              {
                isLogin.role === "USER" ? (
                  <Link href="/p-user">
                    <IoIosArrowDown className={styles.dropdown_icons} />
                    حساب کاربری
                  </Link>
                ) : (
                  <Link href="/p-admin">
                    <IoIosArrowDown className={styles.dropdown_icons} />
                    حساب مدیریت
                  </Link>
                )
              }

              <div className={styles.dropdown_content}>
                {
                  isLogin.role === "USER" ? (
                    <>
                      <Link href='/p-user/orders'>سفارش ها</Link>
                      <Link href='/p-user/orders'>تیکت های پشتیبانی</Link>
                      <Link href='/p-user/tickets'>کامنت ها</Link>
                      <Link href='/p-user/wishlist'>علاقه مندی</Link>
                      <Link href='/p-user/account-details'>جزئیات اکانت</Link>
                    </>
                  ) : (
                    <>
                      <Link href='/p-admin/products'>محصولات</Link>
                      <Link href='/p-admin/users'>کاربران</Link>
                      <Link href='/p-admin/comments'>کامنت ها</Link>
                      <Link href='/p-admin/tickets'>تیکت ها</Link>
                      <Link href='/p-admin/discounts'>تخفیفات</Link>
                      <Link href='/p-admin/orders'>سفارشات</Link>
                      <Link href='/p-admin/contact'>ارتباط با مدیریت</Link>


                    </>
                  )
                }

              </div>
            </div>
          )}
        </ul>


        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <FaShoppingCart />
          </Link>
          <Link href="/wishlist">
            <FaRegHeart />
          </Link>
        </div>


        <div className={styles.menu_toggle} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </main>
    </nav>
  );
}

export default Navbar;














