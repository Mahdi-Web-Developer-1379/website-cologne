import { isValidObjectId } from "mongoose"
import connectToDB from "../../../../../../configs/db"
import SubDepartmentModel from "../../../../../../models/SubDepartment"

export async function GET(req, { params }) {
    try {
        connectToDB()
        const departmentID = params.id
        if (!isValidObjectId(departmentID)) {
            return Response.json({ message: 'ID Is Not Valid' }, { status: '400' })
        }

        const subDepartments = await SubDepartmentModel.find({ department: departmentID })
        // console.log(subDepartments);
        if (!subDepartments.length) {
            return Response.json({ message: 'Not Found Department' }, { status: '404' })
        }

        return Response.json(subDepartments,{message:200})

    } catch (err) {
        return Response.json({ message: 'Server Err' }, { status: 500 })
    }
}