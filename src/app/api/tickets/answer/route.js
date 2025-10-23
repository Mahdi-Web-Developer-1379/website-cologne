import { authUser } from "@/utils/authUser";
import connectToDB from "../../../../../configs/db";
import { isValidObjectId } from "mongoose";
import TicketModel from "../../../../../models/Ticket";
import DepartmentModel from "../../../../../models/Department";
import SubDepartmentModel from "../../../../../models/SubDepartment";




export async function POST(req) {

    try {

        connectToDB()
        const userAdmin = await authUser()

        if (userAdmin?.role !== 'ADMIN') {
            return Response.json({ message: "User Is Not ADMIN" }, { status: 403 })
        }

        const reqBody = await req.json()
        const { title, body, department, subDepartment, priority, ticketID } = reqBody

        if (!title.trim() || !body.trim()) {
            return Response.json({ message: "Body OR Title Is Empty" }, { status: 400 })
        }
        if (![1, 2, 3].includes(priority)) {
            return Response.json({ message: "priority Is Not True" }, { status: 400 })
        }
        
        const isValidDPT = isValidObjectId(department)
        const isValidSDPT = isValidObjectId(subDepartment)
        const isValidTicketID = isValidObjectId(ticketID)
       

        if (!isValidDPT || !isValidSDPT || !isValidTicketID) {
            return Response.json({ message: "Your ID(DP,SD,TK) Is Not valid" }, { status: 403 })
        }


        const findDepartment = await DepartmentModel.findOne({ _id: department })
        const findSubDepartment = await SubDepartmentModel.findOne({ _id: subDepartment })
        const findTicket=await TicketModel.findOne({_id:ticketID})

        if (!findDepartment || !findSubDepartment  || !findTicket) {
            return Response.json({ message: "Your ID Is Not Found" }, { status: 404 })
        }


        await TicketModel.create({
            title,
            body,
            department,
            subDepartment,
            priority,
            user: userAdmin._id,
            mainTicket: ticketID,
            hasAnswer: false,
            isAnswer: true
        })

        await TicketModel.findOneAndUpdate({_id:ticketID},{
            $set:{
                hasAnswer:true
            }
        })

        return Response.json({ message: "TicketAnswer Saved SuccessFully" }, { status: 201 })


    } catch (err) {
        return Response.json({ message: "server err" }, { status: 500 })
    }

}