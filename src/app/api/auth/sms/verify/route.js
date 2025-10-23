import { generateAccessToken } from "@/utils/auth";
import connectToDB from "../../../../../../configs/db";
import OtpModel from "../../../../../../models/Otp";
import UserModel from "../../../../../../models/User";


export async function POST(req) {

    try {
        connectToDB()

        const body = await req.json()

        const { code, phone } = body

        const otp = await OtpModel.findOne({ phone })

        if (!otp) {
            return Response.json({ message: "کدی یافت نشد" }, { status: 404 })
        }

        const now = Date.now();


        if (otp.expTime < now) {
            await otp.deleteOne();
            return Response.json({ message: "کد منقضی شده" }, { status: 410 });
        }

        if (otp.attempts >= 3) {
            await otp.deleteOne();
            return Response.json({ message: "کد به خاطر تلاش بیش از حد باطل شد" }, { status: 403 });
        }



        if (otp.code === code) {
            await otp.deleteOne()
            const user = await UserModel.findOne({ phone })
            const accessToken = generateAccessToken({ email: user.email })
            return Response.json(
                { message: "کد صحیح است" },
                {
                    status: 200,
                    headers: { "Set-Cookie": `token=${accessToken};httpOnly=true; path=/;` }
                }
            );
        } else {
            otp.attempts += 1;
            await otp.save();
            return Response.json({ message: "کد اشتباه است" }, { status: 409 });
        }




    } catch (err) {
        return Response.json({ message: " Server ERR !!!!!", err }, { status: 500 })
    }

}