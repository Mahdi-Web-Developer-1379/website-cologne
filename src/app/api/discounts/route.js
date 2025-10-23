import { authUser } from "@/utils/authUser";
import connectToDB from "../../../../configs/db";
import DiscountModel from "../../../../models/Discounts";
import { isValidObjectId } from "mongoose";

export async function POST(req) {

    try {
        connectToDB()
        const body = await req.json()
        const userAdmin = await authUser()
        if (userAdmin?.role !== 'ADMIN') {
            return Response.json({ message: "User Is Not ADMIN" }, { status: 403 })
        }

        const { code, percent, maxUse } = body


        if (!code || !percent || !maxUse) {
            return Response.json(
                { message: "تمامی فیلدها الزامی هستند" },
                { status: 400 }
            );
        }


        if (code.length < 3 || code.length > 20) {
            return Response.json(
                { message: "کد تخفیف باید بین ۳ تا ۲۰ کاراکتر باشد" },
                { status: 400 }
            );
        }

        if (!/^[A-Z0-9_-]+$/i.test(code)) {
            return Response.json(
                { message: "کد تخفیف فقط می‌تواند شامل حروف و اعداد باشد" },
                { status: 400 }
            );
        }

        const exist = await DiscountModel.findOne({ code });
        if (exist) {
            return Response.json(
                { message: "این کد تخفیف قبلاً ثبت شده است" },
                { status: 400 }
            );
        }


        if (isNaN(percent) || percent < 1 || percent > 100) {
            return Response.json(
                { message: "درصد تخفیف باید عددی بین ۱ تا ۱۰۰ باشد" },
                { status: 400 }
            );
        }


        if (isNaN(maxUse) || maxUse <= 0) {
            return Response.json(
                { message: "حداکثر استفاده باید عددی مثبت باشد" },
                { status: 400 }
            );
        }



        await DiscountModel.create({
            code, percent, maxUse
        })

        return Response.json({ message: "Discount Code Created SuccessFully" }, { status: 200 })



    } catch (err) {
        return Response.json({ message: "server err" }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        connectToDB()
        const user = await authUser()
        if (!user) {
            return Response.json({ message: "You Are Not Login" }, { status: 403 })
        }

        const body = await req.json()
        const { code } = body

        const discount = await DiscountModel.findOne({ code })

        if (!discount) {
            return  Response.json({ message: "Discount code not found" }, { status: 404 });
        }

        if (discount.uses >= discount.maxUse) {
            return  Response.json({ message: "Discount code reached max usage" }, { status: 400 });
        }


        await DiscountModel.updateOne({ code },
            {
                $set: { uses: discount.uses + 1 }
            }
        );

        return Response.json(discount, { status: 200 })


    } catch (err) {
        return Response.json({ message: "server err" }, { status: 500 })
    }
}


export async function DELETE(req) {
    try {
        connectToDB()

        const userAdmin = await authUser()

        if (userAdmin?.role !== 'ADMIN') {
            return Response.json({ message: "User Is Not ADMIN" }, { status: 403 })
        }

        const body = await req.json()
        const { id } = body

        if (!isValidObjectId(id)) {
            return Response.json({ message: "شناسه معتبر نیست" }, { status: 400 });
        }

        const discount = await DiscountModel.findOne({ _id: id })

        if (!discount) {
            return Response.json({ message: "Discount Not Found" }, { status: 404 })
        }

        await DiscountModel.findOneAndDelete({ _id: id })
        return Response.json({ message: "Discount delete SuccessFully" }, { status: 200 })


    } catch (err) {
        return Response.json({ message: "err server" }, { status: 500 })
    }
}
