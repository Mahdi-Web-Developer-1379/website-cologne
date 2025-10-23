"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import styles from "./gallery.module.css"



const Gallery = ({img}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = [
    img
  ];
// console.log(img);
  return (
    <section className={styles.sectionSwiper}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={ thumbsSwiper?{ swiper: thumbsSwiper }:undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider"
      >
        {images.map((img,index) => (
          <SwiperSlide key={index}>
            <img src={img} style={{ height: "400px", objectFit: "cover" }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;