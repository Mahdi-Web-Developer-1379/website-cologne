import mongoose from "mongoose";
import DepartmentModel from "./Department";
import SubDepartmentModel from "./SubDepartment";
import UserModel from "./User";


const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    subDepartment: {
        type: mongoose.Types.ObjectId,
        ref: "SubDepartment",
        required: true,
    },
    priority: {
        type: Number,
        default: 1,
        enum: [1, 2, 3],
    },
    hasAnswer:{
        type:Boolean,
        default:false
    },
    isAnswer:{
        type:Boolean,
        default:false
    },
    mainTicket:{
        type: mongoose.Types.ObjectId,
        ref:'Ticket',
        required:false
    }
},
    {
        timestamps: true,
    }
)


schema.pre("findOneAndDelete", async function (next) {
    const ticketId = this.getQuery()["_id"];
    await mongoose.model("Ticket").deleteMany({ mainTicket: ticketId });
    next();
  });
  


const model = mongoose.models.Ticket || mongoose.model("Ticket", schema)

export default model