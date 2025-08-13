
// import mongoose from "@/lib/db.lib";
// import { Schema, model, models } from "mongoose"

// import User from "./user.model";
// import { MediaItem } from "@/types/media.types";
// import slugify from "slugify";


// interface IBlog {
//     _id?: mongoose.Types.ObjectId,
//     title: string,
//     slug: string,
//     authorId: {
//         type: mongoose.Types.ObjectId,
//         ref: any
//     },
//     content: string,
//     summary?: string,
//     media?: MediaItem[], // for image only
//     tags?: string[],
//     createdAt: Date,
//     updatedAt: Date,
//     isPublished: boolean,
//     likes?: [{ type: mongoose.Types.ObjectId, ref: any }]
// }


// const mediaSchema = new Schema<MediaItem>({
//     type: {
//         type: String,
//         enum: ['image'],
//     },
//     url: {
//         type: String,
//         trim: true
//     },
//     caption: {
//         type: String,
//         trim: true,
//     }
// }, { _id: false }) //disable auto _id for subdocs



// const blogSchema = new Schema<IBlog>({
//     title: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     slug: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     authorId: {
//         type: mongoose.Types.ObjectId,
//         ref: User,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },

//     summary: String,

//     media: [mediaSchema],

//     tags: [],

//     isPublished: {
//         type: Boolean,
//         default: true
//     },

//     likes: [{
//         type: mongoose.Types.ObjectId,
//         ref: 'User'
//     }]

// }, {
//     timestamps: true
// })

// blogSchema.pre("validate", function (next) {
//     if (!this.slug && this.title) {
//         const baseSlug = slugify(this.title, {
//             replacement: '-',
//             remove: undefined,
//             lower: true,
//             strict: true,
//             locale: 'en',
//             trim: true
//         })
//         const randomStr = Math.random().toString(36).substring(2, 6);
//         this.slug = `${baseSlug.substring(0, 60)}-${randomStr}`
//     }
//     next()
// })

// const Blog = models?.Blog || model<IBlog>("Blog", blogSchema)

// export default Blog

import mongoose, { Schema, model, models } from "mongoose";
import User from "./user.model";
import { MediaItem } from "@/types/media.types";
import slugify from "slugify";

// IBlog interface ko maine aache se define kar diya hai
interface IBlog {
  _id?: mongoose.Types.ObjectId,
  title: string,
  slug: string,
  authorId: mongoose.Types.ObjectId,
  content: string,
  summary?: string,
  media?: MediaItem[],
  tags?: string[],
  isPublished: boolean,
  likes?: mongoose.Types.ObjectId[],
  createdAt: Date,
  updatedAt: Date,
}

const mediaSchema = new Schema<MediaItem>({
  type: {
    type: String,
    enum: ['image'],
  },
  url: {
    type: String,
    trim: true
  },
  caption: {
    type: String,
    trim: true,
  }
}, { _id: false });

const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    trim: true,
    required: true
  },
  slug: {
    type: String,
    trim: true,
    required: true,
    unique: true // Slug unique hona chahiye
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Ref as a string is safer
    required: true
  },
  content: {
    type: String,
    required: true
  },
  summary: String,
  media: [mediaSchema],
  tags: [String], // Defined type for tags array
  isPublished: {
    type: Boolean,
    default: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

blogSchema.pre("validate", function (next) {
  // Only generate slug if the title is modified or it's a new document
  if (this.isModified('title') && this.title) {
    const baseSlug = slugify(this.title, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g, // Explicitly remove special characters
      lower: true,
      strict: true,
      trim: true
    });
    const randomStr = Math.random().toString(36).substring(2, 6);
    this.slug = `${baseSlug.substring(0, 60)}-${randomStr}`;
  }
  next();
});

const Blog = models.Blog || model<IBlog>("Blog", blogSchema);

// --- YEH CORRECTION HAI ---
// Aakhri mein comma (,) hata diya gaya hai
export default Blog;