import express from "express";
import {
	getUserObject,
	postRow,
	postTable,
	updateRow,
	deleteTable,
	deleteRow,
} from "../controllers/tables-controllers.js";

const tableRouter = express.Router();

tableRouter.get("/:userId", getUserObject);
tableRouter.post("/:userId", postTable);
tableRouter.post("/:userId/:tableId", postRow);
tableRouter.put("/:userId/:userTables/:entryid", updateRow);
tableRouter.delete("/:userId/:tableId", deleteTable);
tableRouter.delete("/:userId/:tableId/:rowId", deleteRow);

export default tableRouter;
