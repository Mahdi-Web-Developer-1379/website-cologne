import connectToDB from "../../../../configs/db";
import OrderModel from "../../../../models/Order";
import UserModel from "../../../../models/User";
import { validateEmail, validatephone } from "@/utils/auth";
import { authUser } from "@/utils/authUser";

export async function POST(req) {
    try {
        await connectToDB()
        const user = await authUser()
        if (user?.role !== "USER") {
            return Response.json({ message: 'User Not USER' }, { status: 422 })
        }

        const body = await req.json()
        const {
            customerName,
            phone,
            address,
            city,
            state,
            postalCode,
            email,
            note,
            items,
            finalPrice
        } = body

        if (
            !customerName ||
            !phone ||
            !email ||
            !address ||
            !city ||
            !state ||
            !postalCode ||
            !items?.length ||
            !finalPrice
        ) {
            return Response.json(
                { message: "تمام فیلدهای ضروری را پر کنید." },
                { status: 400 }
            );
        }

        if (!validateEmail(email) || !validatephone(phone)) {
            return Response.json({ message: "یمیل یا شماره موبایل اصلا معتبر نیست" }, { status: 400 })
        }

        const User = await UserModel.findOne({ name: customerName, email, phone })
        if (!User) {
            return Response.json({ message: "کاربر یافت نشد." }, { status: 404 });
        }

        if (User._id.toString() !== user._id.toString()) {
            return Response.json(
                { message: "اطلاعات وارد شده با حساب کاربری شما مطابقت ندارد." },
                { status: 403 } 
            );
        }

        const order = await OrderModel.create({
            userID: user._id,
            name:customerName,
            phone,
            email,
            address,
            city,
            state,
            postalCode,
            note,
            items,
            finalPrice,
          });

          return Response.json({ message: "سفارش با موفقیت ثبت شد.", order }, { status: 201 });


    } catch (err) {
        return Response.json({ message: "server err!!!!!" }, { status: 500 })
    }

}