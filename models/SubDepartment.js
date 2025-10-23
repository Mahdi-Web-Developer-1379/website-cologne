import mongoose from "mongoose";
require("./Department");
import TicketModel from "./Ticket";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

schema.pre("findOneAndDelete", async function (next) {
  const subId = this.getQuery()["_id"];
  
  
  await TicketModel.deleteMany({ subDepartment: subId });

  next();
});

const model =mongoose.models.SubDepartment || mongoose.model("SubDepartment", schema);

export default model;