import connectToDB from "../../../../configs/db";
import { validateEmail, validatephone } from "@/utils/auth";
import UserModel from "../../../../models/User";
import { authUser } from "@/utils/authUser";
import { isValidObjectId } from "mongoose";

export async function POST(req) {
    try {
        connectToDB()
        const body = await req.json()
        const { name, email, phone } = body
        const user = await authUser()

        if (!validateEmail(email) || !validatephone(phone) || !name.trim()) {
            return Response.json({ message: "phone or email or name is not valid" }, { status: 400 })
        }

        const emailExist = await UserModel.findOne({ email, _id: { $ne: user._id } })

        if (emailExist) {
            return Response.json({ message: "email is Exists" }, { status: 400 })
        }

        const phoneExists = await UserModel.findOne({ phone, _id: { $ne: user._id } })

        if (phoneExists) {
            return Response.json({ message: "phone is Exists" }, { status: 400 })
        }


        const findedUser = await UserModel.findOneAndUpdate({ _id: user._id }, {
            $set: { name, email, phone }
        })

        if (!findedUser) {
            return Response.json({ message: "User Not Found" }, { status: 422 })

        }


        return Response.json(
            {
                meesage: "User Data Update SuccessFully"
            },
            {
                status: 200,
            })



    } catch (error) {
        return Response.json({ message: "Server Err", err }, { status: 500 })
    }
}


export async function DELETE(req) {
    try {
        connectToDB()

        const userAdmin = await authUser()

        if (userAdmin?.role !== 'ADMIN') {
            return Response.json({ message: "User Is Not ADMIN" }, { status: 403 })
        }

        const body = await req.json()
        const { id } = body

        if (!isValidObjectId(id)) {
            return Response.json({ message: "شناسه معتبر نیست" },{status:400});
        }

        const user = await UserModel.findOne({ _id: id })

        if (!user) {
            return Response.json({ message: "User Not Found" }, { status: 404 })
        }

        await UserModel.findOneAndDelete({ _id: id })
        return Response.json({ message: "User delete SuccessFully" }, { status: 200 })


    } catch (err) {
        return Response.json({ message: "server err!!!!" }, { status: 500 })
    }
}



export async function GET() {
    connectToDB()

    const userAdmin = await authUser()

    if (userAdmin?.role !== 'ADMIN') {
        return Response.json({ message: "User Is Not ADMIN" }, { status: 403 })
    }

    try {
        const users = await UserModel.find({})
        const safeUsers = users.map(user => ({
            ...user,
            _id: user._id.toString()
        }));

        return Response.json(safeUsers, { status: 200 });
    } catch (err) {
        return Response.json({ message: "err" })
    }

}