import express, { Router } from "express";
import mongoose from "mongoose";
import tableRouter from "./routes/table-routes.js";
import userRouter from "./routes/user-routes.js";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import { validateToken } from "./jwt.js";

const port = process.env.PORT || 6000;

// Enables app to use JSON
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		// preflightContinue: true,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	})
);
app.use(express.json());

app.use("/tables", tableRouter);
// app.use("/tables", validateToken, tableRouter);
app.use("/users", userRouter);

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
