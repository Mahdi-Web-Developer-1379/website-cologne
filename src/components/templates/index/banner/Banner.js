"use client"
import React from 'react';


import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';



import { Navigation, Autoplay } from 'swiper/modules';

export default function Banner() {
    return (
        <>
            <Swiper
                
                loop={true}
                navigation={true}
                autoplay={{ delay: 5000 }}
                modules={[Navigation, Autoplay]}
                className="mySwiper home-slider"
            >
                <SwiperSlide className='swiper-slide'>
                    <img src='/images/eaude.jpg'></img>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='/images/eaude2.jpg'></img>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='/images/eaude3.jpg'></img>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='/images/eaude4.jpg'></img>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='/images/eaude5.jpg'></img>
                </SwiperSlide>
                

            </Swiper>





        </>
    );
}


