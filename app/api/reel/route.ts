// store video url at database from Frontend

import { authOptions } from "@/lib/auth.lib";
import { connectToDB } from "@/lib/db.lib";
import Reel from "@/model/reels.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET  - api/reel

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "5", 10)
    const skip = (page - 1) * limit
    try {
        await connectToDB()

        const videos = await Reel.find({})
            .populate("authorId", "userName avatar _id")
            .sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

        if (!videos || videos.length == 0) {
            return NextResponse.json(
                { error: "no reel found" },
                { status: 201 }
            )
        }

        const totalVideo = await Reel.countDocuments();
        return NextResponse.json(
            {
                message: "reels extract successfully",
                data: videos,
                totalVideo,
                hasMore: skip + videos.length < totalVideo
            },
            { status: 200 }
        )

    } catch {
        return NextResponse.json(
            { error: "Internall server error", },
            { status: 500 }
        )
    }
}


// POST: api/reel
export async function POST(req: NextRequest) {
    try {

        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized user" },
                { status: 401 }
            )
        }


        await connectToDB()

        const body = await req.json() //parse json

        if (!body.title || !body.videoUrl) return NextResponse.json(
            { error: "Missing fields" },
            { status: 400 }
        )


        const videoData = {
            title: body.title,
            description: body.description,
            thumbnailUrl: body.thumbnailUrl,
            authorId: session.user.id,
            isPublished: body.isPublished,
            tags: body.tags,
            controls: body.controls ?? false,
            likes: body.likes ?? [],
            media: {
                type: "video",
                caption: body.caption ?? "",
                url: body.videoUrl,
                transformation: {
                    height: 1920,
                    width: 1080,
                    quality: body.transformation?.quality ?? 100, // from imagekit via frontend
                }
            }
        }

        const uploadedVideo = await Reel.create(videoData)
        if (!uploadedVideo) return NextResponse.json(
            { error: "reel not created" },
            { status: 401 }
        )
        return NextResponse.json(
            { message: "reel created successfully", data: {} },
            { status: 201 }
        )
    } catch {
        return NextResponse.json(
            { error: "Internall server error", },
            { status: 500 }
        )
    }

}


