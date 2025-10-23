import mongoose from "mongoose";
import UserModel from "./User";
import ProductModel from "./Product";

const schema = mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    items: [
        {
            id:String,
            name: String,
            price: Number,
            count: Number,
            image: String,
        },
    ],
    finalPrice: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true,
    }

)

const model = mongoose.models.Order || mongoose.model("Order", schema)

export default model