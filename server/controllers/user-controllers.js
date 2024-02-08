import tableObject from "../models/tableObject.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { createToken } from "../jwt.js";

const demoTable = {
	id: "0",
	tablename: "Demo Table",
	entryrowname: "Entry Name",
	xaxisname: "X Axis",
	yaxisname: "Y Axis",
	payload: [
		{ entryid: 0, entryname: "Entry 1", x: 18, y: 36 },
		{ entryid: 1, entryname: "Entry 2", x: 11, y: 2 },
		{ entryid: 2, entryname: "Entry 3", x: 6, y: 12 },
		{ entryid: 3, entryname: "Entry 4", x: 2, y: 4 },
		{ entryid: 4, entryname: "Entry 5", x: 7, y: 14 },
		{ entryid: 5, entryname: "Entry 6", x: 16, y: 2 },
		{ entryid: 6, entryname: "Entry 7", x: 3, y: 46 },
		{ entryid: 7, entryname: "Entry 8", x: 13, y: 26 },
		{ entryid: 8, entryname: "Entry 9", x: 20, y: 40 },
		{ entryid: 9, entryname: "Entry 10", x: 14, y: 8 },
		{ entryid: 10, entryname: "Entry 11", x: 4, y: 8 },
		{ entryid: 11, entryname: "Entry 12", x: 9, y: 8 },
		{ entryid: 12, entryname: "Entry 13", x: 8, y: 16 },
		{ entryid: 13, entryname: "Entry 14", x: 10, y: 20 },
		{ entryid: 14, entryname: "Entry 15", x: 12, y: 4 },
		{ entryid: 15, entryname: "Entry 16", x: 19, y: 8 },
		{ entryid: 16, entryname: "Entry 17", x: 15, y: 30 },
		{ entryid: 17, entryname: "Entry 18", x: 17, y: 44 },
		{ entryid: 18, entryname: "Entry 19", x: 5, y: 20 },
		{ entryid: 19, entryname: "Entry 20", x: 1, y: 2 },
	],
};

export const loginUser = async (req, res) => {
	const { username, password } = req.body;

	const user = await tableObject.findOne({ username: username });

	if (!user) {
		res.status(400).json({ error: "User not found" });
	}

	const dbPassword = user.password;
	const match = await bcrypt.compare(password, dbPassword);

	if (!match) {
		res.status(400).json({ error: "Incorrect username or password" });
	} else {
		const accessToken = createToken(user);
		res.cookie("access-token", accessToken, {
			maxAge: 60 * 60 * 24 * 30 * 1000,
			httpOnly: true,
		});

		res.status(200).json(user);
	}
};

export const registerUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const hash = await bcrypt.hash(password, 10);

		const newUser = await tableObject.create({
			userId: uuidv4(),
			username: username,
			password: hash,
			userTables: [demoTable],
		});

		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json(error);
	}
};

export const logoutUser = async (req, res) => {
	res.clearCookie("access-token");
	res.clearCookie("userId");
	res.clearCookie("username");
	res.send("Logged out successfully.");
};

export const updatePassword = async (req, res) => {
	const { username, currentPassword, newPassword } = req.body;

	const user = await tableObject.findOne({ username: username });

	if (!user) {
		res.status(400).json({ error: "User not found" });
	}

	const dbPassword = user.password;
	const match = await bcrypt.compare(currentPassword, dbPassword);

	if (!match) {
		res.status(400).json({ error: "Incorrect password" });
	} else {
		const hash = await bcrypt.hash(newPassword, 10);
		await tableObject.updateOne(
			{ username: username },
			{ $set: { password: hash } }
		);
	}

	res.status(200).json("Password updated successfully");
};

export const deleteAccount = async (req, res) => {
	const { username } = req.body;

	try {
		await tableObject.deleteOne({ username: username });
		res.sendStatus(200);
	} catch (error) {
		console.error("Error deleting account:", error);
		res
			.status(500)
			.json({ error: "An error occurred while deleting the account" });
	}
};
