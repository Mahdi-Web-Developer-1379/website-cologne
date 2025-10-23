
import styles from "./order.module.css";

const Order = (order) => {
    if (!order) return <p className={styles.empty}>هیچ سفارشی یافت نشد.</p>;

    const data = order._doc || order;

    return (
        <section className={styles.adminticket}>
            <div className={styles.ticket_main}>

                <div>
                    <div>
                        <p>{data?.name || "بدون نام"}</p>
                        <span>
                            {data?.createdAt
                                ? new Date(data.createdAt).toLocaleDateString("fa-IR")
                                : ""}
                        </span>
                    </div>
                    <img src="/images/commentuser.png" alt={data?.name || ""} />
                </div>
            </div>

            <div className={styles.ticket_text}>
                <p>
                    مبلغ نهایی:{" "}
                    {data?.finalPrice
                        ? Number(data.finalPrice).toLocaleString("fa-IR") + " تومان"
                        : "نامشخص"}
                </p>
                <p>
                    آدرس: {data?.state}، {data?.city}، {data?.address}
                </p>
                <p>شماره تلفن :{data?.phone}</p>
                <p>ایمیل:{data?.email}</p>
                <p>کد پستی: {data?.postalCode}</p>
                {data?.note && <p>توضیحات: {data.note}</p>}

                <div className={styles.order_items}>
                    <h4>محصولات:</h4>
                    {Array.isArray(data?.items) && data.items.length > 0 ? (
                        data.items.map((item, i) => (
                            <div key={i} className={styles.item}>
                                <img
                                    src={item.image || "/images/no-image.png"}
                                    alt={item.name}
                                />
                                <div>
                                    <p>{item.name}</p>
                                    <span>
                                        {item.count} ×{" "}
                                        {Number(item.price).toLocaleString("fa-IR")} تومان
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>محصولی ثبت نشده است.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Order;
