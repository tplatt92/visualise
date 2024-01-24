import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },
    testString: {
      type: String,
      required: [true, "Please enter a test String"],
    },
    testNum: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const userData = mongoose.model("userData", schema);

export default userData;
