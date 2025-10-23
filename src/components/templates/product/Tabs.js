"use client";
import React from "react";
import styles from "./tabs.module.css";
import { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";
const Tabs = ({isLogin,product}) => {
  const [tab, setTab] = useState("description");
  return (
    <div  className={styles.tabs}>
      <input
        type="radio"
        id="description"
        name="tab-control"
        checked={tab === "description" }
        onChange={() => setTab("description")}
      />
      <input
        type="radio"
        id="moreInfoes"
        name="tab-control"
        checked={tab === "moreInfoes" }
        onChange={() => setTab("moreInfoes")}
      />
      <input
        type="radio"
        id="comments"
        name="tab-control"
        checked={tab === "comments" }
        onChange={() => setTab("comments")}
      />
      <ul>
        <li title="Features">
          <label htmlFor="description" role="button">
            {" "}
            توضیحات{" "}
          </label>
        </li>
        <li title="Delivery Contents">
          <label htmlFor="moreInfoes" role="button">
            {" "}
            اطلاعات بیشتر{" "}
          </label>
        </li>
        <li title="Shipping">
          <label htmlFor="comments" role="button">
            {" "}
            نظرات ( {isLogin? product.comments.filter(comment=>comment.isAccept).length:'0'})
          </label>
        </li>
      </ul>

      <div className={styles.contents}>
        <section className={styles.tabs_content}>
          <Description longDescription={product.longDescription}/>
        </section>
        <section className={styles.tabs_content}>
          <MoreInfoes product={product} />
        </section>
        <section className={styles.tabs_content}>
          <Comments isLogin={isLogin}  product={product} />
        </section> 
      </div>
    </div>
  );
};

export default Tabs;