import { toast } from "sonner";

export const getValidImageSrc = (url?: string | null) => {
    if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
        return "/images/fallback.png";
    }
    return url;
};

const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard!")
}

export const handleNativeShare = async (title: string, url: string) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title,
                text: "Check out this awesome blog!",
                url
            })
            toast.success("Thanks for sharing!");

            console.log("Thanks for sharing!");
        } catch (error) {
            toast.error("Failed to share.");

            console.log("Sharing failed:", error);
        }
    }
    else {
        handleCopyLink(url);

    }
}