import mongoose from "mongoose";

export interface IUser{
  fullName: string;
  email: string;
  password: string;
  role: 'ANALYST' | 'ADMIN' | 'USER';
  favoriteTeamID?: number;
  goatID?: number;
  gameComments?: Array<mongoose.Types.ObjectId>;
}

// Define the user schema
const userSchema = new mongoose.Schema<IUser>({
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
  gameComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameComment' }]
},
  { collection: "users" });

// Create the user model
const userModel = mongoose.model("users", userSchema);

export default userModel;
