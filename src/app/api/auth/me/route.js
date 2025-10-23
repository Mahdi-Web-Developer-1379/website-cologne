import { cookies } from "next/dist/client/components/headers";
import connectToDB from "../../../../../configs/db";
import { verifyAccessToken } from "@/utils/auth";
import UserModel from "../../../../../models/User";

export async function GET(req) {
    connectToDB()
    const token = cookies().get('token')
    let user;

    if (token) {
        const tokenPayload = verifyAccessToken(token.value)
        if (tokenPayload) {
            user = await UserModel.findOne(
                { email: tokenPayload.email },
                '-password -refreshToken -__v'
            )
        }
        return Response.json({user})
    } else {
        return Response.json({ message: 'User Not found' }, { status: 401 })
    }
}