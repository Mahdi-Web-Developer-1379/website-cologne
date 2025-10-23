"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import stateData from "@/utils/stateData";
import { useCart } from "@/contexts/CartContext";
import styles from "./details.module.css";

const stateOptions = stateData();

const Details = () => {
    const { setUserDetails } = useCart()

  const { stateSelectedOption, setStateSelectedOption } = useCart();
  const [citySelectedOption, setCitySelectedOption] = useState(null);
  const [citySelectorDisabled, setCitySelectorDisabled] = useState(true);
  const [cityOptions, setCityOptions] = useState([]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };



  return (
    <div className={styles.details}>
      <p className={styles.details_title}>جزئیات صورتحساب</p>
      <form className={styles.form}>
        <div className={styles.group}>
          <label>نام <span>*</span></label>
          <input type="text"  name="fullName" onChange={handleChange} />
        </div>

        <div className={styles.group}>
          <label>استان<span>*</span></label>
          <Select
            defaultValue={stateSelectedOption}
            
            onChange={(selected) => {
                setStateSelectedOption(selected);
                setUserDetails((prev) => ({
                    ...prev,
                    state: selected?.label,
                    city: null, 
                }));
                setCitySelectedOption(null); 
                setCitySelectorDisabled(!selected?.value);
                if (selected?.value) {
                    const cityList = selected.value.map((c) => ({ value: c, label: c }));
                    setCityOptions(cityList);
                } else {
                    setCityOptions([]);
                }
            }}
            isClearable
            isRtl
            isSearchable
            options={stateOptions}
            placeholder=""
          />
        </div>

        <div className={styles.group}>
          <label>شهر<span>*</span></label>
          <Select
            defaultValue={citySelectedOption}
            onChange={(selected) => {
                setCitySelectedOption(selected);
                setUserDetails((prev) => ({
                    ...prev,
                    city: selected?.label,
                }));
            }}
            // onChange={setCitySelectedOption}
            isDisabled={citySelectorDisabled}
            isClearable
            isRtl
            isSearchable
            options={cityOptions}
            placeholder=""
          />
        </div>

        <div className={styles.group}>
          <label>آدرس<span>*</span></label>
          <input type="text"  name="address" onChange={handleChange}/>
        </div>

        <div className={styles.group}>
          <label>کدپستی<span>*</span></label>
          <input type="text" name="postalCode" onChange={handleChange} />
        </div>

        <div className={styles.group}>
          <label>شماره موبایل<span>*</span></label>
          <input type="text" name="phone" onChange={handleChange} />
        </div>

        <div className={styles.group}>
          <label>ایمیل<span>*</span></label>
          <input type="text" name="email" onChange={handleChange} />
        </div>

        <div className={styles.destination}>
          <label>توضیحات سفارش (اختیاری)</label>
          <textarea  name="description" onChange={handleChange}
          cols="30" 
          rows="8" 
          placeholder="اگر توضیحی دارید ثبت کنید">

          </textarea>
        </div>
      </form>
    </div>
  );
};

export default Details;
