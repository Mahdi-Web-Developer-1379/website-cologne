import { authUser } from "@/utils/authUser";
import connectToDB from "../../../../../configs/db";
import { isValidObjectId } from "mongoose";
import CommentModel from "../../../../../models/Comment";


export async function PUT(req) {
    try {
        connectToDB()
        const user = await authUser()
        if (user?.role !== "ADMIN") {
            return Response.json({ message: 'User Not Admin' }, { status: 422 })
        }

        const body = await req.json()
        const { id } = body

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "شناسه معتبر نیست" });
        }

        const comment = await CommentModel.findOne({ _id: id })
        if (!comment) {
            return Response.json({ message: "User Not Found" }, { status: 404 })
        }

        await CommentModel.findOneAndUpdate({ _id: id }, {
            $set: {
                isAccept: comment.isAccept === true ? false : true
            }
        })



        return Response.json({ message: "Comment update SuccessFully" }, { status: 200 })


    } catch (err) {
        return Response.json({ message: err.message }, { status: 500 })
    }
}