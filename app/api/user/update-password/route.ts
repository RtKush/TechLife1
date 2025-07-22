import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// update password -> app/api/user/update-password
export async function PATCH(req: NextRequest) {
    const { oldPassword, newPassword } = await req.json();
    console.log("oldPassword: ", oldPassword, " newPassword: ", newPassword)
    if (!oldPassword || !newPassword) {
        console.log("both are compilsary")
        return NextResponse.json(
            { error: "Old and new passwords are required" },
            { status: 400 }
        );
    }

    if (newPassword.length < 6) {
        console.log("Short password")
        return NextResponse.json(
            { error: "New password must be at least 6 characters long" },
            { status: 400 }
        );
    }

    const session = await getServerSession(authOptions);
    if (!session) {
        console.log("no session")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectToDB();

        const user = await User.findById(session.user.id);
        if (!user) {
            console.log("user not found")
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Check if old password is correct
        const isMatch = await user.validatePassword(oldPassword)
        if (!isMatch) {
            console.log("old password is incorrect")
            return NextResponse.json(
                { error: "Old password is incorrect" },
                { status: 400 }
            );
        }


        user.password = newPassword;
        await user.save();

        return NextResponse.json(
            { message: "Password updated successfully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}
