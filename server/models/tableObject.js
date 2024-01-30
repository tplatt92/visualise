import mongoose from "mongoose";

const schema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: [true, "Please enter a user id"],
		},
		userTables: {
			type: Array,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const tableObject = mongoose.model("userObject", schema);

export default tableObject;
