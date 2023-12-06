import mongoose from "mongoose";

export interface IUser{
  username: string;
  password: string;
  firstName?: string;
  email?: string;
  lastName?: string;
  dob?: Date;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN' | 'USER';
}

// Define the user schema
const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  email: String,
  lastName: String,
  dob: Date,
  role: {
    type: String,
    enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
    default: "USER"
  },
},
  { collection: "users" });

// Create the user model
const userModel = mongoose.model("users", userSchema);

export default userModel;
