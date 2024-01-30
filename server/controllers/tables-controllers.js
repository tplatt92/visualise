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
export const updateRow = (req, res) => {
  try {
    const { userId, tableId, rowId } = req.params;
    res.send(`Id = ${userId}, TableId = ${tableId} and RowId = ${rowId}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete whole table -> user id + table id
export const deleteTable = (req, res) => {
  try {
    const { userId, tableId } = req.params;
    res.send(`Id = ${userId}, TableId = ${tableId}.`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete row in existing table -> user id + table id + row id
export const deleteRow = (req, res) => {
  try {
    const { userId, tableId, rowId } = req.params;
    res.send(`Id = ${userId}, TableId = ${tableId} and RowId = ${rowId}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
