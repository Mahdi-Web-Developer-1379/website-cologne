"use client"
import { showSwal } from '@/utils/helpers'
import React, { useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai';
import styles from './addtowishlist.module.css'

function AddToWishlist({ productID }) {
    const [user, setUser] = useState()


    useEffect(() => {
        const authuser = async () => {
            const res = await fetch('/api/auth/me')
            // console.log(res);
            if (res.status === 200) {
                const data = await res.json()

                setUser({ ...data })
            }

        }

        authuser()
    }, [])


    const addToWishlist = async (event) => {
        event.preventDefault()
        
        if (!user?.user?._id) {
            return showSwal('!لاگین کنید', 'error', 'ok')
        }

        const wish = {
            user: user.user._id,
            product: productID
        }

        const res = await fetch('/api/wishlist', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wish)
        })

        if (res.status === 201) {
            return showSwal('با موفقیت افزوده شد', 'success', 'ok')
        }else if (res.status===401) {
            return showSwal('لاگین کنید', 'error', 'ok')
        }else if (res.status===422) {
            return showSwal('این محصول در لیست علاقه مندی ها وجود دارد', 'error', 'ok')
        }

    }

    return (
        <div className={styles.content} onClick={addToWishlist}>
            <AiFillHeart />
            <a href="/">افزودن به علاقه مندی ها</a>
        </div>
    )
}


export default AddToWishlist