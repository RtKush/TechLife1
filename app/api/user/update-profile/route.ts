import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth.lib"
import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/lib/db.lib"
import User from "@/model/user.model"

// PATCH: update account [ api/user/profile/update-profile]
export async function PATCH(req: NextRequest) {
    const { firstName, lastName, avatar, bio, email, userName } = await req.json()

    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (!firstName && !lastName && !avatar && !bio && !email && !userName) {
        return NextResponse.json(
            { error: "At least one field needs to be provided for update." },
            { status: 400 }
        )
    }

    try {
        await connectToDB()

        const user = await User.findOne({ _id: session.user.id }).select("-password")
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Check if userName exists for another user
        if (userName && user.userName !== userName) {
            const existingUserName = await User.findOne({ userName: userName.trim() }).select("-password")
            if (existingUserName) {
                return NextResponse.json(
                    { error: "Username already taken, choose a different one." },
                    { status: 409 }
                )
            }
            user.userName = userName.trim()
        }

        if (firstName && user.firstName !== firstName) user.firstName = firstName.trim()
        if (lastName && user.lastName !== lastName) user.lastName = lastName.trim()
        if (avatar) user.avatar = avatar.url
        if (bio && bio !== user.bio) user.bio = bio
        if (email && user.email !== email) user.email = email.trim()

        await user.save({ validateBeforeSave: true })

        return NextResponse.json(
            { message: "User data updated successfully", data: user },
            { status: 200 }
        )

    } catch {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}