import connectToDB from "../../../../../configs/db";
import { validatephone, validateEmail, validatePassword, verifyPassword, generateAccessToken, generateRefreshToken } from "@/utils/auth";
import UserModel from "../../../../../models/User";
import UserBans from "../../../../../models/Ban";

export async function POST(req) {

    try {
        connectToDB()
        const body = await req.json()

        const { identifier, password } = body
        let user;

        if (validateEmail(identifier)) {
            user = await UserModel.findOne({ email: identifier });
        } else if (validatephone(identifier)) {
            user = await UserModel.findOne({ phone: identifier });
        } else {
            return Response.json({ message: "یمیل یا شماره موبایل اصلا معتبر نیست" }, { status: 400 })
        }


        if (!user) {
            return Response.json({ message: "User Not Found" }, { status: 422 })

        }
        const userBan = await UserBans.findOne({
            $or: [{ phone: user.phone }, { email: user.email }]
        })

        if (userBan) {
            return Response.json({ message: "this user is ban" }, { status: 400 })
        }

        if (!validatePassword(password)) {
            return Response.json({ message: "یمیل یا شماره موبایل , رمز معتبر نیست" }, { status: 400 })
        }

        if (!(await verifyPassword(password, user.password))) {
            return Response.json({ message: "یمیل یا شماره موبایل یا رمز معتبر نیست" }, { status: 401 })
        }

        const accessToken = generateAccessToken({ email: user.email })
        const refreshToken = generateRefreshToken({ email: user.email })

        await UserModel.findOneAndUpdate({ email: user.email }, {
            $set: {
                refreshToken
            }
        })

      

        return Response.json(
            { message: "User Login Succesfully" },
            {
                status: 200,
                headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` }

            }
        )

    } catch (err) {
        return Response.json({ message: " Server ERR !!!!!", err }, { status: 500 })
    }

}