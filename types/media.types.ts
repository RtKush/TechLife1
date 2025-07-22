export interface MediaItem {
    type?: MediaType,
    url?: string,
    caption?: string,
    transformation?: {
        height: number;
        width: number;
        quality: number;
    };
}

export type MediaType = 'image' | 'video'