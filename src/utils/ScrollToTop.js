"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/styles/ScrollToTop.module.css'
import { MdKeyboardArrowUp } from 'react-icons/md'

export default function ScrollToTop() {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisible = () => {
            window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
        }
        window.addEventListener('scroll', toggleVisible)
        return () => window.removeEventListener("scroll", toggleVisible)
    }, [])

    const scrolltotop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (


        <button className={isVisible ? styles.buttonVisible:styles.button} onClick={scrolltotop}>
            <MdKeyboardArrowUp />
        </button>




    )
}
