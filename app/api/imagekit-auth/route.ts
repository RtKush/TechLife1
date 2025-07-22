import { getUploadAuthParams } from "@imagekit/next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth.lib" // adjust path as per your setup
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401 }
        )
    }

    try {
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_AUTH_IMAGEKIT_PUBLIC_KEY as string,
        })

        return NextResponse.json(
            {
                token,
                expire: Number(expire),
                signature,
                publicKey: process.env.NEXT_AUTH_IMAGEKIT_PUBLIC_KEY,
            },
            { status: 200 }
        )

    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}
