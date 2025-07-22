import mongoose, { Schema, model, models, InferSchemaType } from "mongoose";

// 📦 Video dimension constants
export const VIDEO_DIMENSION = {
    width: 1080,
    height: 1920,
} as const;

// 📦 Author type (for reference only)
export interface Author {
    _id: mongoose.Types.ObjectId;
    userName: string;
    avatar: string;
}

export function isAuthor(author: any): author is Author {
    return author && typeof author === "object" && "userName" in author && "avatar" in author;
}

// 📦 Transformation schema
const transformationSchema = new Schema({
    height: { type: Number, default: VIDEO_DIMENSION.height },
    width: { type: Number, default: VIDEO_DIMENSION.width },
    quality: { type: Number, min: 1, max: 100, default: 80 },
}, { _id: false });

// 📦 Media schema
const mediaSchema = new Schema({
    type: { type: String, enum: ['video'], required: true },
    url: { type: String, required: true },
    caption: { type: String, trim: true },
    transformation: transformationSchema,
}, { _id: false });

// 📦 Video schema (core model definition — no TS generic here!)
export const videoSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    media: mediaSchema,
    controls: { type: Boolean, default: false },
    thumbnailUrl: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });

// 📦 Inferred TypeScript type from schema (safe way)
export type Video = InferSchemaType<typeof videoSchema>;

// 📦 Mongoose model setup
const Reel = models?.Video || model("Video", videoSchema);
export default Reel;
