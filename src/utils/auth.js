import { hash, compare } from "bcryptjs";
import { verify, sign } from "jsonwebtoken";


const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
}

const verifyPassword = async (password, hashedPassword) => {
    const isValid = await compare(password, hashedPassword)
    return isValid
}

const generateAccessToken = (data) => {
    const token = sign({ ...data }, process.env.AccessTokenPrivateKey, {
        expiresIn: "6h"
    })
    return token
}

const verifyAccessToken = (token) => {
    try {
        const tokenPayload = verify(token, process.env.AccessTokenPrivateKey)
        return tokenPayload
    } catch (err) {
        console.log("verify access token ", err);
        return false
    }
}

const generateRefreshToken = (data) => {
    const token = sign({ ...data }, process.env.RefreshTokenPrivateKey, {
        expiresIn: "15d"
    })
    return token
}

const validateEmail = (email) => {
    const pattern = /^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/
    return pattern.test(email)
}

const validatephone = (phone) => {
    const pattern = /^(?:\+98|0098|0)?(?:9(?:0[0-5]|1\d|2[0-3]|3\d|90|91|92|93|94|98|99))\d{7}$/
    return pattern.test(phone)
}

const validatePassword = (password) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return pattern.test(password)
}



export {
    hashPassword,
    verifyPassword,
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    validateEmail,
    validatephone,
    validatePassword,
    
}