// GET api/reel/[id]

import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import Reel from "@/model/reels.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl
    const slug = url.pathname.split("/").pop()
    console.log("Slug: ", slug)

    if (!slug) return NextResponse.json(
        { error: "slug not found" },
        { status: 400 }
    )

    await connectToDB()

    const reel = await Reel.findById(slug).populate("authorId", "userName avatar _id").lean()
    if (!reel) {
        return NextResponse.json(
            { error: "reel not found" },
            { status: 400 }
        )
    }
    console.log("reel: ", reel)
    return NextResponse.json(
        { message: "reel found successfully", data: reel },
        { status: 200 }
    )
}


// DELETE api/reel/[slug]

export async function DELETE(req: NextRequest) {
    const url = req.nextUrl
    const slug = url.pathname.split("/").pop()

    if (!slug) return NextResponse.json(
        { error: "slug not found" },
        { status: 400 }
    )

    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json(
        { error: "unauthorized " },
        { status: 404 }
    )

    await connectToDB()

    const reel = await Reel.findOne({ "media.url": slug, authorId: session.user.id }).lean()
    if (!reel) {
        return NextResponse.json(
            { error: "reel not found" },
            { status: 400 }
        )
    }

    return NextResponse.json(
        { message: "reel delete su  ", data: {} },
        { status: 400 }
    )
}