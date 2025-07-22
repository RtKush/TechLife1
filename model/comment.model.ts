import mongoose, { Schema, model, models } from "mongoose";

export interface IComment {
    blogId: mongoose.Types.ObjectId
    authorId: mongoose.Types.ObjectId
    content: string
    createdAt: Date
    updatedAt: Date
}


const commentSchema = new Schema<IComment>({
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },

    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true,
    }


}, { timestamps: true })

const Comment = models.Comment || model<IComment>("Comment", commentSchema)
export default Comment 