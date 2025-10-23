import { generateAccessToken, hashPassword, validateEmail, validatePassword, validatephone } from "@/utils/auth"
import connectToDB from "../../../../../configs/db"
import UserModel from "../../../../../models/User"
import { role } from "@/utils/constants"
import UserBans from "../../../../../models/Ban"

export async function POST(req) {
    try {
        connectToDB()

        const body = await req.json()

        const { name, email, phone, password } = body

        if (!name.trim()) {
            return Response.json({ message: "name is not valid" }, { status: 400 })
        }

        const isValidPhone = validatephone(phone)
        if (!isValidPhone) {
            return Response.json({ message: "phone is not valid" }, { status: 400 })
        }

        if (email.trim()) {
            const isValidEmail = validateEmail(email)
            if (!isValidEmail) {
                return Response.json({ message: "email is not valid" }, { status: 400 })
            }
        }

        const isValidPassword = validatePassword(password)
        if (!isValidPassword) {
            return Response.json({ message: "password is not valid" }, { status: 400 })
        }



        const isUserExist = await UserModel.findOne({
            $or: [ { phone }, { email }]
        })
        
        const isUserBan = await UserBans.findOne({
            $or: [ { phone }, { email }]
        })

        if (isUserExist||isUserBan) {
            return Response.json({ message: "This  email or phone is exist already or Ban" }, { status: 422 })
        }

        const hashedPassword = await hashPassword(password)

        // const accessToken = generateAccessToken({ name })
        const accessToken=generateAccessToken({email})
        
        const users = await UserModel.find({})

        await UserModel.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: users.length > 0 ? role.USER : role.ADMIN
        })

        return Response.json({ message: "User Created SuccessFully" }, {
            status: 201,
            headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` }
        })



    } catch (err) {
        return Response.json({ message: " Server ERR !!!!!", err }, { status: 500 })
    }
}