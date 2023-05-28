import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    invitings: {
      type: Array,
      default: [],
    },
    invitations: {
      type: Array,
      default: [],
    },
    department: String,
    host: {
      type: Array,
      default: [],
    },
    Facebook: String,
    Instagram: String,
    participation: {
      type: Array,
      default: [],
    },
    selfIntro: String,
  },

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
