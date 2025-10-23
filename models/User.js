import mongoose from "mongoose";
import CommentModel from "./Comment";
import TicketModel from "./Ticket";
import WishlistModel from "./Wishlist";
import OrderModel from "./Order";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER"
    },
    refreshToken: {
        type: String
    }
})


schema.pre("findOneAndDelete", async function (next) {
    const userId = this.getQuery()["_id"];

    await CommentModel.deleteMany({ userID: userId });
    await TicketModel.deleteMany({ user: userId });
    await WishlistModel.deleteMany({ user: userId }); 
    await OrderModel.deleteMany({userID:userId})
    next();
});





const model = mongoose.models.User || mongoose.model("User", schema)

export default model