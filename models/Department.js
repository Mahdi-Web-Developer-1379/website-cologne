import mongoose from "mongoose";
import SubDepartmentModel from "./SubDepartment";
import TicketModel from "./Ticket";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});


schema.pre("findOneAndDelete", async function (next) {
  const departmentId = this.getQuery()["_id"];
  
   await SubDepartmentModel.deleteMany({ department: departmentId });
   await TicketModel.deleteMany({ department: departmentId });

  next();
});


const model =mongoose.models.Department || mongoose.model("Department", schema);

export default model;