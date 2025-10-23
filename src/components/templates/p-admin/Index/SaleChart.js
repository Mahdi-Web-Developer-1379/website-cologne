'use client'

import { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

export default function SaleChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/chart")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.success) setData(data.sales);
            })
            .catch((err) => console.error("خطا در دریافت آمار فروش:", err));
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                width={500}
                height={200}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                    width={70}
                />
                <Tooltip
                    formatter={(value) => `${value.toLocaleString("fa-IR")} تومان`}
                />
                <Area
                    type="monotone"
                    dataKey="sale"
                    stroke="#16a34a"
                    fill="#22c55e"
                    fillOpacity={0.3}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
