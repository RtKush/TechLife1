import { connectToDB } from "@/lib/db.lib";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";



// GET: get user account    [ api/user/[userId]/]
export async function GET(req: NextRequest) {
    const url = req.nextUrl
    const userName = url.pathname.split("/").pop()


    if (!userName) return NextResponse.json(
        { error: "User Name not found" },
        { status: 400 }
    )

    try {
        await connectToDB()

        const user = await User.findOne({ userName }).select("-password").lean()

        if (!user) return NextResponse.json(
            { error: "User not found" },
            { status: 401 }
        )

        return NextResponse.json(
            { message: "User found successfully", data: user },
            { status: 200 }
        )
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}


