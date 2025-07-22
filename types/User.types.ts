// import mongoose from "mongoose";

// export interface IUser {
//     email: string;
//     password: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     _id?: string;

//     avatar?: string;
//     bio?: string
//     userName?: string,
//     firstName?: string,
//     lastName?: string
// }


// export interface IUser {
//   email: string;
//   password: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   _id?: string;

//   avatar?: string;
//   bio?: string;
//   userName: string; // ✅ make required
//   firstName?: string;
//   lastName?: string;
// }

export interface IUser {
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  userName?: string; // ← make it optional here
  firstName?: string;
  lastName?: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
