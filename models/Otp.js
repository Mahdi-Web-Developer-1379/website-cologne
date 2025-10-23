import mongoose from "mongoose";

const schema = mongoose.Schema(
    {
        phone: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        expTime: {
            type: Number,
            required: true
        },
        attempts: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

const model = mongoose.models.Otp || mongoose.model("Otp", schema);

export default model