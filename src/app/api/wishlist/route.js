
import connectToDB from "../../../../configs/db"
import WishlistModel from "../../../../models/Wishlist"
import { authUser } from "@/utils/authUser"
// import UserModel from "../../../../models/User"
import ProductModel from "../../../../models/Product"

export async function POST(req) {


    try {

        await connectToDB()
        const body = await req.json()
        const { user, product } = body


        const verifieduser = await authUser()

        if (!verifieduser) {
            return Response.json({ message: "User Not Found" }, { status: 401 })
        }

        if (verifieduser._id.toString() !== user) {
            return Response.json({ message: "Please Login Again" }, { status: 401 })
        }

        const findProduct = await ProductModel.findOne({ _id: product })
        if (findProduct?._id.toString() !== product) {
            return Response.json({ message: "This Product Is Not Found" }, { status: 403 })
        }

        const productInWish=await WishlistModel.findOne({product,user})

        if (productInWish) {
            return Response.json({ message: "This Product Is In Wishlist" }, { status: 422 })
        }


        await WishlistModel.create({ user, product })

        return Response.json({ message: 'product add to wishlist successfully' }, { status: 201 })


    } catch (err) {
        return Response.json({ message: "Server Err", error: err.message }, { status: 500 })
    }
}


