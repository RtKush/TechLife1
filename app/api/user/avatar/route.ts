import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// app/api/[userId]/avtar/
export async function POST(req: NextRequest) {
    const { avatarUrl } = await req.json()
    console.log("avatarUrl: ", avatarUrl)
    if (!avatarUrl) return NextResponse.json(
        { error: "avatar not found,please upload avatar" },
        { status: 400 }
    )



    const session = await getServerSession(authOptions)
    console.log("Session: ", session)
    if (!session) return NextResponse.json(
        { error: "unathorized!!" },
        { status: 401 }
    )


    try {
        await connectToDB()

        const user = await User.findByIdAndUpdate(
            session.user.id,
            { $set: { avatar: avatarUrl } },
            { new: true }
        )
        console.log("User: ", user)
        if (!user) return NextResponse.json(
            { error: "user not found!!" },
            { status: 400 }
        )

        return NextResponse.json(
            { message: "avatar updated successfully!!", data: {} },
            { status: 200 }
        )


    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}


// update avatar
export async function PUT(req: NextRequest) {
    const { avatarUrl } = await req.json()
    if (!avatarUrl) return NextResponse.json(
        { error: "avatar not found,please upload avatar" },
        { status: 400 }
    )

    const url = req.nextUrl
    const segment = url.pathname.split("/")
    const userName = segment[segment.length - 2]


    const session = await getServerSession(authOptions)
    console.log("Session: ", session)
    console.log("userName: ", userName)
    if (!session || session.user.userName != userName) return NextResponse.json(
        { error: "unathorize access!!" },
        { status: 401 }
    )


    try {
        await connectToDB()

        const user = await User.findByIdAndUpdate(
            session.user.id,
            { $set: { avatar: avatarUrl } },
            { new: true }
        )
        if (!user) return NextResponse.json(
            { error: "user not found!!" },
            { status: 400 }
        )

        return NextResponse.json(
            { message: "avatar updated successfully!!", data: {} },
            { status: 200 }
        )


    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

// delete avatar
export async function DELETE(req: NextRequest) {


    const url = req.nextUrl
    const segment = url.pathname.split("/")
    const userName = segment[segment.length - 2]


    const session = await getServerSession(authOptions)
    console.log("Session: ", session)
    console.log("userName: ", userName)
    if (!session || session.user.userName != userName) return NextResponse.json(
        { error: "unathorize access!!" },
        { status: 401 }
    )


    try {
        await connectToDB()

        const user = await User.findByIdAndUpdate(
            session.user.id,
            { $unset: { avatar: "" } },
            { new: true }
        )
        if (!user) return NextResponse.json(
            { error: "user not found!!" },
            { status: 400 }
        )

        return NextResponse.json(
            { message: "avatar deleted successfully!!", data: {} },
            { status: 200 }
        )


    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}