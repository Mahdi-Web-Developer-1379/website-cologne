import { isValidObjectId } from "mongoose";
import connectToDB from "../../../../../configs/db";
import SubDepartmentModel from "../../../../../models/SubDepartment";
import { authUser } from "@/utils/authUser";
import DepartmentModel from "../../../../../models/Department";
export async function POST(req) {
    try {
        connectToDB()
        const user = await authUser()
        if (!user || user.role !== "ADMIN") {
            return Response.json({ message: "User Is Not ADMIN" })
        }
        const body = await req.json()
        const { title, department } = body

        if (!isValidObjectId(department)) {
            return Response.json({ message: 'ID Is Not Valid' }, { status: '400' })
        }

        const departments = await DepartmentModel.findOne({ _id: department })
        if (!departments || !title.trim()) {
            return Response.json({ message: 'Not Found ID OR Title Is empty' }, { status: '404' })
        }


        await SubDepartmentModel.create({ title, department })

        return Response.json({ message: "SubDepartment Saved SuccessFully" }, { status: 200 })

    } catch (err) {
        return Response.json({ message: "Server Err" }, { status: 500 })
    }
}