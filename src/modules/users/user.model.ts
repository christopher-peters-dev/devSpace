import mongoose, { InferSchemaType } from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);
type IUser = InferSchemaType<typeof UserSchema>;
export const User = mongoose.model<IUser>("User", UserSchema);
