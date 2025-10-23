import{ authUser } from "@/utils/authUser";
import connectToDB from "../../../../configs/db";
import ProductModel from "../../../../models/Product";
import { writeFile } from "fs/promises";
import path from "path";
import { isValidObjectId } from "mongoose";




export async function POST(req) {

    try {
        await connectToDB()
        const user = await authUser()
        if (user.role !== "ADMIN") {
            return Response.json({ message: "User Is Not ADMIN" })
        }

        const formData = await req.formData();

        const name = formData.get("name");
        const price = formData.get("price");
        const shortDescription = formData.get("shortDescription");
        const longDescription = formData.get("longDescription");
        const weigth = formData.get("weigth");
        const suitableFor = formData.get("suitableFor");
        const smell = formData.get("smell");
        const tags = JSON.parse(formData.get("tags"))
        const file = formData.get("image");



        if (!file) {
            return Response.json(
                { message: "ارسال تصویر محصول الزامی است" },
                { status: 400 }
            );
        }


        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return Response.json(
                { message: "فرمت تصویر معتبر نیست (فقط JPEG, PNG, WEBP مجاز است)" },
                { status: 400 }
            );
        }


        if (!name || name.length < 3 || name.length > 40) {
            return Response.json(
                { message: "نام محصول باید بین 30 تا 40 کاراکتر باشد" },
                { status: 400 }
            );
        }
        const exist = await ProductModel.findOne({ name });
        if (exist) {
            return Response.json(
                { message: "محصولی با این نام قبلاً ثبت شده است" },
                { status: 400 }
            );
        }


        if (!price || isNaN(price) || price <= 0) {
            return Response.json(
                { message: "قیمت باید عددی بزرگتر از صفر باشد" },
                { status: 400 }
            );
        }


        if (!shortDescription || shortDescription.length > 300) {
            return Response.json(
                { message: "توضیح کوتاه الزامی و حداکثر 300 کاراکتر است" },
                { status: 400 }
            );
        }


        if (!longDescription || longDescription.length > 1000) {
            return Response.json(
                { message: "توضیح کامل نمی‌تواند بیشتر از 1000 کاراکتر باشد" },
                { status: 400 }
            );
        }


        if (!weigth || isNaN(weigth) || weigth <= 0) {
            return Response.json(
                { message: "حجم باید عددی بزرگتر از صفر باشد" },
                { status: 400 }
            );
        }


        const validOptions = ["MEN", "WOMEN", "ALL"];
        if (!validOptions.includes(suitableFor)) {
            return Response.json(
                { message: "گزینه (مناسب برای), معتبر نیست" },
                { status: 400 }
            );
        }


        if (!smell || smell.length > 50) {
            return Response.json(
                { message: "نوع بو نباید بیشتر از ۵۰ کاراکتر باشد" },
                { status: 400 }
            );
        }


        if (tags && Array.isArray(tags)) {
            if (tags.length > 10) {
                return Response.json(
                    { message: "حداکثر ۱۰ تگ مجاز است" },
                    { status: 400 }
                );
            }
            for (const tag of tags) {
                if (tag.length > 20) {
                    return Response.json(
                        { message: "هر تگ حداکثر ۲۰ کاراکتر می‌تواند باشد" },
                        { status: 400 }
                    );
                }
            }
        }




        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = Date.now() + file.name;
        const filePath = path.join(process.cwd(), "public/uploads/", fileName);

        await writeFile(filePath, buffer);






        const product = await ProductModel.create({
            name,
            price,
            shortDescription,
            longDescription,
            weigth,
            suitableFor,
            smell,
            tags,
            image: `http://localhost:3000/uploads/${fileName}`

        })

        return Response.json({ message: "Product Created SuccessFully", data: product }, { status: 201 })

    } catch (err) {
        return Response.json({ message: "server err" }, { status: 500 })
    }
}


export async function DELETE(req) {
    try {
        connectToDB()
        const user = await authUser()
        if (user.role !== "ADMIN") {
            return Response.json({ message: "User Is Not ADMIN" })
        }

        const body = await req.json()
        const { id } = body

        if (!isValidObjectId(id)) {
            return Response.json({ message: "شناسه معتبر نیست" }, { status: 400 });
        }

        const product = await ProductModel.findOne({ _id: id })

        if (!product) {
            return Response.json({ message: "product Not Found" }, { status: 404 })
        }

        await ProductModel.findOneAndDelete({ _id: id })
        return Response.json({ message: "Product Delete SuccessFully" }, { status: 200 })

    } catch (err) {
        return Response.json({ message: err.message }, { status: 500 })
    }
}


export async function GET() {
    connectToDB()
    try {
        const Products = await ProductModel.find({}, "-__v").populate('comments')
        return Response.json(Products)
    } catch (err) {
        return Response.json({ message: "err" })
    }

}
