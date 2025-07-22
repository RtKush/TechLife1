// /*   Why import mongoose, { Schema, model, models } from "mongoose" can cause problems in Next.js App Router projects

// In serverless runtimes (like Vercel, or Next.js App Directory / API routes), every API route can run in its own isolated execution context.
// If you do: import mongoose, { Schema, model, models } from "mongoose"

// in multiple files — those are separate instances of mongoose’s model registry per import scope.

// So when:

// One file registers User to its mongoose instance

// And another file tries .populate("authorId") from its own different mongoose instance
// → That instance won’t know the User model → leading to your exact error:  MissingSchemaError: Schema hasn't been registered for model "User".

// */
// import mongoose, { Schema, model, models } from "mongoose";
// import { IUser } from "@/types/User.types";
// import bcrypt from "bcryptjs";

// const userSchema = new Schema<IUser>({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim: true,
//     },
//     password: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//     },
//     avatar: {
//         type: String,
//         default: "https://ik.imagekit.io/thissidemayur/a1_-IVPC5Ug1.avif"
//     },
//     bio: {
//         type: String,
//         trime: true,

//     },
//     firstName: {
//         type: String,
//         lowercase: true,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         lowercase: true,
//         trim: true
//     },
//     userName: {
//         type: String,
//         sparse: true,
//         unique: true,

//     }


// }, { timestamps: true })

// userSchema.pre("save", async function (next) {
//     if (!this.userName) this.userName = this._id.toString()

//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10)
//     }
//     next();
// })

// userSchema.methods.validatePassword = async function (inputPassword: string): Promise<boolean> {
//     return await bcrypt.compare(inputPassword, this.password);
// }

// const User = models?.User || model<IUser>("User", userSchema)

// export default User;

import mongoose, { Schema, model, models } from "mongoose";
import { IUser } from "@/types/User.types";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// ✅ Function to generate 6-character userName like "kush3a"
function generateUserName(email: string): string {
  const prefix = email.slice(0, 4).toLowerCase(); // first 4 letters of email
  const suffix = crypto.randomBytes(1).toString("hex").slice(0, 2); // 2 hex chars
  return prefix + suffix;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://ik.imagekit.io/thissidemayur/a1_-IVPC5Ug1.avif",
    },
    bio: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    userName: {
  type: String,
  unique: true,
  sparse: true,
},
  },
  { timestamps: true }
);

// ✅ Auto-generate userName and hash password
userSchema.pre("save", async function (next) {
  const user = this as any;

  // 🔐 Hash password
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  // 🔠 Generate 6-char userName
  if (!user.userName && user.email) {
    let generated = generateUserName(user.email);
    let exists = await mongoose.models.User.findOne({ userName: generated });

    while (exists) {
      generated = generateUserName(user.email);
      exists = await mongoose.models.User.findOne({ userName: generated });
    }

    user.userName = generated;
  }

  next();
});

userSchema.methods.validatePassword = async function (
  inputPassword: string
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = models?.User || model<IUser>("User", userSchema);
export default User;
