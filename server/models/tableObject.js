import mongoose from "mongoose";

const schema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: [true, "Please enter a user id"],
		},
		username: {
			type: String,
			required: [true, "Please enter a username"],
			unique: true,
		},
		password: { type: String, required: [true, "Please enter a password"] },
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
