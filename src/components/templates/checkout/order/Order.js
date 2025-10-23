"use client";
import { useCart } from "@/contexts/CartContext";
import styles from "./order.module.css";
import { toast } from "react-toastify";

const Order = () => {
    const { cart, calcTotalPrice, calcShippingPrice, getFinalTotal, userDetails } = useCart();



    const handleSubmitOrder = async () => {
        // console.log(userDetails);

        const orderData = {
            customerName: userDetails.fullName,
            phone: userDetails.phone,
            address: userDetails.address,
            city: userDetails.city,
            state: userDetails.state,
            postalCode: userDetails.postalCode,
            email: userDetails.email,
            note: userDetails.description,
            items: cart,
            finalPrice: getFinalTotal(),
        };

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        })
        if (res.status === 400) {
            toast.warn('فیلد ها رو درست پر کنید')
        } else if (res.status === 404) {
            toast.warn('کاربر یافت نشد.')
        } else if (res.status === 403) {
            toast.warn("اطلاعات وارد شده با حساب کاربری شما مطابقت ندارد.")
        } else if (res.status === 201) {
            toast.success("ثبت سفارش شما با موفقیت انجام شد")
        } else {
            toast.error("خطای سرور")
        }

        // console.log(orderData);
    }
    

    return (
        <div className={styles.order}>
            <p className={styles.title}>سفارش شما</p>
            <main className={styles.main}>
                {cart.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <img src={item.image} alt={item.name} className={styles.productImage} />
                        <p>
                            {item.count} × {item.name}
                        </p>
                        <p>{(item.price * item.count).toLocaleString()} تومان</p>
                    </div>
                ))}

                <div className={styles.summary}>
                    <p>جمع محصول: {calcTotalPrice().toLocaleString()} تومان</p>
                </div >

                <div className={styles.summary}>

                    <p>هزینه پست: {calcShippingPrice().toLocaleString()} تومان</p>


                    <p>
                        مجموع کل: <strong>{getFinalTotal().toLocaleString()} تومان</strong>
                    </p>
                </div>
            </main>

            <div className={styles.transaction}>

                <div className={styles.warning}>
                    <p>اطلاعات شخصی شما برای پردازش سفارش و پشتیبانی از تجربه شما در این وبسایت و برای اهداف دیگری که در <strong>سیاست حفظ حریم خصوصی</strong> توضیح داده شده است استفاده می‌شود.</p>
                </div>
              
                <button className={styles.submit} onClick={handleSubmitOrder}>ثبت سفارش</button>
               
            </div>

        </div>
    );
};

export default Order;
