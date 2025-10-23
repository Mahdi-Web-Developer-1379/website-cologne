import { cookies } from "next/dist/client/components/headers";
import { verifyAccessToken } from "./auth";
import UserModel from "../../models/User";
import connectToDB from "../../configs/db";

const authUser = async () => {
    connectToDB()
    const token = cookies().get('token')
    let user;

    if (token) {
        const tokenPayload = verifyAccessToken(token.value)
        if (tokenPayload) {
            user = await UserModel.findOne({ email: tokenPayload.email })
        }
    }
    return user
}
export {authUser}