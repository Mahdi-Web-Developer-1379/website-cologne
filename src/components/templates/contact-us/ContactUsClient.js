"use client"
// import React from 'react'
import Form from "@/components/templates/contact-us/Form";
import Information from "@/components/templates/contact-us/Information";
import Map from "@/components/templates/contact-us/Map";
import styles from "@/styles/contact-us.module.css";


export default function page() {
    return (
        <>
            <main className={styles.maps}>
                <section>
                    <Map >
                        <span>ادرس فروشگاه</span>
                        <h3>ادرس فروشگاهی رایحه خوش (شعبه اول)</h3>
                        <p>اردبیل شهرک سبلان فاز2 ,میدان باکری به طرف جانبازان , خیابان 13 ابان پلاک 13</p>
                        <p>045-33517685</p>
                    </Map>
                </section>
                <section>
                {/* center={[38.240195, 48.291517]} position={[38.240195, 48.291517]} */}
                    <Map >
                        <span>ادرس فروشگاه</span>
                        <h3>ادرس فروشگاهی رایحه خوش (شعبه دوم)</h3>
                        <p>اردبیل میدان شریعتی , به طرف یحیوی ,روبروی افق کوروش پلاک 7</p>
                        <p>045-33512132</p>
                    </Map>
                </section>
            </main>

            <div className={styles.container}>
                <div className={styles.contents}>
                    <Form />
                    <Information />
                </div>
            </div>
        </>

    )
}
