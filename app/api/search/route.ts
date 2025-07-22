import { connectToDB } from "@/lib/db.lib";
import Blog from "@/model/blog.model";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const q = searchParams.get("q") || "";
    const type = searchParams.get("type") || "blog";

    if (!q) {
        return NextResponse.json({ data: [], message: "No keyword" });
    }

    await connectToDB();

    let results = [];

    if (type === "user") {
        results = await User.find({
            userName: { $regex: q, $options: "i" },
        }).select("userName avatar _id bio");
    } else if (type === "blog") {
        results = await Blog.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
            ],
        }).select("title slug media summary");
    }


    return NextResponse.json({ data: results })
}

