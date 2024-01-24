import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please enter a user id"],
    },
    userName: {
      type: String,
      required: [true, "Please enter a username"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    userData: {
      type: Array,
      required: false
    },
    timestamps: true,
  }
);

const userObject = mongoose.model("userObject", schema);

export default userObject;
