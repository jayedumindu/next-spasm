import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    verifyToken: String,
    verifyTokenExpiry: {
      type: Date,
    },
  },
  {
    collection: "users",
  }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
