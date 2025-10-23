import {isValidObjectId} from "mongoose"
import connectToDB from "../../../../../configs/db"
import UserModel from "../../../../../models/User"
import { authUser } from "@/utils/authUser"

export async function PUT(req) {

    try {
        await connectToDB()
        const userAdmin = await authUser()

        if (userAdmin?.role !== 'ADMIN') {
            return Response.json({ message: "User Is Not ADMIN" }, { status: 403 })
        }

        const body = await req.json()
        const { id } = body

        if (!isValidObjectId(id)) {
            return Response.json({ message: "شناسه معتبر نیست" },{status:400});
        }

        const user=await UserModel.findOne({_id:id})

        if (!user) {
            return Response.json({ message: "User Not Found" }, { status: 404 })
        }

         await UserModel.findOneAndUpdate({ _id: id }, {
            $set: {
                role: user.role === 'ADMIN' ? 'USER' : 'ADMIN'
            }
        })

        

        return Response.json({ message: "User role update SuccessFully" }, { status: 200 })

    } catch (err) {
        return Response.json({ message: "server err!!!!" }, { status: 500 })
    }


}