import BanModel from "../../../../../models/Ban";
import connectToDB from "../../../../../configs/db";
import { validateEmail, validatephone } from "@/utils/auth";
import { authUser } from "@/utils/authUser";

export async function POST(req) {
    try {
        connectToDB()
        const userAdmin = await authUser()

        if (userAdmin?.role !== 'ADMIN') {
            return Response.json({ message: "User Is Not ADMIN" }, { status: 403 })
        }

        const body = await req.json()

        const { email, phone } = body

        if (!validateEmail(email) || !validatephone(phone)) {
            return Response.json({ message: "یمیل یا شماره موبایل معتبر نیست" }, { status: 400 })
        }

        await BanModel.create({email,phone})

        return Response.json({message:'User Banned Successfully'},{status:200})


    } catch (err) {
        return Response.json({ message: " Server ERR !!!!!", err }, { status: 500 })
    }
}