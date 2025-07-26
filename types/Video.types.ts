import mongoose from "mongoose";
import { MediaItem } from "./media.types";
import { InferSchemaType } from "mongoose";
// import { videoSchema } from "@/model/reels.model";

export interface Author {
    _id: mongoose.Types.ObjectId;
    userName: string;
    avatar: string;
}
export interface IVideo {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    media: MediaItem;
    controls?: boolean;
    thumbnailUrl: string;
    authorId: mongoose.Types.ObjectId | Author;

    tags?: string[];
    isPublished?: boolean;
    likes?: string[]

}
