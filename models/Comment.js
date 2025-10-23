import mongoose from "mongoose";
import ProductModel from "./Product";
import UserModel from "./User";

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default:5
    },
    date: {
        type: Date,
        default: () => Date.now(),
        immutable:false
    },
    isAccept:{
        type:Boolean,
        default:false
    },
    productID:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    userID:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})


const model=mongoose.models.Comment || mongoose.model("Comment",schema)

export default model
