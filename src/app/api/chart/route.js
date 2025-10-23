import connectToDB from "../../../../configs/db";
import OrderModel from "../../../../models/Order";
import { authUser } from "@/utils/authUser";

export async function GET() {
  try {
    await connectToDB();

    // بررسی اینکه کاربر ادمین هست یا نه
    const user = await authUser();
    if (!user || user.role !== "ADMIN") {
      return Response.json(
        { success: false, message: "دسترسی غیرمجاز" },
        { status: 403 }
      );
    }

    // گروه‌بندی فروش‌ها بر اساس تاریخ
    const sales = await OrderModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalSales: { $sum: "$finalPrice" },
          ordersCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // فرمت نهایی برای فرانت
    const formatted = sales.map((s) => ({
      date: new Date(s._id).toLocaleDateString("fa-IR"),
      sale: s.totalSales,
      count: s.ordersCount,
    }));

    return Response.json({ success: true, sales: formatted });
  } catch (err) {
    console.error("Sales API Error:", err);
    return Response.json(
      { success: false, message: "خطا در دریافت آمار فروش" },
      { status: 500 }
    );
  }
}
