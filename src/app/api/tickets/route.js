import connectToDB from "../../../../configs/db";
import TicketModel from "../../../../models/Ticket";
import { authUser } from "@/utils/authUser";
import { isValidObjectId } from "mongoose"
import DepartmentModel from "../../../../models/Department";
import SubDepartmentModel from "../../../../models/SubDepartment";

export async function POST(req) {

    try {
        connectToDB()
        const user = await authUser()
        if (!user) {
            return Response.json({ message: "you are not login" }, { status: 401 })
        }
        const reqBody = await req.json()
        const { title, body, department, subDepartment, priority } = reqBody

        //Validate

     

        if (!title.trim() || !body.trim()) {
            return Response.json({ message: "Body OR Title Is Empty" }, { status: 400 })
        }
        if (![1, 2, 3].includes(priority)) {
            return Response.json({ message: "priority Is Not True" }, { status: 400 })
        }

        const isValidDPT=isValidObjectId(department)
        const isValidSDPT=isValidObjectId(subDepartment)

        if (!isValidDPT || !isValidSDPT) {
            return Response.json({ message: "Your ID Is Not valid" }, { status: 404 })
        }
        
        
        const findDepartment = await DepartmentModel.findOne({ _id: department })
        const findSubDepartment = await SubDepartmentModel.findOne({ _id: subDepartment })

        if (!findDepartment || !findSubDepartment) {
            return Response.json({ message: "Your ID Is Not Found" }, { status: 404 })
        }

        await TicketModel.create({
            title,
            body,
            department,
            subDepartment,
            priority,
            user: user._id
        })

        return Response.json({ message: "Ticket Saved SuccessFully" }, { status: 201 })

    } catch (err) {
        return Response.json({ message: "server err" }, { status: 500 })
    }


}