import { MediaItem } from "./media.types";

export interface Blog {

    title?: string,
    image?: string,
    isPublished?: Boolean,
    content?: string,
    summary?: string,
    authorId?: string,
    slug?: string,
    media?: MediaItem[], // for image only
    tags?: string[],
    createdAt?: Date,
    updatedAt?: Date,
}

