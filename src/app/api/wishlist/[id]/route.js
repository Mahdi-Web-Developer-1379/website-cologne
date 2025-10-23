import { authUser } from "@/utils/authUser";
import connectToDB from "../../../../../configs/db";
import WishlistModel from "../../../../../models/Wishlist";



export async function DELETE(req, { params }) {
    try {
        connectToDB()
        const user =await authUser()
        const productID = params.id
        if (!user) {
            Response.json({ message: "Please Login" }, { status: 401 })
        }

        const findPFWD = await WishlistModel.findOneAndDelete({ product: productID, user: user._id })
        
        if (!findPFWD) {
            return Response.json({ message: "Product Not Found" }, { status: 404 })
        }

        return Response.json({ message: 'Product Remove SuccessFully' }, { status: 200 })


    } catch (err) {
        Response.json({ message: "Server Err" }, { status: 500 })
    }

}