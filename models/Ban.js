import mongoose from "mongoose";


const schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
})


const model = mongoose.models.Ban || mongoose.model("Ban", schema)

export default model