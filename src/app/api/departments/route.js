import connectToDB from "../../../../configs/db";
import DepartmentModel from "../../../../models/Department";
import { authUser } from "@/utils/authUser";

export async function POST(req) {
    try {
        connectToDB()
        const user = await authUser()
        if (!user|| user.role !== "ADMIN") {
            return Response.json({ message: "User Is Not ADMIN" })
        }

        const body = await req.json()
        const { title } = body
        
        if (!title.trim()) {
            return Response.json({ message: 'Title Is empty' }, { status: '404' })
        }

        await DepartmentModel.create({ title })

        return Response.json({ message: "Department Saved SuccessFully" }, { status: 200 })

    } catch (err) {
        return Response.json({ message: "Server Err" }, { status: 500 })
    }
}


export async function GET() {
   connectToDB()
   
   const departments=await DepartmentModel.find()
   return Response.json(departments)
     
}