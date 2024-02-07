import express from "express";
import tableObject from "../models/tableObject.js";

// Get full user object -> user id
export const getUserObject = async (req, res) => {
	try {
		const { userId } = req.params;
		const response = await tableObject.find({ userId: String(userId) });
		res.status(200).json(response);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

// Create a new table -> user id
export const postTable = async (req, res) => {
	try {
		const { userId } = req.params;
		const { id, tablename, entryrowname, xaxisname, yaxisname } =
			await req.body;
		const response = await tableObject.findOneAndUpdate(
			{ userId: userId },
			{
				$push: {
					userTables: {
						id,
						tablename,
						entryrowname,
						xaxisname,
						yaxisname,
						payload: [],
					},
				},
			}
		);
		const updatedResponse = await tableObject.find({ userId: String(userId) });
		res.status(201).json(updatedResponse);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

// Post a row to existing table -> user id + table id
export const postRow = async (req, res) => {
	try {
		const { userId, tableId } = req.params;
		const { entryid, entryname, x, y } = await req.body;
		const response = await tableObject.findOneAndUpdate(
			{ userId: userId, "userTables.id": tableId },
			{
				$push: {
					"userTables.$.payload": {
						entryid,
						entryname,
						x,
						y,
					},
				},
			}
		);
		const updatedResponse = await tableObject.find({ userId: String(userId) });
		res.status(201).json(updatedResponse);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

// Edit existing row -> user id + table id + row id
// export const updateRow = async (req, res) => {
//   try {
//     const { userId, tableId, rowId } = req.params;
//     const { entryid, entryname, x, y } = await req.body;
//     const response = await tableObject.findOneAndUpdate(
//       {
//         userId: userId,
//         "userTables.id": tableId,
//         "payload.entryid": rowId,
//       },
//       {
//         $set: {
//           "payload.$": {
//             entryid,
//             entryname,
//             x,
//             y,
//           },
//         },
//       }
//     );
//     const updatedResponse = await tableObject.find({ userId: String(userId) });
//     res.status(201).json(response);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

export async function updateRow(req, res) {
	const { userId, userTables, entryid } = req.params;

	try {
		const user = await tableObject.findOne({ userId });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const table = user.userTables.find((table) => table.id === userTables);

		if (!table) {
			return res.status(404).json({ message: "Table not found" });
		}

		const entryIndex = table.payload.findIndex(
			(entry) => entry.entryid === parseInt(entryid)
		);

		if (entryIndex === -1) {
			return res.status(404).json({ message: "Entry not found" });
		}

		// Update the entry
		const { entryname, x, y } = req.body;

		// Perform the update operation on the nested array element
		await tableObject.updateOne(
			{
				userId,
				"userTables.id": userTables,
				"userTables.payload.entryid": parseInt(entryid),
			},
			{
				$set: {
					"userTables.$[i].payload.$[j].entryname": entryname,
					"userTables.$[i].payload.$[j].x": x,
					"userTables.$[i].payload.$[j].y": y,
				},
			},
			{
				arrayFilters: [
					{ "i.id": userTables },
					{ "j.entryid": parseInt(entryid) },
				],
			}
		);

		res.status(200).json({ message: "Entry updated successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}

// Delete whole table -> user id + table id
export const deleteTable = async (req, res) => {
	try {
		const { userId, tableId } = req.params;
		const response = await tableObject.updateOne(
			{
				userId: userId,
			},
			{
				$pull: {
					userTables: {
						id: tableId,
					},
				},
			}
		);
		const updatedResponse = await tableObject.find({ userId: String(userId) });
		res.status(200).json(updatedResponse);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

// Delete row in existing table -> user id + table id + row id
export const deleteRow = async (req, res) => {
	try {
		const { userId, tableId, rowId } = req.params;

		const response = await tableObject.updateOne(
			{
				userId: userId,
				"userTables.id": tableId,
			},
			{
				$pull: {
					"userTables.$.payload": {
						entryid: parseInt(rowId),
					},
				},
			}
		);

		const updatedResponse = await tableObject.find({ userId: String(userId) });
		res.status(200).json(updatedResponse);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};
