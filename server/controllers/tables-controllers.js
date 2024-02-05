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

export const updateRow = async (req, res) => {
  try {
    const { userId, tableId, rowId } = req.params;
    const { entryid, entryname, x, y } = req.body;

    const response = await tableObject.updateOne(
      {
        userId: userId,
        "userTables.id": tableId,
        "userTables.payload.entryId": rowId,
      },
      {
        $set: {
          "userTables.$[outer].payload.$[inner].entryName": entryname,
          "userTables.$[outer].payload.$[inner].x": x,
          "userTables.$[outer].payload.$[inner].y": y,
        },
      },
      {
        arrayFilters: [{ "outer.id": tableId }, { "inner.entryId": rowId }],
      }
    );

    const updatedResponse = await tableObject.find({ userId: String(userId) });
    res.status(200).json(updatedResponse);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

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
            entryid: rowId,
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
