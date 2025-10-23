"use client";
import styles from "./product.module.css";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import swal from "sweetalert";
import { deletePFW } from "@/utils/helpers";
const Card = (product) => {
  // console.log(product);

  const removeProduct = (productId) => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async(result) => {
      if (result) {
        const res=await fetch(`/api/wishlist/${productId}`,{
          method:"DELETE"
        })
        if (res.status===200) {
          deletePFW(200)
        }else{
          deletePFW('')
        }
      }
    });
  };

  return (
    <div className={styles.card}>
      <Link href={"/product/123"}>
        <img
          width={283}
          height={283}
          src={product.image}
          alt=""
        />
      </Link>
      <p dir="rtl">{product.name}</p>
      <div>
        <div>
          {new Array(Math.max(0, Math.round(product?.score ?? 0))).fill(0).map((item, index) => (
            <FaStar key={index} />
          ))}
          {new Array(Math.max(0, 5 - Math.round(product?.score ?? 0))).fill(0).map((item, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <span>{product.price?.toLocaleString()} تومان</span>
      </div>
      <button onClick={() => removeProduct(product._id)} className={styles.delete_btn}>
        حذف محصول از علاقه مندی ها
      </button>
    </div>
  );
};

export default Card;
