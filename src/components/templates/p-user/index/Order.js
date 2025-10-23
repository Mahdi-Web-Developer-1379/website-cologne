
import styles from "./order.module.css";

const Order = ({ order }) => {
  if (!order) return null;

  return (
    <div className={styles.card}>
      
      <div className={styles.userInfo}>
        <img src="/images/commentuser.png" alt={order.name} />
        <p>سفارش دهنده: {order.name}</p>
      </div>

      <div className={styles.orderInfo}>
        
        <p>{new Date(order.createdAt).toLocaleDateString("fa-IR")} تاریخ ثبت سفارش</p>
        <p className={styles.price}>
          {Number(order.finalPrice).toLocaleString("fa-IR")} تومان
        </p>
      </div>
    </div>
  );
};

export default Order;
