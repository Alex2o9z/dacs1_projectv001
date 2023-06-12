import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import {} from "dotenv/config";
import { userRouter } from "../routes/users.js";
import { recipeRouter } from "../routes/recipes.js";
import { ingredientRouter } from "../routes/ingredients.js";

const app = express();

app.use(express.json());
app.use(cors());

// Client Routers
app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

// Admin Routers
app.use("/admin/ingredients", ingredientRouter);

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(URI).catch(error => console.log(error));

app.listen(process.env.SERVER_PORT, ()=> console.log("(from server/src/index.js) SERVER STARTED on port "+process.env.SERVER_PORT));