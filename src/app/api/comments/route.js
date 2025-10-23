import connectToDB from "../../../../configs/db";
import ProductModel from "../../../../models/Product";
import CommentModel from "../../../../models/Comment";
import { authUser } from "@/utils/authUser";

export async function POST(req) {
    connectToDB()
    try {
        const reqbody = await req.json()

        const user=await authUser()
        

        const { username, body, email, score, productID,userID } = reqbody

        if (!user) {
            return Response.json({message:'User Not Found'},{status:422})
        }
        if (user.name!==username ||user.email !==email) {
            return Response.json({message:'اسم یا ایمیل شما معتبر نیست'},{status:401})
        }

        const comment = await CommentModel.create({
            username,
            body,
            email,
            score,
            isAccept: false,
            productID,
            userID
        })

        const commentS=await CommentModel.find({productID})

        const avg = commentS.reduce((acc, c) => acc + c.score, 0) / commentS?.length



        const updateProduct = await ProductModel.findOneAndUpdate({
            _id: productID
        },
            {
                $set:{
                    score:avg
                },
                $push: {
                    comments: comment._id
                }
            })

        return Response.json(
            {
                meesage: "comment created successFully"
            },
            {
                status: 201,
            })

    } catch (err) {
        return Response.json({ message: "Server Err", err }, { status: 500 })
    }
}

export async function GET() {
    connectToDB()
    const user=await authUser()

    if (!user) {
        return Response.json({message:'User Not Found'},{status:422})
    }

    const comments = await CommentModel.find({}, '-__v')
    return Response.json(comments)
}