import mongoose from "mongoose";
import UserModel from "./User";
import ProductModel from "./Product";

const schema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true
    }
},
    {
       timestamps:true
    }
)


const model = mongoose.models.Wishlist || mongoose.model("Wishlist", schema)

export default model