import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    host: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    participants: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    join: {
      type: Map,
      of: Boolean,
    },
    picturePath: {
      type: String,
      default: "",
    },
    userPicturePath: String,
    department: String,
    tags: {
      type: Array,
      default: [],
    },
    date: Date,
    friendOnly: Boolean,
    heading: String,
    limit: Number,
    deleted: Boolean,
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;
