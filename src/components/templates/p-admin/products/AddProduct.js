"use client";
import React, { useState } from "react";
import styles from "./addproduct.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function AddProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [weigth, setWeigth] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [smell, setSmell] = useState("");
  const [tags, setTags] = useState("");
  const [img, setImg] = useState({});

  const addProduct = async () => {
    

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("weigth", weigth);
    formData.append("suitableFor", suitableFor);
    formData.append("smell", smell);
    formData.append("tags", JSON.stringify(tags.split("،")));
    formData.append("image", img);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });
    
    
    // console.log("Res ->", await res.json());
    if (res.status === 201) {
      toast.success('محصول مورد نظر با موفقیت افزوده شد', {
        onClose: () => {
          router.refresh()
        }
      })
    } else if (res.status === 400) {
      toast.warn('فیلد ها رو درست پر کنید')
    }else{
      toast.error('خطای سرور')
    }

  };
  return (
    <section className={styles.discount}>
      <p>افزودن محصول جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>نام محصول</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="لطفا نام محصول را وارد کنید"
            type="text"
          />
        </div>
        <div>
          <label>مبلغ محصول</label>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="لطفا مبلغ محصول را وارد کنید"
            type="text"
          />
        </div>

        <div>
          <label>توضیحات کوتاه</label>
          <textarea
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            placeholder="توضیحات کوتاه محصول"
            type="text"
          />
        </div>
        <div>
          <label>توضیحات بلند</label>
          <textarea
            value={longDescription}
            onChange={(event) => setLongDescription(event.target.value)}
            placeholder="توضیحات بلند محصول"
            type="text"
          />
        </div>
        <div>
          <label>حجم محصول (ml)</label>
          <input
            value={weigth}
            onChange={(event) => setWeigth(event.target.value)}
            placeholder="حجم محصول"
            type="text"
          />
        </div>
        <div>
          <label>مناسب برای:</label>
          <select
            value={suitableFor}
            onChange={(event) => setSuitableFor(event.target.value)}
            className="w-full p-2 border rounded-md text-gray-700"
          >
            <option value="-1">مناسب برای ..</option>
            <option value="ALL">همه</option>
            <option value="MEN">مردان</option>
            <option value="WOMEN">خانم‌ها</option>
          </select>
        </div>
        <div>
          <label>نوع رایحه</label>
          <input
            value={smell}
            onChange={(event) => setSmell(event.target.value)}
            placeholder="گرم و شیرین و ........"
            type="text"
          />
        </div>
        <div>
          <label>تگ های محصول</label>
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="مثال:عطر زنانه، ادکلن زنانه، رایحه خوش، عطر شبانه، عطر گرم "
            type="text"
          />
        </div>
        <div>
          <label>تصویر محصول</label>
          <input
            onChange={(event) => setImg(event.target.files[0])}
            type="file"
          />
        </div>
      </div>
      <button  onClick={addProduct}>افزودن</button>
    </section>
  );
}

export default AddProduct;
