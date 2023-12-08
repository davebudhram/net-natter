import mongoose from "mongoose";
import { IUserDTO } from "../../interfaces/user";

// Define the user schema
const userSchema = new mongoose.Schema<IUserDTO>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["ANALYST", "ADMIN", "USER"],
    default: "USER"
  },
  favoriteTeamID: { type: Number, required: false},
  goatID: { type: Number, required: false},
  followers: { type: [String], required: false }, 
  followings: { type: [String], required: false },
},
  { collection: "users" });

// Create the user model
const userModel = mongoose.model("user", userSchema);

export default userModel;
