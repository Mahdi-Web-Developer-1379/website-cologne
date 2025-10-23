import connectToDB from "../../../../../configs/db";
import { validatephone } from "@/utils/auth";
import axios from "axios";
import OtpModel from "../../../../../models/Otp";
import UserModel from "../../../../../models/User";

function generateOtp(length = 6) {
    return Math.floor(
        100000 + Math.random() * 900000
    ).toString().substring(0, length);
}


export async function POST(req) {


    try {
        connectToDB()
        const body = await req.json()
        const { phone } = body
        if (!validatephone(phone)) {
            return Response.json({ message: "phone is not valid" }, { status: 400 })
        }

        const isUser=await UserModel.findOne({phone})
        if (!isUser) {
            return Response.json({ message: "Not Found User" }, { status: 400 })
        }

        const date = new Date()
        const expTime = date.getTime() + 300000

        const otp=generateOtp()

        const response = await axios.post(
            "https://api.sms.ir/v1/send/verify",
            {
                mobile: phone,
                templateId: 123456,
                parameters: [{ name: "Code", value: otp }]
            },
            {
                headers: {
                    "x-api-key": process.env.SMSIR_API_KEY,
                    'Accept': 'text/plain',
                    "Content-Type": "application/json"
                }
            }
        );


        await OtpModel.create({
            phone,
            code:otp,
            expTime,
            attempts:0
        })

        return Response.json(
            {
              success: true,
            //   otp,
              smsResponse: response.data
            },
            { status: 200 }
          );


    } catch (err) {
        return Response.json({ message: " Server ERR !!!!!", err }, { status: 500 })
    }

}