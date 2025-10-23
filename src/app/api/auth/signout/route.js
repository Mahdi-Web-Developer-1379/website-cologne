import { cookies } from "next/dist/client/components/headers"


export async function POST() {
    cookies().delete('token')
    return Response.json({ message: "Logout SuccessFully" },{status:200})
}

