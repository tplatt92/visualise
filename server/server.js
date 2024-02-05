import express, { Router } from "express";
import mongoose from "mongoose";
import tableRouter from "./routes/table-routes.js";
import "dotenv/config";
import cors from "cors";

const app = express();

const port = process.env.PORT || 6000;

const corsOptions = {
	origin: "*",
};

// Enables app to use JSON
app.use(cors(corsOptions));
app.use(express.json());

app.use("/tables", tableRouter);

mongoose.set("strictQuery", false);

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Connected!"),
			app.listen(port, () => console.log(`listening on port: ${port}`));
	})
	.catch((error) => {
		console.log(error);
	});
