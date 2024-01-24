import express from "express";

// user id
export const getUserObject = (req, res) => {
  try {
    const { userId } = req.params;
    res.send(`Id = ${userId}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// user id + table id
export const postRow = (req, res) => {
  try {
    const { userId, tableId } = req.params;
    res.send(`Id = ${userId}, TableId = ${tableId}.`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// user id
export const postTable = (req, res) => {
  try {
    const { userId } = req.params;
    res.send(`Id = ${userId}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// user id + table id + row id
export const updateRow = (req, res) => {
  try {
    const { userId, tableId, rowId } = req.params;
    res.send(`Id = ${userId}, TableId = ${tableId} and RowId = ${rowId}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// user id + table id
export const deleteTable = (req, res) => {
  try {
    const { userId, tableId } = req.params;
    res.send(`Id = ${userId}, TableId = ${tableId}.`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// user id + table id + row id
export const deleteRow = (req, res) => {
  try {
    const { userId, tableId, rowId } = req.params;
    res.send(`Id = ${userId}, TableId = ${tableId} and RowId = ${rowId}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
