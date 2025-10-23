import { validateEmail, validatephone } from "@/utils/auth";
import connectToDB from "../../../../configs/db";
import UserModel from "../../../../models/User";
import { authUser } from "@/utils/authUser";
import ContactModel from "../../../../models/Contact";

export async function POST(req) {
    try {
        connectToDB()
        const loggedUser=await authUser()
        const body = await req.json()
        let user;
        const { email, phone, name, company, message } = body

        if (!loggedUser) {
            return Response.json({ message: "لاگین کنید" },{status:401})
        }

        if (validateEmail(email) && validatephone(phone)) {
            user =await UserModel.findOne({email,phone})
        }else{
           return Response.json({message:"یمیل یا شماره موبایل اصلا معتبر نیست"},{status:400})
        }

        if (!user) {
            return Response.json({ message: "User Not Found" },{status:422})
        }
       
        
        if (email!==loggedUser.email||phone!==loggedUser.phone) {
            return Response.json({ message: "ایمیل و تلفن خود را, وارد کنید" },{status:403})
        }

        await ContactModel.create({email, phone, name, company, message})
         
        return Response.json({message:'message saved successFully'},{status:201})

    } catch (error) {
        return Response.json({ message: " Server ERR !!!!!", err },{status:500})
    }
}