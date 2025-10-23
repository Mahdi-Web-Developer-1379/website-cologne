"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DataTable({ products, title }) {
  const router = useRouter();
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [weigth, setWeigth] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [smell, setSmell] = useState("");
  const [tags, setTags] = useState("");
  const [img, setImg] = useState({});

  const deleteProduct = async (ID) => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/products", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: ID }),
        });
        if (res.status === 200) {
          toast.success("محصول با موفقیت حذف شد", {
            onClose: () => router.refresh(),
          });
        } else toast.error("خطایی وجود دارد");
      }
    });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setName(product.name)
    setPrice(product.price)
    setShortDescription(product.shortDescription)
    setLongDescription(product.longDescription)
    setWeigth(product.weigth)
    setSuitableFor(product.suitableFor)
    setSmell(product.smell)
    setTags(product.tags.join('،'))
    setImg(product.image)
    
  };

 

  const handleUpdate = async (id) => {
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

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: formData,
    });
    
    if (res.ok) {
      toast.success("محصول با موفقیت ویرایش شد", {
        onClose: () => router.refresh(),
      });
      setEditingProduct(null);
    } else toast.error("خطا در ویرایش محصول");
  };

  return (
    <div>
      <h1 className={styles.title}>
        <span>{title}</span>
      </h1>

      
      <div className={styles.table_container}>
  <table className={styles.table}>
    <thead>
      <tr>
        <th>شناسه</th>
        <th>نام</th>
        <th>قیمت</th>
        <th>امتیاز</th>
        <th>ویرایش</th>
        <th>حذف</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => (
        <tr key={product._id}>
          <td data-label="شناسه">{index + 1}</td>
          <td data-label="نام">{product.name}</td>
          <td data-label="قیمت">{product.price.toLocaleString()}</td>
          <td data-label="امتیاز">{Math.round(product.score)}</td>
          <td  data-label="ویرایش">
            <button
              className={styles.edit_btn}
              onClick={() => handleEditClick(product)}
            >
              ویرایش
            </button>
          </td>
          <td data-label="حذف">
            <button
              className={styles.delete_btn}
              onClick={() => deleteProduct(product._id)}
            >
              حذف
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {editingProduct && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>ویرایش محصول</h2>

            <div className={styles.formGrid}>
              <label>نام:</label>
              <input name="name" value={name} onChange={(e)=>setName(e.target.value)} />

              <label>قیمت:</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
              />

              <label>توضیح کوتاه:</label>
              <textarea
                name="shortDescription"
                value={shortDescription}
                onChange={(e)=>setShortDescription(e.target.value)}
              />

              <label>توضیح بلند:</label>
              <textarea
                name="longDescription"
                value={longDescription}
                onChange={(e)=>setLongDescription(e.target.value)}
              ></textarea>

              <label>وزن:</label>
              <input
                name="weigth"
                value={weigth}
                onChange={(e)=>setWeigth(e.target.value)}
              />

              <label>مناسب برای:</label>
              <select
                name="suitableFor"
                value={suitableFor}
                onChange={(e)=>setSuitableFor(e.target.value)}
              >
                <option value="">انتخاب کنید</option>
                <option value="MEN">مردانه</option>
                <option value="WOMEN">زنانه</option>
                <option value="ALL">همه</option>
              </select>

              <label>رایحه:</label>
              <input
                name="smell"
                value={smell}
                onChange={(e)=>setSmell(e.target.value)}
              />

              <label>تگ‌ها (با، جدا کنید):</label>
              <input
                name="tags"
                value={tags}
                onChange={(e)=>setTags(e.target.value)}
              />

              <label>تصویر:</label>
              <input type="file" name="img" onChange={(event) => setImg(event.target.files[0])} />
            </div>

            <div className={styles.formButtons}>
              <button
                className={styles.edit_btn}
                onClick={() => handleUpdate(editingProduct)}
              >
                ذخیره تغییرات
              </button>
              <button
                className={styles.delete_btn}
                onClick={() => setEditingProduct(null)}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}












