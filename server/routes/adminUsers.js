import express from "express";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// Fetch all ingredients for admin ingredient list page API request
router.get("/", async (req, res) => {
    try {
        const response = await UserModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

export { router as adminUserRouter };