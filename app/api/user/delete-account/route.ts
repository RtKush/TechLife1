import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth.lib"
import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/lib/db.lib"
import User from "@/model/user.model"

// Delete account: 
export async function DELETE(req: NextRequest) {

    const { password } = await req.json()

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {

        await connectToDB()

        const user = await User.findById(session?.user.id)

        if (!user) return NextResponse.json({ error: 'user not found' }, { status: 404 })


        const isPasswordValid = await user.validatePassword(password)
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 400 });
        }

        await user.deleteOne()
        console.log("DELETE route hit!");

        return NextResponse.json({ message: 'User deleted successfully ', data: {} }, { status: 200 });


    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

}





