"use client"
import {  FaStar, FaRegStar } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import AddToWishlist from "./AddToWishlist";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const Details = ({ product }) => {

  const router = useRouter()

  const [count, setCount] = useState(1)

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const isInCart = cart.some(item => item.id === product._id)

    if (isInCart) {
      cart.forEach(item => {
        if (item.id === product._id) {
          item.count = item.count + count
        }
      })

      localStorage.setItem('cart', JSON.stringify(cart))
      toast.success('افزایش تعداد محصول با موفقیت انجام شد')

    } else {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        count,
      }
      cart.push(cartItem)

      localStorage.setItem('cart', JSON.stringify(cart))
      toast.success('محصول با موفقیت یه سبد خرید اضافه شد')
      router.refresh()
      window.location.reload()
    }


  }

  return (
    <main className={styles.maindetailes}>
      <Breadcrumb
        title={
          product.name
        }
      />
      <h2>
        {product.name}
      </h2>

      <div className={styles.rating}>
        <div>

          {
            new Array(Math.round(product.score)).fill(0).map((item, index) => {
              return <FaStar key={index} />
            })
          }

          {
            new Array(5 - Math.round(product.score)).fill(0).map((item, index) => {
              return <FaRegStar key={index} />
            })
          }


        </div>
        <p>(دیدگاه {product.comments.length} کاربر)</p>
      </div>

      <p className={styles.price}>{product.price.toLocaleString()} تومان</p>
      <span className={styles.description}>
        {product.shortDescription}
      </span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>

      <div className={styles.cart}>
        <button onClick={addToCart}>افزودن به سبد خرید</button>
        <div>
          <span onClick={() => setCount(Math.max(1, count - 1))}>-</span>
          {count}
          <span onClick={() => setCount(count + 1)}>+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <AddToWishlist productID={product._id} />
      </section>

      <hr />

      <div className={styles.details}>

        <p>
          <strong>برچسب:</strong>
          {product.tags.join(" ,")}
        </p>
      </div>



      <hr />
    </main>
  );
};

export default Details;