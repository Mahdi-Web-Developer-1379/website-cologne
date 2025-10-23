import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";


const Card = (product) => {

  const score = Math.round(Number(product.score) || 0)

  return (
    <div data-aos="fade-up" data-aos-duration="2000" className={styles.card}>
      <Link href={`/product/${product._id}`}>
        <div className={styles.details_container}>
          <img
            src={product.image}
            alt=""
          />


        </div>
      </Link>



      <div className={styles.details}>

        {product.name}

        <div>
          {
            new Array(score).fill(0).map((item, index) => {
              return <FaStar key={index} />
            })
          }

          {
            new Array(5 - score).fill(0).map((item, index) => {
              return <FaRegStar key={index} />
            })
          }
        </div>
        <span>{product?.price?.toLocaleString() || 0}</span>
      </div>

    </div>
  );
};

export default Card;